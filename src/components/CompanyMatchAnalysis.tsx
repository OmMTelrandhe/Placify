import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Code,
  Award,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Skill {
  name: string;
  studentLevel: number;
  requiredLevel: number;
  gap: number;
}

interface EligibilityCriteria {
  name: string;
  studentValue: string | number;
  requiredValue: string | number;
  isMet: boolean;
}

interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  resources?: {
    title: string;
    link: string;
  }[];
}

interface CompanyMatch {
  name: string;
  matchPercentage: number;
  description: string;
}

interface CompanyMatchAnalysisProps {
  companyName?: string;
  company?: CompanyMatch;
  matchPercentage?: number;
  skills?: Skill[];
  eligibilityCriteria?: EligibilityCriteria[];
  recommendations?: Recommendation[];
  strengthAreas?: string[];
  improvementAreas?: string[];
  onClose?: () => void;
  companyData?: any;
  studentData?: {
    name: string;
    cgpa: number;
    branch: string;
    backlogs: number;
    tenthPercentage: number;
    twelfthPercentage: number;
    codolioProfile?: string;
  };
  skillGaps?: Array<{
    skill: string;
    studentLevel: number;
    requiredLevel: number;
  }>;
  onBack?: () => void;
}

const CompanyMatchAnalysis: React.FC<CompanyMatchAnalysisProps> = ({
  companyName = "TechCorp Inc.",
  company,
  matchPercentage = 78,
  skills = [
    { name: "Data Structures", studentLevel: 8, requiredLevel: 9, gap: 1 },
    { name: "Algorithms", studentLevel: 7, requiredLevel: 9, gap: 2 },
    { name: "React", studentLevel: 8, requiredLevel: 7, gap: -1 },
    { name: "Node.js", studentLevel: 6, requiredLevel: 8, gap: 2 },
    { name: "Database Management", studentLevel: 5, requiredLevel: 7, gap: 2 },
    { name: "System Design", studentLevel: 4, requiredLevel: 8, gap: 4 },
  ],
  eligibilityCriteria = [
    { name: "CGPA", studentValue: 8.2, requiredValue: 7.5, isMet: true },
    { name: "Backlogs", studentValue: 0, requiredValue: "None", isMet: true },
    {
      name: "Branch",
      studentValue: "Computer Science",
      requiredValue: "CS/IT/ECE",
      isMet: true,
    },
    {
      name: "Coding Challenges",
      studentValue: 45,
      requiredValue: 50,
      isMet: false,
    },
  ],
  recommendations = [
    {
      title: "Improve System Design Knowledge",
      description:
        "Focus on learning scalable architecture patterns and database optimization techniques.",
      priority: "high",
      resources: [
        {
          title: "System Design Primer",
          link: "https://github.com/donnemartin/system-design-primer",
        },
        {
          title: "Grokking System Design",
          link: "https://www.educative.io/courses/grokking-the-system-design-interview",
        },
      ],
    },
    {
      title: "Practice More Coding Challenges",
      description:
        "Complete at least 5 more medium-level algorithm challenges focusing on graph algorithms.",
      priority: "medium",
      resources: [
        {
          title: "LeetCode Graph Problems",
          link: "https://leetcode.com/tag/graph/",
        },
        {
          title: "HackerRank Algorithms",
          link: "https://www.hackerrank.com/domains/algorithms",
        },
      ],
    },
    {
      title: "Strengthen Database Skills",
      description: "Work on query optimization and NoSQL database concepts.",
      priority: "medium",
      resources: [
        {
          title: "MongoDB University",
          link: "https://university.mongodb.com/",
        },
        {
          title: "SQL Performance Explained",
          link: "https://use-the-index-luke.com/",
        },
      ],
    },
  ],
  strengthAreas = [
    "Strong foundation in React development",
    "Good academic performance with 8.2 CGPA",
    "No backlogs throughout the academic career",
    "Solid understanding of data structures",
  ],
  improvementAreas = [
    "Need to improve system design knowledge",
    "More practice needed in coding challenges",
    "Strengthen database management skills",
    "Enhance algorithm problem-solving speed",
  ],
  onClose = () => console.log("Close analysis"),
}) => {
  const displayName = company?.name || companyName;
  const displayMatchPercentage = company?.matchPercentage || matchPercentage;

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background p-6 rounded-xl shadow-lg border border-border w-full max-w-5xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{displayName}</h2>
          <p className="text-muted-foreground">Detailed Match Analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Match Score</p>
            <p
              className={`text-2xl font-bold ${getMatchColor(
                displayMatchPercentage,
              )}`}
            >
              {displayMatchPercentage}%
            </p>
          </div>
          <div className="h-14 w-14 rounded-full border-4 border-primary flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="interview">Interview Experience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Strengths
                </CardTitle>
                <CardDescription>
                  Areas where you meet or exceed requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {strengthAreas.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>
                  Focus on these to increase your match score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Match Summary</CardTitle>
              <CardDescription>
                Overall assessment of your profile against {companyName}'s
                requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Match</span>
                    <span
                      className={`text-sm font-medium ${getMatchColor(
                        matchPercentage,
                      )}`}
                    >
                      {matchPercentage}%
                    </span>
                  </div>
                  <Progress value={matchPercentage} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Technical Skills
                    </span>
                    <span
                      className={`text-sm font-medium ${getMatchColor(70)}`}
                    >
                      70%
                    </span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Eligibility Criteria
                    </span>
                    <span
                      className={`text-sm font-medium ${getMatchColor(85)}`}
                    >
                      85%
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {matchPercentage >= 80
                  ? "You're well-matched for this company! Focus on the recommended improvements to maximize your chances."
                  : matchPercentage >= 60
                    ? "You have a moderate match with this company. Address the improvement areas to increase your chances."
                    : "You need significant improvements to match this company's requirements. Follow the recommendations closely."}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Skills Gap Analysis
              </CardTitle>
              <CardDescription>
                Comparison between your skills and company requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge
                        variant={skill.gap <= 0 ? "default" : "outline"}
                        className={
                          skill.gap <= 0 ? "bg-green-500" : "text-amber-500"
                        }
                      >
                        {skill.gap <= 0
                          ? "Meets Requirement"
                          : `Gap: ${skill.gap}`}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">
                            Your Level
                          </span>
                          <span className="text-xs">
                            {skill.studentLevel}/10
                          </span>
                        </div>
                        <Progress
                          value={skill.studentLevel * 10}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">
                            Required Level
                          </span>
                          <span className="text-xs">
                            {skill.requiredLevel}/10
                          </span>
                        </div>
                        <Progress
                          value={skill.requiredLevel * 10}
                          className="h-2"
                        />
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Eligibility Criteria
              </CardTitle>
              <CardDescription>
                Basic requirements for application eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eligibilityCriteria.map((criteria, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{criteria.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          Your value:
                        </span>
                        <span className="text-sm font-medium">
                          {criteria.studentValue}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Required:
                        </span>
                        <span className="text-sm font-medium">
                          {criteria.requiredValue}
                        </span>
                      </div>
                    </div>
                    <div>
                      {criteria.isMet ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                Action items to improve your match score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getPriorityColor(
                      rec.priority,
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(rec.priority)}
                      >
                        {rec.priority.charAt(0).toUpperCase() +
                          rec.priority.slice(1)}{" "}
                        Priority
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">{rec.description}</p>
                    {rec.resources && rec.resources.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Recommended Resources:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {rec.resources.map((resource, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="text-xs flex items-center gap-1"
                            >
                              {resource.title}
                              {/* <ArrowUpRight className="h-3 w-3" /> */}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Interview Experiences
              </CardTitle>
              <CardDescription>
                Read interview experiences from candidates who interviewed at{" "}
                {displayName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <h4 className="font-semibold mb-2">
                    GeeksforGeeks Interview Experiences
                  </h4>
                  <p className="text-sm mb-3">
                    Explore real interview experiences from candidates who have
                    interviewed at {displayName}. Learn about the interview
                    process, questions asked, and tips from those who've been
                    through it.
                  </p>
                  <Button
                    asChild
                    variant="default"
                    className="w-full md:w-auto"
                  >
                    <a
                      href={`https://www.geeksforgeeks.org/companies/${displayName
                        .toLowerCase()
                        .replace(/\s+/g, "")}/articles/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Interview Experiences on GeeksforGeeks
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} variant="outline">
          Close Analysis
        </Button>
      </div>
    </motion.div>
  );
};

export default CompanyMatchAnalysis;
