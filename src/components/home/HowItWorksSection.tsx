import { motion } from "framer-motion";
import { Search, UserCheck, FileSignature, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search & Discover",
    description: "Browse our database of pre-vetted professionals. Use AI-powered search or filters to find your perfect match.",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Interview & Select",
    description: "Review candidate profiles, check their skills and experience. Conduct interviews with our scheduling support.",
  },
  {
    number: "03",
    icon: FileSignature,
    title: "Seamless Onboarding",
    description: "We handle all contracts, compliance, and paperwork. Your new team member is set up within days.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Start Working",
    description: "Your dedicated remote employee starts working. We manage HR, payroll, and ongoing support.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-spacing bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="container-hero relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hiring a full-time remote employee has never been easier. 
            Four simple steps to build your global team.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-lg transition-shadow h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-2 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <span className="font-display font-bold text-accent-foreground">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/candidates">
            <Button variant="cta" size="xl" className="group">
              Start Hiring Today
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
