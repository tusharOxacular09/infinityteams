import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Star, Clock, ArrowRight, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockCandidates } from "@/data/candidates";

// Show only featured/top candidates (first 6)
const featuredCandidates = mockCandidates
  .filter(c => c.isFeatured || c.rating >= 4.8)
  .slice(0, 6);

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

export function FeaturedCandidatesSection() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();

  const handleShowMore = () => {
    setShowAuthDialog(true);
  };

  const handleViewProfile = (e: React.MouseEvent, candidateId: string) => {
    e.preventDefault();
    setShowAuthDialog(true);
  };

  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-mesh opacity-30" />
      
      <div className="container-hero relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Top-Rated Professionals
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="gradient-text">Elite Talent</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pre-vetted professionals ready to join your team. Each candidate passes our rigorous 
            8-step screening process.
          </p>
        </motion.div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="candidate-card group cursor-pointer"
              onClick={(e) => handleViewProfile(e, candidate.id)}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-border group-hover:ring-accent transition-colors"
                  />
                  {candidate.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <Star className="h-3 w-3 text-accent-foreground fill-current" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground truncate group-hover:text-accent transition-colors">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{candidate.location}, {candidate.country}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-warning">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-semibold">{candidate.rating}</span>
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
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidate.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="skill-badge text-xs py-0.5 px-2">
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 3 && (
                  <span className="text-xs text-muted-foreground px-2 py-0.5">
                    +{candidate.skills.length - 3} more
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="font-display text-lg font-bold text-accent">
                    €{candidate.hourlyRate.toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">/hr</span>
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                  View Profile
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center"
        >
          <Button
            variant="cta"
            size="lg"
            onClick={handleShowMore}
            className="group"
          >
            <Lock className="h-4 w-4 mr-2 group-hover:hidden" />
            <Sparkles className="h-4 w-4 mr-2 hidden group-hover:inline" />
            Show All {mockCandidates.length}+ Candidates
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Sign up to access our full talent pool and detailed profiles
          </p>
        </motion.div>
      </div>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-center">
              Unlock Full Access
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Create a free account to view detailed candidate profiles, save favorites, 
              and start hiring top talent.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="grid gap-3">
              <Button 
                variant="cta" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setShowAuthDialog(false);
                  navigate("/register");
                }}
              >
                Create Free Account
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setShowAuthDialog(false);
                  navigate("/login");
                }}
              >
                Already have an account? Sign In
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>✓ No credit card required</p>
              <p>✓ Access {mockCandidates.length}+ verified candidates</p>
              <p>✓ Save favorites & request interviews</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
