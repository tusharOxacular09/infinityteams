import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Briefcase, CheckCircle2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-hero">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* For Companies */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary-foreground">
                  For Companies
                </h3>
              </div>
              
              <p className="text-primary-foreground/80 text-lg mb-6">
                Scale your team with world-class remote talent. We handle everything from 
                recruitment to payroll.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Access 50,000+ verified professionals",
                  "Save up to 60% on hiring costs",
                  "Fully managed HR and compliance",
                  "Risk-free trial period",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/candidates">
                <Button variant="hero" size="lg" className="group/btn">
                  Browse Candidates
                  <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* For Candidates */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/80 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-accent-foreground/20 backdrop-blur-sm">
                  <Briefcase className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-accent-foreground">
                  For Candidates
                </h3>
              </div>
              
              <p className="text-accent-foreground/80 text-lg mb-6">
                Join thousands of professionals working for international companies 
                from the comfort of your home.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Work with global companies remotely",
                  "Competitive international salaries",
                  "Full-time employment benefits",
                  "Career growth opportunities",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cta flex-shrink-0" />
                    <span className="text-accent-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register">
                <Button variant="cta" size="lg" className="group/btn">
                  Create Your Profile
                  <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
