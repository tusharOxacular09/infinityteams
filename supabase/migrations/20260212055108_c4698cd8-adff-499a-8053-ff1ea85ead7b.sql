
-- Add skill_group column (Level 2) to skill_catalog
ALTER TABLE public.skill_catalog ADD COLUMN skill_group text;

-- Update existing data with skill_group mappings based on current industry and subcategory
-- Information Technology
UPDATE public.skill_catalog SET skill_group = 'Programming' WHERE industry = 'Information Technology' AND subcategory = 'Programming Languages';
UPDATE public.skill_catalog SET skill_group = 'Frontend Development' WHERE industry = 'Information Technology' AND subcategory = 'Frontend Development';
UPDATE public.skill_catalog SET skill_group = 'Backend Development' WHERE industry = 'Information Technology' AND subcategory = 'Backend Development';
UPDATE public.skill_catalog SET skill_group = 'Database' WHERE industry = 'Information Technology' AND subcategory = 'Database & Data Storage';
UPDATE public.skill_catalog SET skill_group = 'Cloud & DevOps' WHERE industry = 'Information Technology' AND subcategory = 'DevOps & Cloud';
UPDATE public.skill_catalog SET skill_group = 'CMS & Ecommerce' WHERE industry = 'Information Technology' AND subcategory = 'CMS & E-Commerce';
UPDATE public.skill_catalog SET skill_group = 'Testing & QA' WHERE industry = 'Information Technology' AND subcategory = 'Testing & QA';
UPDATE public.skill_catalog SET skill_group = 'API & Integration' WHERE industry = 'Information Technology' AND subcategory = 'API & Integration';

-- AI & Data Science
UPDATE public.skill_catalog SET skill_group = 'Machine Learning' WHERE industry = 'AI & Data Science' AND subcategory = 'AI / ML';
UPDATE public.skill_catalog SET skill_group = 'Data Engineering' WHERE industry = 'AI & Data Science' AND subcategory = 'Data Engineering';
UPDATE public.skill_catalog SET skill_group = 'Data Analytics' WHERE industry = 'AI & Data Science' AND subcategory = 'Data Analysis & BI';
UPDATE public.skill_catalog SET skill_group = 'AI Frameworks' WHERE industry = 'AI & Data Science' AND subcategory = 'AI Frameworks';

-- Digital Marketing
UPDATE public.skill_catalog SET skill_group = 'SEO' WHERE industry = 'Digital Marketing' AND subcategory = 'SEO & SEM';
UPDATE public.skill_catalog SET skill_group = 'Social Media Marketing' WHERE industry = 'Digital Marketing' AND subcategory = 'Social Media Marketing';
UPDATE public.skill_catalog SET skill_group = 'Content Marketing' WHERE industry = 'Digital Marketing' AND subcategory = 'Content Marketing';
UPDATE public.skill_catalog SET skill_group = 'Marketing Analytics' WHERE industry = 'Digital Marketing' AND subcategory = 'Analytics';

-- Finance & Accounting
UPDATE public.skill_catalog SET skill_group = 'Accounting Operations' WHERE industry = 'Finance & Accounting' AND subcategory = 'Accounting';
UPDATE public.skill_catalog SET skill_group = 'Financial Analysis' WHERE industry = 'Finance & Accounting' AND subcategory = 'Financial Analysis';
UPDATE public.skill_catalog SET skill_group = 'ERP Financial Tools' WHERE industry = 'Finance & Accounting' AND subcategory = 'Tools';

-- Engineering & Architecture
UPDATE public.skill_catalog SET skill_group = 'Civil Engineering' WHERE industry = 'Engineering & Architecture' AND subcategory = 'Civil Engineering';
UPDATE public.skill_catalog SET skill_group = 'Mechanical Engineering' WHERE industry = 'Engineering & Architecture' AND subcategory = 'Mechanical Engineering';
UPDATE public.skill_catalog SET skill_group = 'Electrical Engineering' WHERE industry = 'Engineering & Architecture' AND subcategory = 'Electrical Engineering';

-- Legal Process Outsourcing
UPDATE public.skill_catalog SET skill_group = 'Legal Research' WHERE industry = 'Legal Process Outsourcing' AND subcategory = 'Legal Services';

-- Medical Process Outsourcing
UPDATE public.skill_catalog SET skill_group = 'Medical Billing' WHERE industry = 'Medical Process Outsourcing' AND subcategory = 'Medical Services';

-- Creative & Design
UPDATE public.skill_catalog SET skill_group = 'Graphic Design' WHERE industry = 'Creative & Design' AND subcategory = 'Design Tools';
UPDATE public.skill_catalog SET skill_group = 'Animation & Motion Graphics' WHERE industry = 'Creative & Design' AND subcategory = 'Multimedia';

-- Business Process Outsourcing
UPDATE public.skill_catalog SET skill_group = 'Customer Support' WHERE industry = 'Business Process Outsourcing' AND subcategory = 'BPO Services';

-- Soft Skills
UPDATE public.skill_catalog SET skill_group = 'Soft Skills' WHERE industry = 'Soft Skills' AND subcategory = 'Soft Skills';

-- Set NOT NULL after populating
-- First set any remaining nulls
UPDATE public.skill_catalog SET skill_group = subcategory WHERE skill_group IS NULL;

-- Make it NOT NULL
ALTER TABLE public.skill_catalog ALTER COLUMN skill_group SET NOT NULL;

-- Also add skill_group to candidate_skills table
ALTER TABLE public.candidate_skills ADD COLUMN skill_group text;

-- Add "Mobile Development" and "Cloud & DevOps" industries with skills
INSERT INTO public.skill_catalog (name, industry, skill_group, subcategory, skill_type) VALUES
-- Mobile Development
('Swift', 'Mobile Development', 'Native Mobile', 'iOS Development', 'technical'),
('SwiftUI', 'Mobile Development', 'Native Mobile', 'iOS Development', 'technical'),
('Objective-C', 'Mobile Development', 'Native Mobile', 'iOS Development', 'technical'),
('Kotlin', 'Mobile Development', 'Native Mobile', 'Android Development', 'technical'),
('Jetpack Compose', 'Mobile Development', 'Native Mobile', 'Android Development', 'technical'),
('Java (Android)', 'Mobile Development', 'Native Mobile', 'Android Development', 'technical'),
('Flutter', 'Mobile Development', 'Cross Platform Mobile', 'Flutter Development', 'technical'),
('React Native', 'Mobile Development', 'Cross Platform Mobile', 'React Native Development', 'technical'),
('Xamarin', 'Mobile Development', 'Cross Platform Mobile', 'Xamarin Development', 'technical'),
('Ionic', 'Mobile Development', 'Cross Platform Mobile', 'Hybrid Development', 'technical'),
('Mobile UI Design', 'Mobile Development', 'Mobile UI/UX', 'Mobile Design', 'technical'),
('Mobile Prototyping', 'Mobile Development', 'Mobile UI/UX', 'Mobile Design', 'technical'),
('Appium', 'Mobile Development', 'Mobile Testing', 'Mobile QA', 'technical'),
('XCTest', 'Mobile Development', 'Mobile Testing', 'Mobile QA', 'technical'),
('Espresso', 'Mobile Development', 'Mobile Testing', 'Mobile QA', 'technical'),
-- Cloud & DevOps
('EC2', 'Cloud & DevOps', 'AWS Services', 'Compute', 'technical'),
('S3', 'Cloud & DevOps', 'AWS Services', 'Storage', 'technical'),
('Lambda', 'Cloud & DevOps', 'AWS Services', 'Serverless', 'technical'),
('CloudFront', 'Cloud & DevOps', 'AWS Services', 'CDN', 'technical'),
('DynamoDB', 'Cloud & DevOps', 'AWS Services', 'Database', 'technical'),
('RDS', 'Cloud & DevOps', 'AWS Services', 'Database', 'technical'),
('Azure VMs', 'Cloud & DevOps', 'Azure Services', 'Compute', 'technical'),
('Azure Functions', 'Cloud & DevOps', 'Azure Services', 'Serverless', 'technical'),
('Azure DevOps', 'Cloud & DevOps', 'Azure Services', 'CI/CD', 'technical'),
('Azure Blob Storage', 'Cloud & DevOps', 'Azure Services', 'Storage', 'technical'),
('Docker', 'Cloud & DevOps', 'Kubernetes & Containers', 'Containerization', 'technical'),
('Kubernetes', 'Cloud & DevOps', 'Kubernetes & Containers', 'Orchestration', 'technical'),
('Helm', 'Cloud & DevOps', 'Kubernetes & Containers', 'Package Management', 'technical'),
('Terraform', 'Cloud & DevOps', 'Infrastructure as Code', 'IaC Tools', 'technical'),
('Ansible', 'Cloud & DevOps', 'Infrastructure as Code', 'Configuration Management', 'technical'),
('Pulumi', 'Cloud & DevOps', 'Infrastructure as Code', 'IaC Tools', 'technical'),
('Jenkins', 'Cloud & DevOps', 'CI/CD Pipelines', 'CI/CD Tools', 'technical'),
('GitHub Actions', 'Cloud & DevOps', 'CI/CD Pipelines', 'CI/CD Tools', 'technical'),
('GitLab CI', 'Cloud & DevOps', 'CI/CD Pipelines', 'CI/CD Tools', 'technical'),
('ArgoCD', 'Cloud & DevOps', 'CI/CD Pipelines', 'GitOps', 'technical');
