import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Briefcase, 
  GraduationCap,
  Code,
  FolderOpen,
  Award,
  Loader2,
  Edit
} from "lucide-react";
import type { EmploymentEntry } from "./EmploymentStep";
import type { EducationEntry } from "./EducationStep";
import type { SkillEntry } from "./SkillsStep";
import type { ProjectEntry } from "./ProjectsStep";
import type { CertificationEntry } from "./CertificationsStep";

interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  title: string;
  summary: string;
  location: string;
  country: string;
  years_experience?: number;
  level?: string;
  availability?: string;
  salary_expectation?: number | null;
  linkedin_url?: string;
}

interface ReviewStepProps {
  personalInfo: PersonalInfo;
  employment: EmploymentEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  onBack: () => void;
  onSubmit: () => void;
  onEditSection: (step: number) => void;
  isSubmitting: boolean;
}

export function ReviewStep({
  personalInfo,
  employment,
  education,
  skills,
  projects,
  certifications,
  onBack,
  onSubmit,
  onEditSection,
  isSubmitting,
}: ReviewStepProps) {
  // Calculate profile completion
  const calculateCompletion = () => {
    let score = 0;
    let total = 0;

    // Personal info (25%)
    total += 25;
    if (personalInfo.full_name) score += 5;
    if (personalInfo.email) score += 5;
    if (personalInfo.phone) score += 3;
    if (personalInfo.title) score += 4;
    if (personalInfo.location) score += 3;
    if (personalInfo.summary) score += 5;

    // Employment (25%)
    total += 25;
    if (employment.length > 0) score += 25;
    else if (employment.length === 0) score += 5; // Give some credit even if empty

    // Education (15%)
    total += 15;
    if (education.length > 0) score += 15;

    // Skills (20%)
    total += 20;
    const technicalSkills = skills.filter(s => s.skill_type === "technical").length;
    const softSkills = skills.filter(s => s.skill_type === "soft").length;
    if (technicalSkills >= 5) score += 12;
    else if (technicalSkills >= 3) score += 8;
    else if (technicalSkills >= 1) score += 4;
    if (softSkills >= 2) score += 8;
    else if (softSkills >= 1) score += 4;

    // Projects (10%)
    total += 10;
    if (projects.length >= 2) score += 10;
    else if (projects.length >= 1) score += 5;

    // Certifications (5%)
    total += 5;
    if (certifications.length > 0) score += 5;

    return Math.round((score / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Profile</h2>
        <p className="text-muted-foreground">Make sure everything looks good before submitting</p>
      </div>

      {/* Profile Completion */}
      <Card className="bg-muted/30">
        <CardContent className="py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Profile Completion</span>
            <span className={`font-bold ${getCompletionColor(completionPercentage)}`}>
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          {completionPercentage < 80 && (
            <p className="text-sm text-muted-foreground mt-2">
              Tip: Complete profiles get 3x more views from companies
            </p>
          )}
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditSection(3)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{personalInfo.full_name || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{personalInfo.email || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{personalInfo.phone || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{personalInfo.location}, {personalInfo.country || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Job Title</p>
              <p className="font-medium">{personalInfo.title || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Experience Level</p>
              <p className="font-medium">{personalInfo.level} ({personalInfo.years_experience} years)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Availability</p>
              <Badge variant="secondary">{personalInfo.availability}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Salary</p>
              <p className="font-medium">
                {personalInfo.salary_expectation 
                  ? `₹${personalInfo.salary_expectation.toLocaleString()}/month` 
                  : "Not specified"}
              </p>
            </div>
          </div>
          {personalInfo.summary && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Professional Summary</p>
                <p className="text-sm">{personalInfo.summary}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Employment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Employment History ({employment.length})
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditSection(6)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {employment.length === 0 ? (
            <p className="text-sm text-muted-foreground">No employment history added</p>
          ) : (
            <div className="space-y-4">
              {employment.map((emp) => (
                <div key={emp.id} className="flex gap-4">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{emp.job_title}</p>
                    <p className="text-sm text-muted-foreground">
                      {emp.company_name} • {emp.start_date} - {emp.is_current ? "Present" : emp.end_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education ({education.length})
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditSection(7)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <p className="text-sm text-muted-foreground">No education added</p>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-4">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{edu.degree} in {edu.field_of_study}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution} • {edu.end_date || "Present"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Skills ({skills.length})
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditSection(5)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <p className="text-sm text-muted-foreground">No skills added</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge 
                  key={skill.id} 
                  variant={skill.skill_type === "technical" ? "default" : "secondary"}
                >
                  {skill.skill_name} • {skill.proficiency}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Projects ({projects.length})
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditSection(6)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects added</p>
          ) : (
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="flex gap-4">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{proj.title}</p>
                    {proj.technologies.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {proj.technologies.slice(0, 5).map(tech => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {proj.technologies.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{proj.technologies.length - 5}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Certifications ({certifications.length})
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditSection(8)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {certifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No certifications added</p>
          ) : (
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex gap-4">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.issuing_organization}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg" disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onSubmit} variant="cta" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Profile...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete Registration
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
