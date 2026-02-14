import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface CandidateProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  country: string | null;
  avatar_url: string | null;
  title: string | null;
  summary: string | null;
  years_experience: number;
  level: "Junior" | "Medior" | "Senior" | "Lead";
  hourly_rate: number | null;
  salary_expectation: number | null;
  availability: "Immediately" | "2 weeks" | "1 month" | "2+ months" | "Not available";
  is_verified: boolean;
  is_featured: boolean;
  rating: number;
  completed_projects: number;
  created_at: string;
  updated_at: string;
}

export interface EmploymentHistory {
  id: string;
  profile_id: string;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  location: string | null;
}

export interface Education {
  id: string;
  profile_id: string;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  grade: string | null;
  description: string | null;
}

export interface CandidateSkill {
  id: string;
  profile_id: string;
  skill_name: string;
  skill_type: "technical" | "soft";
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  years_of_experience: number;
  industry?: string | null;
  subcategory?: string | null;
}

export interface SkillCatalogItem {
  id: string;
  name: string;
  industry: string;
  subcategory: string;
  skill_type: string;
}

export interface CandidateProject {
  id: string;
  profile_id: string;
  title: string;
  description: string | null;
  technologies: string[] | null;
  project_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface Certification {
  id: string;
  profile_id: string;
  name: string;
  issuing_organization: string;
  issue_date: string | null;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
}

export interface Award {
  id: string;
  profile_id: string;
  title: string;
  issuing_organization: string | null;
  date_received: string | null;
  description: string | null;
}

export interface SocialLink {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
}

export function useCandidateProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [employment, setEmployment] = useState<EmploymentHistory[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<CandidateSkill[]>([]);
  const [projects, setProjects] = useState<CandidateProject[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      if (profileData) {
        // Fetch related data in parallel
        const [
          { data: empData },
          { data: eduData },
          { data: skillData },
          { data: projData },
          { data: certData },
          { data: awardData },
          { data: socialData }
        ] = await Promise.all([
          supabase.from('employment_history').select('*').eq('profile_id', profileData.id).order('start_date', { ascending: false }),
          supabase.from('education').select('*').eq('profile_id', profileData.id).order('start_date', { ascending: false }),
          supabase.from('candidate_skills').select('*').eq('profile_id', profileData.id),
          supabase.from('candidate_projects').select('*').eq('profile_id', profileData.id).order('start_date', { ascending: false }),
          supabase.from('certifications').select('*').eq('profile_id', profileData.id),
          supabase.from('awards').select('*').eq('profile_id', profileData.id),
          supabase.from('social_links').select('*').eq('profile_id', profileData.id)
        ]);

        setEmployment(empData || []);
        setEducation(eduData || []);
        setSkills(skillData || []);
        setProjects(projData || []);
        setCertifications(certData || []);
        setAwards(awardData || []);
        setSocialLinks(socialData || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateProfile = async (data: Partial<CandidateProfile>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('candidate_profiles')
      .update(data)
      .eq('id', profile.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return { error };
    }

    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
    await fetchProfile();
    return { error: null };
  };

  // Employment CRUD
  const addEmployment = async (data: Omit<EmploymentHistory, 'id' | 'profile_id'>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('employment_history')
      .insert({ ...data, profile_id: profile.id });

    if (!error) await fetchProfile();
    return { error };
  };

  const updateEmployment = async (id: string, data: Partial<EmploymentHistory>) => {
    const { error } = await supabase
      .from('employment_history')
      .update(data)
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  const deleteEmployment = async (id: string) => {
    const { error } = await supabase
      .from('employment_history')
      .delete()
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  // Education CRUD
  const addEducation = async (data: Omit<Education, 'id' | 'profile_id'>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('education')
      .insert({ ...data, profile_id: profile.id });

    if (!error) await fetchProfile();
    return { error };
  };

  const updateEducation = async (id: string, data: Partial<Education>) => {
    const { error } = await supabase
      .from('education')
      .update(data)
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  const deleteEducation = async (id: string) => {
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  // Skills CRUD
  const addSkill = async (data: Omit<CandidateSkill, 'id' | 'profile_id'>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('candidate_skills')
      .insert({ 
        skill_name: data.skill_name,
        skill_type: data.skill_type,
        proficiency: data.proficiency,
        years_of_experience: data.years_of_experience,
        industry: data.industry || null,
        subcategory: data.subcategory || null,
        profile_id: profile.id,
      });

    if (!error) await fetchProfile();
    return { error };
  };

  const updateSkill = async (id: string, data: Partial<CandidateSkill>) => {
    const { error } = await supabase
      .from('candidate_skills')
      .update(data)
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  const deleteSkill = async (id: string) => {
    const { error } = await supabase
      .from('candidate_skills')
      .delete()
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  // Projects CRUD
  const addProject = async (data: Omit<CandidateProject, 'id' | 'profile_id'>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('candidate_projects')
      .insert({ ...data, profile_id: profile.id });

    if (!error) await fetchProfile();
    return { error };
  };

  const updateProject = async (id: string, data: Partial<CandidateProject>) => {
    const { error } = await supabase
      .from('candidate_projects')
      .update(data)
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('candidate_projects')
      .delete()
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  // Certifications CRUD
  const addCertification = async (data: Omit<Certification, 'id' | 'profile_id'>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('certifications')
      .insert({ ...data, profile_id: profile.id });

    if (!error) await fetchProfile();
    return { error };
  };

  const updateCertification = async (id: string, data: Partial<Certification>) => {
    const { error } = await supabase
      .from('certifications')
      .update(data)
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  const deleteCertification = async (id: string) => {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  // Awards CRUD
  const addAward = async (data: Omit<Award, 'id' | 'profile_id'>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('awards')
      .insert({ ...data, profile_id: profile.id });

    if (!error) await fetchProfile();
    return { error };
  };

  const updateAward = async (id: string, data: Partial<Award>) => {
    const { error } = await supabase
      .from('awards')
      .update(data)
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  const deleteAward = async (id: string) => {
    const { error } = await supabase
      .from('awards')
      .delete()
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  // Social Links CRUD
  const addSocialLink = async (data: Omit<SocialLink, 'id' | 'profile_id'>) => {
    if (!profile) return { error: new Error('No profile found') };

    const { error } = await supabase
      .from('social_links')
      .insert({ ...data, profile_id: profile.id });

    if (!error) await fetchProfile();
    return { error };
  };

  const updateSocialLink = async (id: string, data: Partial<SocialLink>) => {
    const { error } = await supabase
      .from('social_links')
      .update(data)
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  const deleteSocialLink = async (id: string) => {
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id);

    if (!error) await fetchProfile();
    return { error };
  };

  return {
    profile,
    employment,
    education,
    skills,
    projects,
    certifications,
    awards,
    socialLinks,
    isLoading,
    updateProfile,
    addEmployment,
    updateEmployment,
    deleteEmployment,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addAward,
    updateAward,
    deleteAward,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    refreshProfile: fetchProfile,
  };
}
