import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gcorrvqrdglvupprppfx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjb3JydnFyZGdsdnVwcHJwcGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODg2MjcsImV4cCI6MjA2NDk2NDYyN30.mnlvIbkJAkafwi2uO6CZSqqyjykj7aqaStQ-n3LC27k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  user_id: string;
  cgpa: number;
  tenth_percentage: number;
  twelfth_percentage: number;
  backlogs: number;
  branch: string;
  codolio_profile?: string;
  technical_skills_rating?: number;
  personal_reflection?: string;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: string;
  user_id: string;
  profile_id: string;
  overall_score: number;
  analysis_data: any; // JSON data
  created_at: string;
}

// Profile operations
export const saveProfile = async (profileData: any, userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: userId,
        cgpa: parseFloat(profileData.academicDetails.cgpa),
        tenth_percentage: parseFloat(
          profileData.academicDetails.tenthPercentage,
        ),
        twelfth_percentage: parseFloat(
          profileData.academicDetails.twelfthPercentage,
        ),
        backlogs: parseInt(profileData.academicDetails.backlogs),
        branch: profileData.academicDetails.branch,
        codolio_profile: profileData.codolioProfile,
        technical_skills_rating: parseInt(
          profileData.selfAssessment?.technicalSkills || "0",
        ),
        personal_reflection: profileData.selfAssessment?.personalReflection,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
};

// Analysis operations
export const saveAnalysis = async (
  analysisData: any,
  userId: string,
  profileId: string,
) => {
  const { data, error } = await supabase
    .from("analyses")
    .insert({
      user_id: userId,
      profile_id: profileId,
      overall_score: analysisData.overallScore || 0,
      analysis_data: analysisData,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getLatestAnalysis = async (userId: string) => {
  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
};
