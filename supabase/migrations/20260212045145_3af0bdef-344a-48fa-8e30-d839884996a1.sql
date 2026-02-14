
-- Create skill catalog table
CREATE TABLE public.skill_catalog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  skill_type TEXT NOT NULL DEFAULT 'technical',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skill_catalog ENABLE ROW LEVEL SECURITY;

-- Everyone can read the catalog
CREATE POLICY "Anyone can view skill catalog"
ON public.skill_catalog
FOR SELECT
USING (true);

-- Create index for fast lookups
CREATE INDEX idx_skill_catalog_industry ON public.skill_catalog(industry);
CREATE INDEX idx_skill_catalog_subcategory ON public.skill_catalog(industry, subcategory);
CREATE INDEX idx_skill_catalog_name ON public.skill_catalog(name);

-- Add industry column to candidate_skills for better filtering
ALTER TABLE public.candidate_skills ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE public.candidate_skills ADD COLUMN IF NOT EXISTS subcategory TEXT;
