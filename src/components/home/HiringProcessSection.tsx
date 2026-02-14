import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Search, 
  CheckCircle, 
  FileCheck, 
  Users, 
  Rocket, 
  Headphones, 
  TrendingUp,
  Workflow
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: ClipboardList,
    title: "Briefing & Requirements",
    description: "We collaborate to define job roles, tech stack, experience level, and qualifications.",
    color: "accent",
  },
  {
    number: 2,
    icon: Search,
    title: "Talent Sourcing",
    description: "We source qualified candidates through our extensive database within 14 days.",
    color: "cta",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Candidate Evaluation",
    description: "Multi-layered assessment covering technical skills, communication, and cultural fit.",
    color: "success",
  },
  {
    number: 4,
    icon: FileCheck,
    title: "Assignment/Test",
    description: "Optional technical assessment to evaluate practical skills (max 6 hours).",
    color: "accent",
  },
  {
    number: 5,
    icon: Users,
    title: "Interview & Selection",
    description: "Shortlisted candidates engage directly with you for final interviews.",
    color: "cta",
  },
  {
    number: 6,
    icon: Rocket,
    title: "Offer & Onboarding",
    description: "We handle contracts, documentation, and seamless onboarding.",
    color: "success",
  },
  {
    number: 7,
    icon: Headphones,
    title: "Ongoing HR Support",
    description: "Continuous payroll, compliance, performance reviews, and leave management.",
    color: "accent",
  },
  {
    number: 8,
    icon: TrendingUp,
    title: "Scaling Flexibility",
    description: "Scale up or down with just 1-month notice based on your needs.",
    color: "cta",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export function HiringProcessSection() {
  return (
    <section className="section-spacing bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cta/5 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="container-hero relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
            <Workflow className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">Hiring Process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple 8-Step Process to
            <span className="block gradient-text">Build Your Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From requirements to onboarding, we handle everything. Get fully screened 
            candidates in as little as 8 hours, complete hiring within days.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all hover:shadow-lg group"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                {step.number}
              </div>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
              
              <div className={`inline-flex p-3 rounded-xl mb-4 transition-colors ${
                step.color === 'accent' 
                  ? 'bg-accent/10 group-hover:bg-accent/20' 
                  : step.color === 'cta'
                  ? 'bg-cta/10 group-hover:bg-cta/20'
                  : 'bg-success/10 group-hover:bg-success/20'
              }`}>
                <step.icon className={`h-6 w-6 ${
                  step.color === 'accent' 
                    ? 'text-accent' 
                    : step.color === 'cta'
                    ? 'text-cta'
                    : 'text-success'
                }`} />
              </div>
              
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom highlight */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-4 rounded-2xl bg-card border border-border">
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-accent">8 hours</p>
              <p className="text-sm text-muted-foreground">Lightning-fast matching</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-cta">14 days</p>
              <p className="text-sm text-muted-foreground">Complete hiring cycle</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold font-display text-success">1 month</p>
              <p className="text-sm text-muted-foreground">Flexible notice period</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
