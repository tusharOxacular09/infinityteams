-- Create enum types
CREATE TYPE public.experience_level AS ENUM ('Junior', 'Medior', 'Senior', 'Lead');
CREATE TYPE public.availability_status AS ENUM ('Immediately', '2 weeks', '1 month', '2+ months', 'Not available');
CREATE TYPE public.skill_type AS ENUM ('technical', 'soft');
CREATE TYPE public.proficiency_level AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');
CREATE TYPE public.app_role AS ENUM ('candidate', 'client', 'admin');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'candidate',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function to check user role (SECURITY DEFINER to avoid recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
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

-- Candidate profiles table
CREATE TABLE public.candidate_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  country TEXT DEFAULT 'India',
  avatar_url TEXT,
  title TEXT,
  summary TEXT,
  years_experience INTEGER DEFAULT 0,
  level experience_level DEFAULT 'Junior',
  hourly_rate DECIMAL(10,2),
  salary_expectation DECIMAL(10,2),
  availability availability_status DEFAULT 'Immediately',
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;

-- Employment history table
CREATE TABLE public.employment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.employment_history ENABLE ROW LEVEL SECURITY;

-- Education table
CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
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

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Skills table
CREATE TABLE public.candidate_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  skill_type skill_type DEFAULT 'technical',
  proficiency proficiency_level DEFAULT 'Intermediate',
  years_of_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;

-- Projects table
CREATE TABLE public.candidate_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
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

ALTER TABLE public.candidate_projects ENABLE ROW LEVEL SECURITY;

-- Certifications table
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Awards table
CREATE TABLE public.awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  issuing_organization TEXT,
  date_received DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;

-- Social links table
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Helper function to get profile owner
CREATE OR REPLACE FUNCTION public.get_profile_user_id(profile_id_arg UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id FROM public.candidate_profiles WHERE id = profile_id_arg
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- RLS Policies for candidate_profiles
CREATE POLICY "Candidates can view their own profile"
ON public.candidate_profiles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can view all candidate profiles"
ON public.candidate_profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can insert their own profile"
ON public.candidate_profiles FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Candidates can update their own profile"
ON public.candidate_profiles FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Candidates can delete their own profile"
ON public.candidate_profiles FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- RLS Policies for employment_history
CREATE POLICY "Users can view employment history"
ON public.employment_history FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can manage their employment history"
ON public.employment_history FOR INSERT
TO authenticated
WITH CHECK (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can update their employment history"
ON public.employment_history FOR UPDATE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can delete their employment history"
ON public.employment_history FOR DELETE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

-- RLS Policies for education
CREATE POLICY "Users can view education"
ON public.education FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can manage their education"
ON public.education FOR INSERT
TO authenticated
WITH CHECK (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can update their education"
ON public.education FOR UPDATE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can delete their education"
ON public.education FOR DELETE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

-- RLS Policies for candidate_skills
CREATE POLICY "Users can view skills"
ON public.candidate_skills FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can manage their skills"
ON public.candidate_skills FOR INSERT
TO authenticated
WITH CHECK (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can update their skills"
ON public.candidate_skills FOR UPDATE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can delete their skills"
ON public.candidate_skills FOR DELETE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

-- RLS Policies for candidate_projects
CREATE POLICY "Users can view projects"
ON public.candidate_projects FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can manage their projects"
ON public.candidate_projects FOR INSERT
TO authenticated
WITH CHECK (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can update their projects"
ON public.candidate_projects FOR UPDATE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can delete their projects"
ON public.candidate_projects FOR DELETE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

-- RLS Policies for certifications
CREATE POLICY "Users can view certifications"
ON public.certifications FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can manage their certifications"
ON public.certifications FOR INSERT
TO authenticated
WITH CHECK (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can update their certifications"
ON public.certifications FOR UPDATE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can delete their certifications"
ON public.certifications FOR DELETE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

-- RLS Policies for awards
CREATE POLICY "Users can view awards"
ON public.awards FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can manage their awards"
ON public.awards FOR INSERT
TO authenticated
WITH CHECK (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can update their awards"
ON public.awards FOR UPDATE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can delete their awards"
ON public.awards FOR DELETE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

-- RLS Policies for social_links
CREATE POLICY "Users can view social links"
ON public.social_links FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Candidates can manage their social links"
ON public.social_links FOR INSERT
TO authenticated
WITH CHECK (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can update their social links"
ON public.social_links FOR UPDATE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

CREATE POLICY "Candidates can delete their social links"
ON public.social_links FOR DELETE
TO authenticated
USING (public.get_profile_user_id(profile_id) = auth.uid());

-- Function to automatically create user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'candidate');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create user role on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
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