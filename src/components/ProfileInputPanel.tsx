import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  GraduationCap,
  Link,
  FileText,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-separator";

interface ProfileInputPanelProps {
  onSubmit?: (data: FormData) => void;
  existingData?: {
    academicDetails: {
      cgpa: string;
      tenthPercentage: string;
      twelfthPercentage: string;
      backlogs: string;
      branch: string;
    };
    codolioProfile: string;
    selfAssessment: {
      technicalSkills: string;
      personalReflection: string;
    };
  } | null;
}

interface FormData {
  academicDetails: {
    cgpa: string;
    tenthPercentage: string;
    twelfthPercentage: string;
    backlogs: string;
    branch: string;
  };
  codolioProfile: string;
  resume: File | null;
  companyRequirements: File | null;
  jobDescriptionText: string; // Add new field for job description text
  selfAssessment: {
    technicalSkills: string;
    personalReflection: string;
  };
}

const ProfileInputPanel: React.FC<ProfileInputPanelProps> = ({
  onSubmit = () => {},
  existingData = null,
}) => {
  const [activeStep, setActiveStep] = useState<string>("academic");
  const [progress, setProgress] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    academicDetails: {
      cgpa: existingData?.academicDetails?.cgpa || "",
      tenthPercentage: existingData?.academicDetails?.tenthPercentage || "",
      twelfthPercentage: existingData?.academicDetails?.twelfthPercentage || "",
      backlogs: existingData?.academicDetails?.backlogs || "0",
      branch: existingData?.academicDetails?.branch || "",
    },
    codolioProfile: existingData?.codolioProfile || "",
    resume: null,
    companyRequirements: null,
    jobDescriptionText: "", // Initialize new state variable
    selfAssessment: {
      technicalSkills: existingData?.selfAssessment?.technicalSkills || "",
      personalReflection:
        existingData?.selfAssessment?.personalReflection || "",
    },
  });

  const [completedSteps, setCompletedSteps] = useState<{
    academic: boolean;
    codolio: boolean;
    resume: boolean;
    company: boolean;
    assessment: boolean;
  }>({
    academic: existingData ? true : false,
    codolio: existingData?.codolioProfile ? true : false,
    resume: false,
    company: false,
    assessment: existingData?.selfAssessment ? true : false,
  });

  const updateProgress = () => {
    const steps = Object.values(completedSteps);
    const completedCount = steps.filter(Boolean).length;
    setProgress((completedCount / steps.length) * 100);
  };

  const handleAcademicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      academicDetails: {
        ...formData.academicDetails,
        [name]: value,
      },
    });
  };

  const handleCodolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      codolioProfile: e.target.value,
    });
  };

  const handleSelfAssessmentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      selfAssessment: {
        ...formData.selfAssessment,
        [name]: value,
      },
    });
  };

  const handleFileChange =
    (type: "resume" | "companyRequirements") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type === "application/pdf") {
          setFormData({
            ...formData,
            [type]: file,
          });
          // Mark the step as completed
          if (type === "resume") {
            setCompletedSteps({ ...completedSteps, resume: true });
          } else {
            // If company requirements PDF is uploaded, clear the text area
            setFormData((prev) => ({
              ...prev,
              companyRequirements: file,
              jobDescriptionText: "",
            }));
            setCompletedSteps({ ...completedSteps, company: true });
          }
          updateProgress();
        } else {
          alert("Please select a PDF file only.");
        }
      }
    };

  const handleJobDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      jobDescriptionText: e.target.value,
      // If text is entered, clear the file input
      companyRequirements:
        e.target.value.trim() !== "" ? null : prev.companyRequirements,
    }));
    // Validation will happen on step change
  };

  const validateAcademic = () => {
    const { cgpa, tenthPercentage, twelfthPercentage, branch } =
      formData.academicDetails;
    const isValid =
      cgpa !== "" &&
      tenthPercentage !== "" &&
      twelfthPercentage !== "" &&
      branch !== "";
    setCompletedSteps({ ...completedSteps, academic: isValid });
    updateProgress();
    if (isValid) setActiveStep("codolio");
    return isValid;
  };

  const validateCodolio = () => {
    const isValid = formData.codolioProfile.trim() !== "";
    setCompletedSteps({ ...completedSteps, codolio: isValid });
    updateProgress();
    if (isValid) setActiveStep("resume");
    return isValid;
  };

  const validateResume = () => {
    const isValid = formData.resume !== null;
    setCompletedSteps({ ...completedSteps, resume: isValid });
    updateProgress();
    if (isValid) setActiveStep("company");
    return isValid;
  };

  const validateCompany = () => {
    // Valid if either a file is uploaded OR text is entered
    const isValid =
      formData.companyRequirements !== null ||
      formData.jobDescriptionText.trim() !== "";
    setCompletedSteps({ ...completedSteps, company: isValid });
    updateProgress();
    if (isValid) setActiveStep("assessment");
    return isValid;
  };

  const validateAssessment = () => {
    // Self-assessment is optional, so we'll mark it as complete regardless
    setCompletedSteps({ ...completedSteps, assessment: true });
    updateProgress();
    return true;
  };

  const handleSubmit = () => {
    // Add jobDescriptionText to the data being submitted
    onSubmit(formData);
  };

  const isFormComplete = Object.values(completedSteps).every(Boolean);

  return (
    <div className="w-full max-w-4xl mx-auto bg-background p-6 rounded-xl shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Placify</h1>
        <p className="text-muted-foreground">
          Your AI Placement Readiness Companion
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Profile Completion</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger
            value="academic"
            className="flex flex-col items-center gap-2 py-3"
          >
            <div
              className={`rounded-full p-2 ${
                completedSteps.academic
                  ? "bg-green-100 text-green-600"
                  : "bg-muted"
              }`}
            >
              <GraduationCap size={18} />
            </div>
            <span className="text-xs">Academic</span>
          </TabsTrigger>
          <TabsTrigger
            value="codolio"
            className="flex flex-col items-center gap-2 py-3"
          >
            <div
              className={`rounded-full p-2 ${
                completedSteps.codolio
                  ? "bg-green-100 text-green-600"
                  : "bg-muted"
              }`}
            >
              <Link size={18} />
            </div>
            <span className="text-xs">Codolio</span>
          </TabsTrigger>
          <TabsTrigger
            value="resume"
            className="flex flex-col items-center gap-2 py-3"
          >
            <div
              className={`rounded-full p-2 ${
                completedSteps.resume
                  ? "bg-green-100 text-green-600"
                  : "bg-muted"
              }`}
            >
              <FileText size={18} />
            </div>
            <span className="text-xs">Resume</span>
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="flex flex-col items-center gap-2 py-3"
          >
            <div
              className={`rounded-full p-2 ${
                completedSteps.company
                  ? "bg-green-100 text-green-600"
                  : "bg-muted"
              }`}
            >
              <Upload size={18} />
            </div>
            <span className="text-xs">Company</span>
          </TabsTrigger>
          <TabsTrigger
            value="assessment"
            className="flex flex-col items-center gap-2 py-3"
          >
            <div
              className={`rounded-full p-2 ${
                completedSteps.assessment
                  ? "bg-green-100 text-green-600"
                  : "bg-muted"
              }`}
            >
              <CheckCircle size={18} />
            </div>
            <span className="text-xs">Assessment</span>
          </TabsTrigger>
        </TabsList>

        <Card>
          <TabsContent value="academic">
            <CardHeader>
              <CardTitle>Academic Details</CardTitle>
              <CardDescription>
                Enter your academic information to help us assess your
                eligibility for various companies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA</Label>
                  <Input
                    id="cgpa"
                    name="cgpa"
                    placeholder="Enter your CGPA (e.g., 8.5)"
                    value={formData.academicDetails.cgpa}
                    onChange={handleAcademicChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch/Department</Label>
                  <Select
                    value={formData.academicDetails.branch}
                    onValueChange={(value) =>
                      handleAcademicChange({
                        target: { name: "branch", value },
                      } as any)
                    }
                  >
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">
                        Computer Science & Engineering
                      </SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">
                        Electronics & Communication
                      </SelectItem>
                      <SelectItem value="eee">
                        Electrical & Electronics
                      </SelectItem>
                      <SelectItem value="mech">
                        Mechanical Engineering
                      </SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tenthPercentage">10th Percentage</Label>
                  <Input
                    id="tenthPercentage"
                    name="tenthPercentage"
                    placeholder="Enter your 10th percentage"
                    value={formData.academicDetails.tenthPercentage}
                    onChange={handleAcademicChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twelfthPercentage">12th Percentage</Label>
                  <Input
                    id="twelfthPercentage"
                    name="twelfthPercentage"
                    placeholder="Enter your 12th percentage"
                    value={formData.academicDetails.twelfthPercentage}
                    onChange={handleAcademicChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backlogs">Number of Backlogs</Label>
                <Select
                  value={formData.academicDetails.backlogs}
                  onValueChange={(value) =>
                    handleAcademicChange({
                      target: { name: "backlogs", value },
                    } as any)
                  }
                >
                  <SelectTrigger id="backlogs">
                    <SelectValue placeholder="Select number of backlogs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 (No backlogs)</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4+">4 or more</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={validateAcademic} className="ml-auto">
                Next
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="codolio">
            <CardHeader>
              <CardTitle>Codolio Profile</CardTitle>
              <CardDescription>
                Paste your Codolio profile link to help us analyze your coding
                skills and achievements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="codolioProfile">Codolio Profile URL</Label>
                <Input
                  id="codolioProfile"
                  placeholder="https://codolio.com/username"
                  value={formData.codolioProfile}
                  onChange={handleCodolioChange}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Codolio aggregates your GitHub, coding platforms, and college
                  leaderboard data.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveStep("academic")}
              >
                Previous
              </Button>
              <Button onClick={validateCodolio}>Next</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="resume">
            <CardHeader>
              <CardTitle>Resume Upload</CardTitle>
              <CardDescription>
                Upload your resume in PDF format to help us extract additional
                skills and projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  if (files.length > 0 && files[0].type === "application/pdf") {
                    setFormData({ ...formData, resume: files[0] });
                    setCompletedSteps({ ...completedSteps, resume: true });
                    updateProgress();
                  } else {
                    alert("Please drop a PDF file only.");
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onClick={() => document.getElementById("resume")?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {formData.resume
                      ? formData.resume.name
                      : "Drag & drop your resume or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF format only, max 5MB
                  </p>
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange("resume")}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("resume")?.click();
                    }}
                  >
                    Select File
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveStep("codolio")}
              >
                Previous
              </Button>
              <Button onClick={validateResume}>Next</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="company">
            <CardHeader>
              <CardTitle>Company Requirements</CardTitle>
              <CardDescription>
                Upload the official placement company PDF document to analyze
                your readiness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  if (files.length > 0 && files[0].type === "application/pdf") {
                    setFormData({ ...formData, companyRequirements: files[0] });
                    setCompletedSteps({ ...completedSteps, company: true });
                    updateProgress();
                  } else {
                    alert("Please drop a PDF file only.");
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onClick={() =>
                  document.getElementById("companyRequirements")?.click()
                }
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {formData.companyRequirements
                      ? formData.companyRequirements.name
                      : "Drag & drop company PDF or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF format only, max 10MB
                  </p>
                  <input
                    id="companyRequirements"
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange("companyRequirements")}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("companyRequirements")?.click();
                    }}
                  >
                    Select File
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground my-4">
                <Separator className="flex-grow mr-2" />
                OR
                <Separator className="flex-grow ml-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescriptionText">
                  Paste Job Description Text
                </Label>
                <Textarea
                  id="jobDescriptionText"
                  placeholder="Paste the job description text here..."
                  value={formData.jobDescriptionText}
                  onChange={handleJobDescriptionChange}
                  rows={10}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  You can paste the job description text directly if you don't
                  have a PDF.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveStep("resume")}>
                Previous
              </Button>
              <Button onClick={validateCompany}>Next</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="assessment">
            <CardHeader>
              <CardTitle>Self Assessment</CardTitle>
              <CardDescription>
                Rate your technical skills and provide a personal reflection
                (optional).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technicalSkills">
                  Rate your technical skills (1-10)
                </Label>
                <Input
                  id="technicalSkills"
                  name="technicalSkills"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Enter a number between 1 and 10"
                  value={formData.selfAssessment.technicalSkills}
                  onChange={handleSelfAssessmentChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personalReflection">Personal Reflection</Label>
                <Textarea
                  id="personalReflection"
                  name="personalReflection"
                  placeholder="Share your thoughts on your strengths, weaknesses, and areas you'd like to improve..."
                  value={formData.selfAssessment.personalReflection}
                  onChange={handleSelfAssessmentChange}
                  rows={5}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveStep("company")}
              >
                Previous
              </Button>
              <Button onClick={validateAssessment}>Complete</Button>
            </CardFooter>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className="px-8"
          size="lg"
        >
          {isFormComplete ? "Analyze My Profile" : "Complete All Sections"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileInputPanel;
