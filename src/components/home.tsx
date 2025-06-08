import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ProfileInputPanel from "./ProfileInputPanel";
import ReadinessAnalysisDashboard from "./ReadinessAnalysisDashboard";
import { motion } from "framer-motion";
import { analyzeProfileWithGemini } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";
import {
  supabase,
  getProfile,
  getLatestAnalysis,
  saveProfile,
  saveAnalysis,
} from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileData {
  academicDetails?: {
    cgpa: number;
    tenthPercentage: number;
    twelfthPercentage: number;
    backlogs: number;
    branch: string;
  };
  codolioLink?: string;
  resume?: File;
  companyRequirements?: File;
  selfAssessment?: {
    technicalSkills: string;
    personalReflection: string;
  };
}

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  const [activeTab, setActiveTab] = useState<string>("input");
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [existingProfile, setExistingProfile] = useState<any>(null);

  const [loadingInterviewLinks, setLoadingInterviewLinks] =
    useState<boolean>(false);

  // Load user's existing profile and latest analysis on component mount
  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoadingProfile(true);

      // Load existing profile
      const profile = await getProfile(user.id);
      if (profile) {
        setExistingProfile(profile);

        // Convert profile back to form format
        const formattedProfile = {
          academicDetails: {
            cgpa: profile.cgpa.toString(),
            tenthPercentage: profile.tenth_percentage.toString(),
            twelfthPercentage: profile.twelfth_percentage.toString(),
            backlogs: profile.backlogs.toString(),
            branch: profile.branch,
          },
          codolioProfile: profile.codolio_profile || "",
          selfAssessment: {
            technicalSkills: profile.technical_skills_rating?.toString() || "",
            personalReflection: profile.personal_reflection || "",
          },
        };
        setProfileData(formattedProfile);
      }

      // Load latest analysis
      const latestAnalysis = await getLatestAnalysis(user.id);
      if (latestAnalysis) {
        setAnalysisResults(latestAnalysis.analysis_data);
        setAnalysisComplete(true);
        setActiveTab("analysis");
      }
    } catch (err) {
      console.error("Error loading user data:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleUpdateProfile = () => {
    setActiveTab("input");
  };

  const handleProfileSubmit = async (data: any) => {
    setIsAnalyzing(true);
    setError("");

    try {
      // Save profile to database first
      const savedProfile = await saveProfile(data, user.id);

      // Analyze with Gemini
      const analysis = await analyzeProfileWithGemini(
        data,
        data.resume,
        data.companyRequirements,
        data.jobDescriptionText
      );

      // Save analysis to database
      await saveAnalysis(analysis, user.id, savedProfile.id);

      setProfileData(data);
      setAnalysisResults(analysis);
      setAnalysisComplete(true);
      setActiveTab("analysis");
      setExistingProfile(savedProfile);
    } catch (err: any) {
      setError(err.message || "Failed to analyze profile. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Placify
            </h1>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/50 rounded-full border">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {(user.user_metadata?.full_name || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white/50 hover:bg-white/80 border-gray-200"
                >
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white/95 backdrop-blur-sm"
              >
                <DropdownMenuItem onClick={handleUpdateProfile}>
                  Update Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Your AI Placement Readiness Companion
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Analyze your profile, discover opportunities, and accelerate your
              career journey
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger
                value="input"
                disabled={analysisComplete && activeTab === "analysis"}
              >
                Profile Input
              </TabsTrigger>
              <TabsTrigger value="analysis" disabled={!analysisComplete}>
                Analysis Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="mt-4">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}
                  {isAnalyzing && (
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-blue-800 text-sm">
                        Analyzing your profile with AI... This may take a few
                        moments.
                      </p>
                    </div>
                  )}
                  {loadingProfile ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      <span>Loading your profile...</span>
                    </div>
                  ) : (
                    <ProfileInputPanel
                      onSubmit={handleProfileSubmit}
                      existingData={
                        existingProfile
                          ? {
                              academicDetails: {
                                cgpa: existingProfile.cgpa.toString(),
                                tenthPercentage:
                                  existingProfile.tenth_percentage.toString(),
                                twelfthPercentage:
                                  existingProfile.twelfth_percentage.toString(),
                                backlogs: existingProfile.backlogs.toString(),
                                branch: existingProfile.branch,
                              },
                              codolioProfile:
                                existingProfile.codolio_profile || "",
                              selfAssessment: {
                                technicalSkills:
                                  existingProfile.technical_skills_rating?.toString() ||
                                  "",
                                personalReflection:
                                  existingProfile.personal_reflection || "",
                              },
                            }
                          : null
                      }
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="mt-4">
              {analysisComplete && analysisResults ? (
                <ReadinessAnalysisDashboard
                  studentData={{
                    name: user.user_metadata?.full_name || "Student",
                    cgpa: parseFloat(
                      profileData.academicDetails?.cgpa ||
                        existingProfile?.cgpa?.toString() ||
                        "0"
                    ),
                    branch:
                      profileData.academicDetails?.branch ||
                      existingProfile?.branch ||
                      "",
                    backlogs: parseInt(
                      profileData.academicDetails?.backlogs ||
                        existingProfile?.backlogs?.toString() ||
                        "0"
                    ),
                    tenthPercentage: parseFloat(
                      profileData.academicDetails?.tenthPercentage ||
                        existingProfile?.tenth_percentage?.toString() ||
                        "0"
                    ),
                    twelfthPercentage: parseFloat(
                      profileData.academicDetails?.twelfthPercentage ||
                        existingProfile?.twelfth_percentage?.toString() ||
                        "0"
                    ),
                    codolioProfile:
                      profileData.codolioLink ||
                      existingProfile?.codolio_profile,
                  }}
                  analysisResults={{
                    overallScore: analysisResults.overallScore || 0,
                    skillGaps: analysisResults.companies?.[0]?.skillGaps || [],
                    companyMatches:
                      analysisResults.companies?.map((company: any) => ({
                        name: company.name,
                        role: company.role || "Software Engineer",
                        matchPercentage: company.matchPercentage,
                        description: company.description,
                      })) || [],
                    actionPlan: analysisResults.actionPlan || [],
                  }}
                  onUpdateProfile={handleUpdateProfile}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Submit your profile to see the analysis
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <footer className="border-t bg-white/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 Placify. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="text-sm text-muted-foreground cursor-default font-medium">
                Privacy Policy
              </span>
              <span className="text-sm text-muted-foreground cursor-default font-medium">
                Terms of Service
              </span>
              <span className="text-sm text-muted-foreground cursor-default font-medium">
                Contact
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
