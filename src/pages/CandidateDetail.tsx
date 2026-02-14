import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Star,
  Clock,
  Heart,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  Award,
  GraduationCap,
  FolderOpen,
  ChevronLeft,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { mockCandidates } from "@/data/candidates";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useFavorites } from "@/contexts/FavoritesContext";

// Favorite button component for detail page
function FavoriteButton({ candidateId }: { candidateId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(candidateId);

  return (
    <div className="space-y-3">
      <Button className="w-full" variant="accent">
        <Mail className="h-4 w-4 mr-2" />
        Contact Candidate
      </Button>
      <Button 
        className="w-full" 
        variant={favorited ? "cta" : "accent-outline"}
        onClick={() => toggleFavorite(candidateId)}
      >
        <Heart className={`h-4 w-4 mr-2 ${favorited ? "fill-current" : ""}`} />
        {favorited ? "Saved to Favorites" : "Add to Favorites"}
      </Button>
    </div>
  );
}

// Extended candidate type for detail page
interface CandidateDetail {
  id: string;
  name: string;
  title: string;
  avatar: string;
  location: string;
  country: string;
  yearsExperience: number;
  level: "Junior" | "Medior" | "Senior" | "Lead";
  skills: string[];
  hourlyRate: number;
  salaryExpectation: number;
  availability: "Immediately" | "2 weeks" | "1 month" | "2+ months";
  rating: number;
  completedProjects: number;
  isVerified: boolean;
  isFeatured?: boolean;
  // Extended fields for detail page
  email?: string;
  phone?: string;
  linkedIn?: string;
  bio?: string;
  languages?: { name: string; level: string }[];
  education?: {
    degree: string;
    school: string;
    year: string;
  }[];
  experience?: {
    title: string;
    company: string;
    duration: string;
    description: string;
    isCurrent?: boolean;
  }[];
  projects?: {
    name: string;
    description: string;
    technologies: string[];
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
  }[];
}

// Mock extended data (in production this would come from API)
const getExtendedCandidateData = (candidate: any): CandidateDetail => ({
  ...candidate,
  email: `${candidate.name.toLowerCase().replace(" ", ".")}@email.com`,
  phone: "+91 98XXX XXXXX",
  linkedIn: `linkedin.com/in/${candidate.name.toLowerCase().replace(" ", "-")}`,
  bio: `Experienced ${candidate.title} with ${candidate.yearsExperience}+ years of expertise in building scalable applications. Passionate about clean code, best practices, and delivering high-quality solutions. Strong communicator with experience working in international teams.`,
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Native" },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      school: "Indian Institute of Technology",
      year: "2015 - 2019",
    },
  ],
  experience: [
    {
      title: candidate.title,
      company: "Tech Solutions Pvt Ltd",
      duration: "2021 - Present",
      description: `Leading development of enterprise applications using ${candidate.skills.slice(0, 3).join(", ")}. Collaborated with international clients and delivered multiple successful projects.`,
      isCurrent: true,
    },
    {
      title: `Junior ${candidate.title.replace("Senior ", "").replace("Lead ", "")}`,
      company: "StartUp Innovation Labs",
      duration: "2019 - 2021",
      description: "Developed and maintained web applications, participated in code reviews, and contributed to technical documentation.",
    },
  ],
  projects: [
    {
      name: "Enterprise Resource Planning System",
      description: "Built a comprehensive ERP system for managing inventory, sales, and HR operations.",
      technologies: candidate.skills.slice(0, 3),
    },
    {
      name: "E-commerce Platform",
      description: "Developed a scalable e-commerce solution with payment integration and order management.",
      technologies: candidate.skills.slice(1, 4),
    },
  ],
  certifications: [
    {
      name: `${candidate.skills[0]} Professional Certification`,
      issuer: "Industry Certification Board",
      year: "2023",
    },
    {
      name: "Agile Scrum Master",
      issuer: "Scrum Alliance",
      year: "2022",
    },
  ],
});

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case "Immediately":
      return "bg-success/10 text-success border-success/20";
    case "2 weeks":
      return "bg-accent/10 text-accent border-accent/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "Lead":
      return "bg-cta/10 text-cta border-cta/20";
    case "Senior":
      return "bg-primary/10 text-primary border-primary/20";
    case "Medior":
      return "bg-accent/10 text-accent border-accent/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  
  const baseCandidate = mockCandidates.find((c) => c.id === id);
  
  if (!baseCandidate) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Candidate Not Found</h1>
          <p className="text-muted-foreground mb-8">The candidate you're looking for doesn't exist.</p>
          <Link to="/candidates">
            <Button variant="accent">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Candidates
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const candidate = getExtendedCandidateData(baseCandidate);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Navigation */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <Link
          to="/candidates"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Candidates
        </Link>
      </div>

      <main className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Avatar & Basic Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-32 h-32 rounded-2xl object-cover ring-4 ring-border mx-auto"
                    />
                    {candidate.isVerified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                  <h1 className="font-display text-2xl font-bold text-foreground">{candidate.name}</h1>
                  <p className="text-muted-foreground">{candidate.title}</p>
                  
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="h-4 w-4 text-cta fill-current" />
                    <span className="font-semibold text-foreground">{candidate.rating}</span>
                    <span className="text-muted-foreground">
                      ({candidate.completedProjects} projects)
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <Badge variant="outline" className={getLevelColor(candidate.level)}>
                    {candidate.level}
                  </Badge>
                  <Badge variant="outline" className={getAvailabilityColor(candidate.availability)}>
                    <Clock className="h-3 w-3 mr-1" />
                    {candidate.availability}
                  </Badge>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-4 w-4" />
                  <span>{candidate.location}, {candidate.country}</span>
                </div>

                <Separator className="mb-6" />

                {/* Rate Card */}
                <div className="bg-accent/5 rounded-xl p-4 mb-6">
                  <p className="text-sm text-muted-foreground text-center mb-1">Hourly Rate</p>
                  <p className="font-display text-3xl font-bold text-accent text-center">
                    €{candidate.hourlyRate.toFixed(2)}
                    <span className="text-base font-normal text-muted-foreground">/hr</span>
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    ~€{candidate.salaryExpectation.toLocaleString()}/month
                  </p>
                </div>

                {/* Action Buttons */}
                <FavoriteButton candidateId={candidate.id} />

                <Separator className="my-6" />

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{candidate.linkedIn}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Languages */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Languages
                  </h3>
                  <div className="space-y-2">
                    {candidate.languages?.map((lang) => (
                      <div key={lang.name} className="flex justify-between text-sm">
                        <span className="text-foreground">{lang.name}</span>
                        <span className="text-muted-foreground">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{candidate.bio}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="skill-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Overall Proficiency</span>
                      <span className="text-accent font-medium">Expert</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidate.experience?.map((exp, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-border">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent" />
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {exp.title}
                            {exp.isCurrent && (
                              <Badge variant="outline" className="ml-2 text-xs bg-success/10 text-success border-success/20">
                                Current
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-accent">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.education?.map((edu, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {candidate.projects?.map((project, index) => (
                    <div key={index} className="p-4 rounded-xl bg-muted/30 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">{project.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidate.certifications?.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
