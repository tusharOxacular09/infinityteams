import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Search, ArrowRight, Users, Shield, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export function CompanySuccessStep() {
  return (
    <Card className="border-border/50 shadow-lg overflow-hidden">
      <CardContent className="pt-12 pb-8 text-center space-y-8">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h2 className="font-display text-3xl font-bold text-foreground">
            Welcome to Infinity Teams!
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Your company account has been created successfully. You can complete your profile anytime to get better candidate matches.
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
            <Building2 className="h-6 w-6 text-accent" />
            <span className="text-sm font-medium text-foreground">Complete Profile</span>
            <span className="text-xs text-muted-foreground">Company & hiring info</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
            <Search className="h-6 w-6 text-accent" />
            <span className="text-sm font-medium text-foreground">Browse Talent</span>
            <span className="text-xs text-muted-foreground">50,000+ professionals</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
            <Shield className="h-6 w-6 text-accent" />
            <span className="text-sm font-medium text-foreground">Risk-Free</span>
            <span className="text-xs text-muted-foreground">Trial period included</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/company-profile">
            <Button variant="cta" size="lg">
              Complete Your Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/candidates">
            <Button variant="outline" size="lg">
              Browse Candidates
            </Button>
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  );
}
