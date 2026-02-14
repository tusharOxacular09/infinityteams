import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCandidateProfile } from "@/hooks/useCandidateProfile";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { EmploymentSection } from "@/components/profile/EmploymentSection";
import { EducationSection } from "@/components/profile/EducationSection";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { ProjectsSection } from "@/components/profile/ProjectsSection";
import { CertificationsSection } from "@/components/profile/CertificationsSection";
import { AwardsSection } from "@/components/profile/AwardsSection";
import { SocialLinksSection } from "@/components/profile/SocialLinksSection";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CandidateProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("header");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const {
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
  } = useCandidateProfile();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Intersection observer for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = ["header", "employment", "education", "skills", "projects", "certifications", "awards", "social-links"];

    sectionIds.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [profile]);

  const handleSectionClick = useCallback((sectionId: string) => {
    const el = sectionRefs.current[sectionId];
    if (el) {
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const setSectionRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  // Calculate profile completion
  const calculateCompletion = () => {
    if (!profile) return 0;
    let score = 0;
    if (profile.full_name) score += 8;
    if (profile.email) score += 5;
    if (profile.phone) score += 5;
    if (profile.title) score += 8;
    if (profile.summary) score += 8;
    if (profile.location) score += 3;
    if (profile.country) score += 3;
    if (employment.length > 0) score += 20;
    if (education.length > 0) score += 12;
    if (skills.length >= 3) score += 15;
    else if (skills.length >= 1) score += 8;
    if (projects.length >= 1) score += 8;
    if (certifications.length >= 1) score += 5;
    return Math.min(score, 100);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              <div className="hidden lg:block w-64 flex-shrink-0 space-y-4">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-80 rounded-xl" />
              </div>
              <div className="flex-1 space-y-6">
                <Card className="overflow-hidden">
                  <Skeleton className="h-44 w-full" />
                  <CardContent className="p-6">
                    <div className="flex gap-6 -mt-12">
                      <Skeleton className="h-28 w-28 rounded-full border-4 border-background" />
                      <div className="flex-1 space-y-3 pt-14">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-64" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 mt-6">
                      {[1,2,3,4].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
                    </div>
                  </CardContent>
                </Card>
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-40 mb-4" />
                      <Skeleton className="h-24 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <ArrowRight className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              Your profile hasn't been created yet. Complete registration to build your professional profile and get discovered by top companies.
            </p>
            <Button variant="cta" size="lg" onClick={() => navigate("/candidate-registration")}>
              Complete Registration
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex gap-8">
            {/* Sidebar - hidden on mobile */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <ProfileSidebar
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
                completionPercentage={calculateCompletion()}
                sectionCounts={{
                  employment: employment.length,
                  education: education.length,
                  skills: skills.length,
                  projects: projects.length,
                  certifications: certifications.length,
                  awards: awards.length,
                  socialLinks: socialLinks.length,
                }}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-5">
              <div ref={setSectionRef("header")}>
                <ProfileHeader profile={profile} onUpdate={updateProfile} />
              </div>

              <div ref={setSectionRef("employment")}>
                <EmploymentSection
                  employment={employment}
                  onAdd={addEmployment}
                  onUpdate={updateEmployment}
                  onDelete={deleteEmployment}
                />
              </div>

              <div ref={setSectionRef("education")}>
                <EducationSection
                  education={education}
                  onAdd={addEducation}
                  onUpdate={updateEducation}
                  onDelete={deleteEducation}
                />
              </div>

              <div ref={setSectionRef("skills")}>
                <SkillsSection
                  skills={skills}
                  onAdd={addSkill}
                  onUpdate={updateSkill}
                  onDelete={deleteSkill}
                />
              </div>

              <div ref={setSectionRef("projects")}>
                <ProjectsSection
                  projects={projects}
                  onAdd={addProject}
                  onUpdate={updateProject}
                  onDelete={deleteProject}
                />
              </div>

              <div ref={setSectionRef("certifications")}>
                <CertificationsSection
                  certifications={certifications}
                  onAdd={addCertification}
                  onUpdate={updateCertification}
                  onDelete={deleteCertification}
                />
              </div>

              <div ref={setSectionRef("awards")}>
                <AwardsSection
                  awards={awards}
                  onAdd={addAward}
                  onUpdate={updateAward}
                  onDelete={deleteAward}
                />
              </div>

              <div ref={setSectionRef("social-links")}>
                <SocialLinksSection
                  socialLinks={socialLinks}
                  onAdd={addSocialLink}
                  onUpdate={updateSocialLink}
                  onDelete={deleteSocialLink}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
