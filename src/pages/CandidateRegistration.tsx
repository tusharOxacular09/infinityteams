import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationProgress } from "@/components/registration/RegistrationProgress";
import { AccountStep } from "@/components/registration/steps/AccountStep";
import { PersonalInfoStep, type PersonalInfoData } from "@/components/registration/steps/PersonalInfoStep";
import { ProfessionalStep, type ProfessionalData } from "@/components/registration/steps/ProfessionalStep";
import { SkillsStep, type SkillEntry } from "@/components/registration/steps/SkillsStep";
import { EmploymentStep, type EmploymentEntry } from "@/components/registration/steps/EmploymentStep";
import { EducationStep, type EducationEntry } from "@/components/registration/steps/EducationStep";
import { CertificationsStep, type CertificationEntry } from "@/components/registration/steps/CertificationsStep";
import { ProjectsStep, type ProjectEntry } from "@/components/registration/steps/ProjectsStep";
import { ReviewStep } from "@/components/registration/steps/ReviewStep";
import { EmailVerificationStep } from "@/components/registration/steps/EmailVerificationStep";
import { 
  UserPlus, 
  User, 
  Building2, 
  Wrench, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  MailCheck
} from "lucide-react";
import infinityTeamsLogo from "@/assets/infinity-teams-logo.png";
import { CVUpload } from "@/components/registration/CVUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const steps = [
  { id: 1, title: "Account", icon: UserPlus },
  { id: 2, title: "Verify Email", icon: MailCheck },
  { id: 3, title: "Personal", icon: User },
  { id: 4, title: "Professional", icon: Building2 },
  { id: 5, title: "Skills", icon: Wrench },
  { id: 6, title: "Experience", icon: Briefcase },
  { id: 7, title: "Education", icon: GraduationCap },
  { id: 8, title: "Certifications", icon: Award },
  { id: 9, title: "CV Upload", icon: FileText },
  { id: 10, title: "Review", icon: CheckCircle },
];

export default function CandidateRegistrationPage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);

  // Form state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    full_name: "",
    email: "",
    phone: "",
    title: "",
    summary: "",
    location: "",
    country: "India",
  });

  const [professionalInfo, setProfessionalInfo] = useState<ProfessionalData>({
    years_experience: 0,
    level: "Junior",
    availability: "1 month",
    salary_expectation: null,
    preferred_work_type: "Any",
    linkedin_url: "",
  });

  const [employment, setEmployment] = useState<EmploymentEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [certifications, setCertifications] = useState<CertificationEntry[]>([]);

  // Check if user is logged in and has a profile
  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from("candidate_profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (data) {
          navigate("/profile");
        } else {
          // User is logged in but has no profile, skip to step 3 (personal info)
          setCurrentStep(3);
          setPersonalInfo((prev) => ({
            ...prev,
            email: user.email || "",
            full_name: user.user_metadata?.full_name || "",
          }));
        }
      }
    };

    if (!authLoading) {
      checkProfile();
    }
  }, [user, authLoading, navigate]);

  const handleAccountCreated = (userId: string, email: string) => {
    setPendingUserId(userId);
    setPendingEmail(email);
    setPersonalInfo((prev) => ({ ...prev, email }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 10));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    // Don't go back to account step if already logged in
    const minStep = user ? 3 : 1;
    setCurrentStep((prev) => Math.max(prev - 1, minStep));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSection = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepClick = (stepId: number) => {
    // In test mode, allow jumping to any step freely
    // When not in test mode, only allow jumping to completed steps or current
    if (testMode) {
      // Skip account & verify steps if already logged in
      if ((stepId === 1 || stepId === 2) && user) return;
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Allow clicking on completed steps or current step
      if (stepId <= currentStep) {
        if ((stepId === 1 || stepId === 2) && user) return;
        setCurrentStep(stepId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleCVParsed = (parsed: {
    personal: Partial<PersonalInfoData>;
    employment: EmploymentEntry[];
    education: EducationEntry[];
    skills: SkillEntry[];
    projects: ProjectEntry[];
    certifications: CertificationEntry[];
  }) => {
    // Update all state with parsed data
    setPersonalInfo((prev) => ({ ...prev, ...parsed.personal }));
    if (parsed.employment.length > 0) setEmployment(parsed.employment);
    if (parsed.education.length > 0) setEducation(parsed.education);
    if (parsed.skills.length > 0) setSkills(parsed.skills);
    if (parsed.projects.length > 0) setProjects(parsed.projects);
    if (parsed.certifications.length > 0) setCertifications(parsed.certifications);
    
    // Move to review step after CV parsing
    handleNext();
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete registration.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create or update candidate profile
      const { data: profile, error: profileError } = await supabase
        .from("candidate_profiles")
        .upsert({
          user_id: user.id,
          full_name: personalInfo.full_name,
          email: personalInfo.email,
          phone: personalInfo.phone,
          title: personalInfo.title,
          summary: personalInfo.summary,
          location: personalInfo.location,
          country: personalInfo.country,
          years_experience: professionalInfo.years_experience,
          level: professionalInfo.level,
          availability: professionalInfo.availability,
          salary_expectation: professionalInfo.salary_expectation,
        }, { onConflict: 'user_id' })
        .select()
        .single();

      if (profileError) throw profileError;

      const profileId = profile.id;

      // Add LinkedIn as social link if provided
      if (professionalInfo.linkedin_url) {
        await supabase.from("social_links").upsert({
          profile_id: profileId,
          platform: "LinkedIn",
          url: professionalInfo.linkedin_url,
        }, { onConflict: 'profile_id,platform' });
      }

      // Add employment history
      if (employment.length > 0) {
        const employmentData = employment.map((emp) => ({
          profile_id: profileId,
          company_name: emp.company_name,
          job_title: emp.job_title,
          location: emp.location,
          start_date: emp.start_date || new Date().toISOString().slice(0, 10),
          end_date: emp.is_current ? null : emp.end_date || null,
          is_current: emp.is_current,
          description: emp.description,
        }));

        const { error: empError } = await supabase
          .from("employment_history")
          .insert(employmentData);

        if (empError) console.error("Employment error:", empError);
      }

      // Add education
      if (education.length > 0) {
        const educationData = education.map((edu) => ({
          profile_id: profileId,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.field_of_study,
          start_date: edu.start_date || null,
          end_date: edu.end_date || null,
          grade: edu.grade,
          description: edu.description,
        }));

        const { error: eduError } = await supabase
          .from("education")
          .insert(educationData);

        if (eduError) console.error("Education error:", eduError);
      }

      // Add skills
      if (skills.length > 0) {
        const skillsData = skills.map((skill) => ({
          profile_id: profileId,
          skill_name: skill.skill_name,
          skill_type: skill.skill_type,
          proficiency: skill.proficiency,
          years_of_experience: skill.years_of_experience,
        }));

        const { error: skillError } = await supabase
          .from("candidate_skills")
          .insert(skillsData);

        if (skillError) console.error("Skills error:", skillError);
      }

      // Add projects
      if (projects.length > 0) {
        const projectsData = projects.map((proj) => ({
          profile_id: profileId,
          title: proj.title,
          description: proj.description,
          technologies: proj.technologies,
          project_url: proj.project_url || null,
          repo_url: proj.repo_url || null,
          start_date: proj.start_date || null,
          end_date: proj.end_date || null,
        }));

        const { error: projError } = await supabase
          .from("candidate_projects")
          .insert(projectsData);

        if (projError) console.error("Projects error:", projError);
      }

      // Add certifications
      if (certifications.length > 0) {
        const certsData = certifications.map((cert) => ({
          profile_id: profileId,
          name: cert.name,
          issuing_organization: cert.issuing_organization,
          issue_date: cert.issue_date || null,
          expiry_date: cert.expiry_date || null,
          credential_id: cert.credential_id || null,
          credential_url: cert.credential_url || null,
        }));

        const { error: certError } = await supabase
          .from("certifications")
          .insert(certsData);

        if (certError) console.error("Certifications error:", certError);
      }

      toast({
        title: "Profile Created! 🎉",
        description: "Your candidate profile has been successfully created.",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error creating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1" />
            <Link to="/" className="flex items-center">
              <img 
                src={infinityTeamsLogo} 
                alt="Infinity Teams" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="test-mode" className="text-xs text-muted-foreground cursor-pointer select-none">
                  Test Mode
                </Label>
                <Switch
                  id="test-mode"
                  checked={testMode}
                  onCheckedChange={setTestMode}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Create Your Profile
            </h1>
            <p className="text-muted-foreground">
              Complete your profile to get discovered by top companies
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <RegistrationProgress 
              steps={steps} 
              currentStep={currentStep} 
              totalSteps={steps.length}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && !user && (
                <AccountStep
                  onNext={handleNext}
                  onAccountCreated={handleAccountCreated}
                  testMode={testMode}
                />
              )}
              {currentStep === 2 && !user && (
                <EmailVerificationStep
                  email={pendingEmail || ""}
                  onNext={handleNext}
                  onBack={handleBack}
                  testMode={testMode}
                />
              )}
              {currentStep === 3 && (
                <PersonalInfoStep
                  data={personalInfo}
                  onUpdate={(data) => setPersonalInfo((prev) => ({ ...prev, ...data }))}
                  onNext={handleNext}
                  onBack={handleBack}
                  testMode={testMode}
                />
              )}
              {currentStep === 4 && (
                <ProfessionalStep
                  data={professionalInfo}
                  onUpdate={(data) => setProfessionalInfo((prev) => ({ ...prev, ...data }))}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 5 && (
                <SkillsStep
                  data={skills}
                  onUpdate={setSkills}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 6 && (
                <EmploymentStep
                  data={employment}
                  onUpdate={setEmployment}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 7 && (
                <EducationStep
                  data={education}
                  onUpdate={setEducation}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 8 && (
                <CertificationsStep
                  data={certifications}
                  onUpdate={setCertifications}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 9 && (
                <CVUploadStep
                  onNext={handleNext}
                  onBack={handleBack}
                  onCVParsed={handleCVParsed}
                />
              )}
              {currentStep === 10 && (
                <ReviewStep
                  personalInfo={{ 
                    ...personalInfo, 
                    years_experience: professionalInfo.years_experience,
                    level: professionalInfo.level,
                    availability: professionalInfo.availability,
                    salary_expectation: professionalInfo.salary_expectation,
                    linkedin_url: professionalInfo.linkedin_url,
                  }}
                  employment={employment}
                  education={education}
                  skills={skills}
                  projects={projects}
                  certifications={certifications}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  onEditSection={handleEditSection}
                  isSubmitting={isSubmitting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// CV Upload Step Component
function CVUploadStep({ 
  onNext, 
  onBack, 
  onCVParsed 
}: { 
  onNext: () => void; 
  onBack: () => void;
  onCVParsed: (parsed: any) => void;
}) {
  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Upload Your CV</CardTitle>
        <CardDescription>
          Upload your resume to auto-fill your profile with AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <CVUpload onParsed={onCVParsed} />
        
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} variant="cta" size="lg">
            Skip & Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
