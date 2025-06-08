import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// Convert file to base64 for Gemini
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

// Analyze profile against company requirements using Gemini
export async function analyzeProfileWithGemini(
  profileData: any,
  resumeFile: File | null,
  companyRequirementsFile: File | null,
  jobDescriptionText: string | null
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the content parts for Gemini
    const parts: any[] = [];

    // Add the main prompt
    parts.push({
      text: `Analyze the following student profile against company requirements and provide a detailed analysis:

STUDENT PROFILE:
- CGPA: ${profileData.academicDetails?.cgpa}
- Branch: ${profileData.academicDetails?.branch}
- 10th Percentage: ${profileData.academicDetails?.tenthPercentage}%
- 12th Percentage: ${profileData.academicDetails?.twelfthPercentage}%
- Backlogs: ${profileData.academicDetails?.backlogs}
- Codolio Profile: ${profileData.codolioProfile}
- Technical Skills Rating: ${profileData.selfAssessment?.technicalSkills}/10
- Personal Reflection: ${profileData.selfAssessment?.personalReflection}

I am providing you with a Resume PDF and either a Company Requirements PDF or the job description text directly.

1. Resume PDF - Extract all relevant information including skills, projects, experience, education details
2. Company Requirements (either PDF or text) - Extract company names, job requirements, eligibility criteria, required skills

Please analyze the resume content against the company requirements and provide a comprehensive analysis in the following JSON format:
{
  "overallScore": number (0-100),
  "companies": [
    {
      "name": "Company Name",
      "matchPercentage": number (0-100),
      "description": "Brief company description",
      "eligibilityCriteria": [
        {
          "name": "Criteria name",
          "studentValue": "Student's value",
          "requiredValue": "Required value",
          "isMet": boolean
        }
      ],
      "skillGaps": [
        {
          "skill": "Skill name",
          "studentLevel": number (1-10),
          "requiredLevel": number (1-10),
          "gap": number
        }
      ],
      "recommendations": [
        {
          "title": "Recommendation title",
          "description": "Detailed description",
          "priority": "high|medium|low",
          "resources": [
            {
              "title": "Resource title",
              "link": "Resource URL"
            }
          ]
        }
      ],
      "strengthAreas": ["List of strengths"],
      "improvementAreas": ["List of improvement areas"]
    }
  ],
  "actionPlan": [
    {
      "action": "Action description",
      "timeline": "Timeline estimate",
      "resources": [
        {
          "name": "Resource name",
          "url": "Resource URL"
        }
      ]
    }
  ]
}

Ensure all companies mentioned are extracted from the company requirements document only. Provide realistic skill assessments and actionable recommendations. Return only the JSON response without any additional text.`,
    });

    // Add resume PDF if provided
    if (resumeFile) {
      const resumeBase64 = await fileToBase64(resumeFile);
      parts.push({
        inlineData: {
          mimeType: "application/pdf",
          data: resumeBase64,
        },
      });
    }

    // Add company requirements PDF or text if provided
    if (companyRequirementsFile) {
      const companyBase64 = await fileToBase64(companyRequirementsFile);
      parts.push({
        inlineData: {
          mimeType: "application/pdf",
          data: companyBase64,
        },
      });
    } else if (jobDescriptionText) {
      parts.push({
        text: `COMPANY REQUIREMENTS TEXT:\n${jobDescriptionText}`,
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error) {
    console.error("Error analyzing profile with Gemini:", error);
    throw new Error(
      "Failed to analyze profile with AI: " + (error as Error).message
    );
  }
}
