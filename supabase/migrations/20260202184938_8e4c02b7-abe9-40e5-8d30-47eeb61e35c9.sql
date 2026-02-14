-- Create experience level enum
CREATE TYPE public.experience_level AS ENUM ('Junior', 'Medior', 'Senior', 'Lead');

-- Create availability status enum
CREATE TYPE public.availability_status AS ENUM ('Immediately', '2 weeks', '1 month', '2+ months', 'Not available');

-- Create skill type enum
CREATE TYPE public.skill_type AS ENUM ('technical', 'soft');

-- Create proficiency level enum
CREATE TYPE public.proficiency_level AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');

-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('candidate', 'client', 'admin');

-- Create candidate_profiles table
CREATE TABLE public.candidate_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  country TEXT,
  avatar_url TEXT,
  title TEXT,
  summary TEXT,
  years_experience INTEGER DEFAULT 0,
  level public.experience_level DEFAULT 'Junior',
  hourly_rate NUMERIC,
  salary_expectation NUMERIC,
  availability public.availability_status DEFAULT '1 month',
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  cv_url TEXT,
  cv_parsed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create employment_history table
CREATE TABLE public.employment_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  grade TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create candidate_skills table
CREATE TABLE public.candidate_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_type public.skill_type DEFAULT 'technical',
  proficiency public.proficiency_level DEFAULT 'Intermediate',
  years_of_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create candidate_projects table
CREATE TABLE public.candidate_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT[],
  project_url TEXT,
  repo_url TEXT,
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create awards table
CREATE TABLE public.awards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  issuing_organization TEXT,
  date_received DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id, platform)
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role public.app_role NOT NULL DEFAULT 'candidate',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function to get user_id from profile_id
CREATE OR REPLACE FUNCTION public.get_profile_user_id(profile_id_arg UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id FROM public.candidate_profiles WHERE id = profile_id_arg
$$;

-- Helper function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for candidate_profiles
CREATE POLICY "Users can view their own profile"
  ON public.candidate_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.candidate_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.candidate_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Clients can view all profiles"
  ON public.candidate_profiles FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'client') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS for employment_history
CREATE POLICY "Users can manage their own employment"
  ON public.employment_history FOR ALL
  USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Clients can view employment"
  ON public.employment_history FOR SELECT
  TO authenticated
  USING (true);

-- RLS for education
CREATE POLICY "Users can manage their own education"
  ON public.education FOR ALL
  USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Clients can view education"
  ON public.education FOR SELECT
  TO authenticated
  USING (true);

-- RLS for candidate_skills
CREATE POLICY "Users can manage their own skills"
  ON public.candidate_skills FOR ALL
  USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Clients can view skills"
  ON public.candidate_skills FOR SELECT
  TO authenticated
  USING (true);

-- RLS for candidate_projects
CREATE POLICY "Users can manage their own projects"
  ON public.candidate_projects FOR ALL
  USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Clients can view projects"
  ON public.candidate_projects FOR SELECT
  TO authenticated
  USING (true);

-- RLS for certifications
CREATE POLICY "Users can manage their own certifications"
  ON public.certifications FOR ALL
  USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Clients can view certifications"
  ON public.certifications FOR SELECT
  TO authenticated
  USING (true);

-- RLS for awards
CREATE POLICY "Users can manage their own awards"
  ON public.awards FOR ALL
  USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Clients can view awards"
  ON public.awards FOR SELECT
  TO authenticated
  USING (true);

-- RLS for social_links
CREATE POLICY "Users can manage their own social links"
  ON public.social_links FOR ALL
  USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Clients can view social links"
  ON public.social_links FOR SELECT
  TO authenticated
  USING (true);

-- RLS for user_roles (only admins can modify)
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Create storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'candidate-cvs', 
  'candidate-cvs', 
  false,
  5242880,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
);

-- Storage policies for CVs
CREATE POLICY "Users can upload their own CVs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'candidate-cvs' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own CVs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'candidate-cvs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own CVs"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'candidate-cvs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_candidate_profiles_updated_at
  BEFORE UPDATE ON public.candidate_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employment_history_updated_at
  BEFORE UPDATE ON public.employment_history
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON public.education
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_candidate_projects_updated_at
  BEFORE UPDATE ON public.candidate_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();