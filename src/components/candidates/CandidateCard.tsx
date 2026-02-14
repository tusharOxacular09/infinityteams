import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Star, Clock, Heart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/contexts/FavoritesContext";

export interface Candidate {
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
  noticePeriod: string;
  industry: string;
  certifications: string[];
  languages: string[];
  rating: number;
  completedProjects: number;
  isVerified: boolean;
  isFeatured?: boolean;
}

interface CandidateCardProps {
  candidate: Candidate;
  index?: number;
}

export function CandidateCard({ candidate, index = 0 }: CandidateCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(candidate.id);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="candidate-card group relative"
    >
      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(candidate.id);
        }}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
      >
        <Heart className={`h-5 w-5 transition-colors ${favorited ? "text-cta fill-cta" : "text-muted-foreground hover:text-cta"}`} />
      </button>

      {/* Header with Avatar */}
      <div className="flex items-start gap-4 mb-4 pr-10">
        <div className="relative">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-border group-hover:ring-accent transition-colors"
          />
          {candidate.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <Star className="h-3 w-3 text-accent-foreground fill-current" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-foreground truncate group-hover:text-accent transition-colors">
            {candidate.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{candidate.location}, {candidate.country}</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className={getLevelColor(candidate.level)}>
          {candidate.level}
        </Badge>
        <Badge variant="outline" className={getAvailabilityColor(candidate.availability)}>
          <Clock className="h-3 w-3 mr-1" />
          {candidate.availability}
        </Badge>
        <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border">
          <Briefcase className="h-3 w-3 mr-1" />
          {candidate.yearsExperience} yrs
        </Badge>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {candidate.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="skill-badge text-xs py-0.5 px-2">
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="text-xs text-muted-foreground px-2 py-0.5">
            +{candidate.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer with Salary + Hourly Rate */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Hourly Rate</p>
          <p className="font-display text-xl font-bold text-accent">
            €{candidate.hourlyRate.toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground">/hr</span>
          </p>
        </div>
        <Link to={`/candidates/${candidate.id}`}>
          <Button variant="accent-outline" size="sm">
            View Profile
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
