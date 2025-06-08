-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  cgpa DECIMAL(3,2) NOT NULL,
  tenth_percentage DECIMAL(5,2) NOT NULL,
  twelfth_percentage DECIMAL(5,2) NOT NULL,
  backlogs INTEGER DEFAULT 0,
  branch TEXT NOT NULL,
  codolio_profile TEXT,
  technical_skills_rating INTEGER,
  personal_reflection TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL,
  analysis_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile" ON profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for analyses table
CREATE POLICY "Users can view own analyses" ON analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" ON analyses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON analyses
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);
CREATE INDEX IF NOT EXISTS analyses_user_id_idx ON analyses(user_id);
CREATE INDEX IF NOT EXISTS analyses_created_at_idx ON analyses(created_at DESC);
