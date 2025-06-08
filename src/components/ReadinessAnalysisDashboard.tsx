import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  FileText,
  Award,
  BarChart2,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import CompanyMatchAnalysis from "./CompanyMatchAnalysis";

interface ReadinessAnalysisDashboardProps {
  studentData?: {
    name: string;
    cgpa: number;
    branch: string;
    backlogs: number;
    tenthPercentage: number;
    twelfthPercentage: number;
    codolioProfile?: string;
  };
  analysisResults?: {
    overallScore: number;
    skillGaps: Array<{
      skill: string;
      studentLevel: number;
      requiredLevel: number;
    }>;
    companyMatches: Array<{
      name: string;
      matchPercentage: number;
      description: string;
    }>;
    actionPlan: Array<{
      action: string;
      timeline: string;
      resources: Array<{ name: string; url: string }>;
    }>;
  };
  onUpdateProfile?: () => void;
}

const ReadinessAnalysisDashboard: React.FC<ReadinessAnalysisDashboardProps> = ({
  studentData = {
    name: "John Doe",
    cgpa: 8.5,
    branch: "Computer Science",
    backlogs: 0,
    tenthPercentage: 92,
    twelfthPercentage: 88,
    codolioProfile: "https://codolio.com/johndoe",
  },
  analysisResults = {
    overallScore: 78,
    skillGaps: [
      { skill: "Data Structures", studentLevel: 7, requiredLevel: 9 },
      { skill: "Algorithms", studentLevel: 6, requiredLevel: 8 },
      { skill: "System Design", studentLevel: 4, requiredLevel: 7 },
      { skill: "Database Management", studentLevel: 8, requiredLevel: 7 },
      { skill: "Web Development", studentLevel: 9, requiredLevel: 6 },
    ],
    companyMatches: [
      {
        name: "TechCorp",
        matchPercentage: 85,
        description: "Leading technology company focused on cloud solutions",
      },
      {
        name: "DataSystems",
        matchPercentage: 72,
        description: "Data analytics and business intelligence firm",
      },
      {
        name: "WebFront",
        matchPercentage: 91,
        description: "Frontend development and UX design company",
      },
      {
        name: "AlgoSoft",
        matchPercentage: 65,
        description: "Algorithm-focused software development company",
      },
      {
        name: "CloudNine",
        matchPercentage: 78,
        description: "Cloud infrastructure and DevOps services",
      },
    ],
    actionPlan: [
      {
        action: "Strengthen System Design knowledge",
        timeline: "4 weeks",
        resources: [
          {
            name: "System Design Primer",
            url: "https://github.com/donnemartin/system-design-primer",
          },
          {
            name: "Grokking System Design",
            url: "https://www.educative.io/courses/grokking-the-system-design-interview",
          },
        ],
      },
      {
        action: "Practice advanced algorithm problems",
        timeline: "6 weeks",
        resources: [
          {
            name: "LeetCode Top 100",
            url: "https://leetcode.com/problemset/top-100-liked-questions/",
          },
          { name: "AlgoExpert", url: "https://www.algoexpert.io/" },
        ],
      },
      {
        action: "Complete Data Structures course",
        timeline: "3 weeks",
        resources: [
          {
            name: "MIT OpenCourseWare",
            url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/",
          },
          {
            name: "Stanford Algorithms",
            url: "https://www.coursera.org/specializations/algorithms",
          },
        ],
      },
    ],
  },
  onUpdateProfile = () => {},
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("score");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const handleCompanySelect = (companyName: string) => {
    setSelectedCompany(companyName);
  };

  const handleBackToCompanies = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Placement Readiness Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Personalized insights for {studentData.name}
          </p>
        </div>
        <Button
          variant="outline"
          className="mt-4 md:mt-0"
          onClick={onUpdateProfile}
        >
          Update Profile
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="score" className="flex items-center gap-2">
            <Award size={18} />
            <span className="hidden sm:inline">Readiness Score</span>
            <span className="sm:hidden">Score</span>
          </TabsTrigger>
          <TabsTrigger value="gap" className="flex items-center gap-2">
            <BarChart2 size={18} />
            <span className="hidden sm:inline">Gap Analysis</span>
            <span className="sm:hidden">Gaps</span>
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <FileText size={18} />
            <span className="hidden sm:inline">Company Matching</span>
            <span className="sm:hidden">Companies</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center gap-2">
            <BookOpen size={18} />
            <span className="hidden sm:inline">Action Plan</span>
            <span className="sm:hidden">Plan</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="score" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Readiness Score</CardTitle>
              <CardDescription>
                Based on your academic profile and skills assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div
                  className={`w-48 h-48 rounded-full flex items-center justify-center ${getScoreColor(
                    analysisResults.overallScore
                  )} text-white mb-6`}
                >
                  <div className="text-center">
                    <div className="text-5xl font-bold">
                      {analysisResults.overallScore}%
                    </div>
                    <div className="mt-2 font-medium">
                      {getScoreText(analysisResults.overallScore)}
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-md space-y-4 mt-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Academic Eligibility
                      </span>
                      <span className="text-sm font-medium">
                        {studentData.cgpa >= 7.5 ? "Eligible" : "Not Eligible"}
                      </span>
                    </div>
                    <Progress value={studentData.cgpa * 10} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Technical Skills
                      </span>
                      <span className="text-sm font-medium">
                        {analysisResults.skillGaps.length > 0
                          ? "Gaps Identified"
                          : "All Skills Met"}
                      </span>
                    </div>
                    <Progress
                      value={
                        100 -
                        (analysisResults.skillGaps.filter(
                          (gap) => gap.studentLevel < gap.requiredLevel
                        ).length /
                          analysisResults.skillGaps.length) *
                          100
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Company Match Rate
                      </span>
                      <span className="text-sm font-medium">
                        {
                          analysisResults.companyMatches.filter(
                            (company) => company.matchPercentage >= 70
                          ).length
                        }{" "}
                        of {analysisResults.companyMatches.length} companies
                      </span>
                    </div>
                    <Progress
                      value={
                        (analysisResults.companyMatches.filter(
                          (company) => company.matchPercentage >= 70
                        ).length /
                          analysisResults.companyMatches.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Profile Summary</CardTitle>
              <CardDescription>
                Your academic credentials and eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CGPA</span>
                    <span className="font-medium">{studentData.cgpa}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      10th Percentage
                    </span>
                    <span className="font-medium">
                      {studentData.tenthPercentage}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      12th Percentage
                    </span>
                    <span className="font-medium">
                      {studentData.twelfthPercentage}%
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Branch</span>
                    <span className="font-medium">{studentData.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Active Backlogs
                    </span>
                    <span className="font-medium">{studentData.backlogs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Codolio Profile
                    </span>
                    <a
                      href={studentData.codolioProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>
                Comparison between your skills and company requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analysisResults.skillGaps.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.skill}</span>
                        {skill.studentLevel >= skill.requiredLevel ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle size={12} className="mr-1" /> Meets
                            Requirements
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            <AlertCircle size={12} className="mr-1" /> Gap
                            Identified
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Your level: {skill.studentLevel}/10 | Required:{" "}
                        {skill.requiredLevel}/10
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="flex h-2.5 rounded-full">
                        <div
                          className={`h-2.5 rounded-l-full ${
                            skill.studentLevel >= skill.requiredLevel
                              ? "bg-green-500"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${skill.studentLevel * 10}%` }}
                        ></div>
                        {skill.studentLevel < skill.requiredLevel && (
                          <div
                            className="h-2.5 bg-red-200 rounded-r-full"
                            style={{
                              width: `${
                                (skill.requiredLevel - skill.studentLevel) * 10
                              }%`,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {analysisResults.skillGaps
                    .filter((skill) => skill.studentLevel < skill.requiredLevel)
                    .map((skill, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight
                          size={18}
                          className="text-primary mt-0.5 flex-shrink-0"
                        />
                        <span>
                          Improve your {skill.skill} skills by{" "}
                          {skill.requiredLevel - skill.studentLevel} points to
                          meet industry standards.
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          {selectedCompany ? (
            <CompanyMatchAnalysis
              companyName={selectedCompany}
              matchPercentage={
                analysisResults.companyMatches.find(
                  (c) => c.name === selectedCompany
                )?.matchPercentage || 0
              }
              onClose={handleBackToCompanies}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Company Match Analysis</CardTitle>
                <CardDescription>
                  Companies sorted by your match percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {analysisResults.companyMatches
                      .sort((a, b) => b.matchPercentage - a.matchPercentage)
                      .map((company, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                          onClick={() => handleCompanySelect(company.name)}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-lg">
                              {company.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`${
                                  company.matchPercentage >= 80
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : company.matchPercentage >= 60
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                              >
                                {company.matchPercentage}% Match
                              </Badge>
                              <ChevronRight size={16} />
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {company.description}
                          </p>
                          <div className="mt-3">
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${
                                  company.matchPercentage >= 80
                                    ? "bg-green-500"
                                    : company.matchPercentage >= 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${company.matchPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          {selectedCompany && (
            <CompanyMatchAnalysis
              company={
                analysisResults.companyMatches.find(
                  (c) => c.name === selectedCompany
                )!
              }
              studentData={studentData}
              skills={analysisResults.skillGaps.map((gap) => ({
                name: gap.skill,
                studentLevel: gap.studentLevel,
                requiredLevel: gap.requiredLevel,
                gap: gap.requiredLevel - gap.studentLevel,
              }))}
              onClose={handleBackToCompanies}
            />
          )}
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Action Plan</CardTitle>
              <CardDescription>
                Recommended steps to improve your placement readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {analysisResults.actionPlan.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-8 border-l border-muted last:border-0 last:pb-0"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <div>
                      <h3 className="font-medium text-lg">{item.action}</h3>
                      <p className="text-muted-foreground mt-1">
                        Estimated timeline: {item.timeline}
                      </p>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Recommended Resources:
                        </h4>
                        <ul className="space-y-2">
                          {item.resources.map((resource, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <FileText size={14} className="text-primary" />
                              <a
                                href={
                                  resource.url.startsWith("http://") ||
                                  resource.url.startsWith("https://")
                                    ? resource.url
                                    : `https://${resource.url}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {resource.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-muted">
                <h3 className="font-medium mb-2">Next Steps</h3>
                <p className="text-sm text-muted-foreground">
                  Follow this action plan to improve your placement readiness.
                  Regularly update your profile to track progress and receive
                  updated recommendations.
                </p>
                <Button className="mt-4">Track My Progress</Button>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReadinessAnalysisDashboard;
