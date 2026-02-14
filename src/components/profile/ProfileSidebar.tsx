import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Trophy,
  Link2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface ProfileSection {
  id: string;
  label: string;
  icon: React.ElementType;
  count?: number;
}

interface ProfileSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  completionPercentage: number;
  sectionCounts: {
    employment: number;
    education: number;
    skills: number;
    projects: number;
    certifications: number;
    awards: number;
    socialLinks: number;
  };
}

const sections: ProfileSection[] = [
  { id: "header", label: "Personal Info", icon: User },
  { id: "employment", label: "Work Experience", icon: Building2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "awards", label: "Awards", icon: Trophy },
  { id: "social-links", label: "Social Links", icon: Link2 },
];

export function ProfileSidebar({
  activeSection,
  onSectionClick,
  completionPercentage,
  sectionCounts,
}: ProfileSidebarProps) {
  const getCompletionConfig = (pct: number) => {
    if (pct >= 80) return { color: "text-success", bg: "bg-success/10", icon: CheckCircle2, label: "Strong Profile" };
    if (pct >= 50) return { color: "text-warning", bg: "bg-warning/10", icon: TrendingUp, label: "Getting There" };
    return { color: "text-destructive", bg: "bg-destructive/10", icon: AlertCircle, label: "Needs Work" };
  };

  const completionConfig = getCompletionConfig(completionPercentage);
  const CompletionIcon = completionConfig.icon;

  const getCount = (id: string): number | undefined => {
    const map: Record<string, number> = {
      employment: sectionCounts.employment,
      education: sectionCounts.education,
      skills: sectionCounts.skills,
      projects: sectionCounts.projects,
      certifications: sectionCounts.certifications,
      awards: sectionCounts.awards,
      "social-links": sectionCounts.socialLinks,
    };
    return map[id];
  };

  return (
    <div className="space-y-4 sticky top-24">
      {/* Completion Card */}
      <Card className="border-border/40 shadow-sm overflow-hidden">
        <div className={cn("px-4 py-3 flex items-center gap-3", completionConfig.bg)}>
          <CompletionIcon className={cn("h-5 w-5", completionConfig.color)} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">{completionConfig.label}</span>
              <span className={cn("text-sm font-display font-bold", completionConfig.color)}>
                {completionPercentage}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-1.5 mt-1.5" />
          </div>
        </div>
        {completionPercentage < 80 && (
          <CardContent className="px-4 py-3 border-t border-border/30">
            <p className="text-xs text-muted-foreground leading-relaxed">
              ✨ Complete profiles get <span className="font-semibold text-foreground">3× more views</span> from hiring companies
            </p>
          </CardContent>
        )}
      </Card>

      {/* Section Navigation */}
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-2">
          <nav className="space-y-0.5">
            {sections.map((section) => {
              const count = getCount(section.id);
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={cn(
                    "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm transition-all text-left group",
                    isActive
                      ? "bg-accent/10 text-accent font-medium shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <section.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-accent" : "text-muted-foreground/70 group-hover:text-foreground")} />
                    <span>{section.label}</span>
                  </div>
                  {count !== undefined && (
                    <span className={cn(
                      "text-xs rounded-full px-2 py-0.5 font-medium transition-colors",
                      isActive ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                    )}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
