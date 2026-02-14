import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  FileSignature,
  Rocket,
  ClipboardList,
  CheckCircle,
  FileCheck,
  Users,
  Headphones,
  TrendingUp,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const overview = [
  {
    number: "01",
    icon: Search,
    title: "Search & Discover",
    description:
      "Browse our database of pre-vetted professionals. Use AI-powered search or filters to find your perfect match.",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Interview & Select",
    description:
      "Review candidate profiles, check their skills and experience. Conduct interviews with our scheduling support.",
  },
  {
    number: "03",
    icon: FileSignature,
    title: "Seamless Onboarding",
    description:
      "We handle all contracts, compliance, and paperwork. Your new team member is set up within days.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Start Working",
    description:
      "Your dedicated remote employee starts working. We manage HR, payroll, and ongoing support.",
  },
];

const detailedSteps = [
  {
    number: 1,
    icon: ClipboardList,
    title: "Briefing & Requirements",
    description:
      "We collaborate to define job roles, tech stack, experience level, and qualifications.",
    color: "accent" as const,
  },
  {
    number: 2,
    icon: Search,
    title: "Talent Sourcing",
    description:
      "We source qualified candidates through our extensive database within 14 days.",
    color: "cta" as const,
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Candidate Evaluation",
    description:
      "Multi-layered assessment covering technical skills, communication, and cultural fit.",
    color: "success" as const,
  },
  {
    number: 4,
    icon: FileCheck,
    title: "Assignment/Test",
    description:
      "Optional technical assessment to evaluate practical skills (max 6 hours).",
    color: "accent" as const,
  },
  {
    number: 5,
    icon: Users,
    title: "Interview & Selection",
    description:
      "Shortlisted candidates engage directly with you for final interviews.",
    color: "cta" as const,
  },
  {
    number: 6,
    icon: Rocket,
    title: "Offer & Onboarding",
    description:
      "We handle contracts, documentation, and seamless onboarding.",
    color: "success" as const,
  },
  {
    number: 7,
    icon: Headphones,
    title: "Ongoing HR Support",
    description:
      "Continuous payroll, compliance, performance reviews, and leave management.",
    color: "accent" as const,
  },
  {
    number: 8,
    icon: TrendingUp,
    title: "Scaling Flexibility",
    description:
      "Scale up or down with just 1-month notice based on your needs.",
    color: "cta" as const,
  },
];

const colorMap = {
  accent: { bg: "bg-accent/10 group-hover:bg-accent/20", text: "text-accent" },
  cta: { bg: "bg-cta/10 group-hover:bg-cta/20", text: "text-cta" },
  success: { bg: "bg-success/10 group-hover:bg-success/20", text: "text-success" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container-hero text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How It <span className="text-accent">Works</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Hiring a full-time remote employee has never been easier. Four
            simple steps to build your global team.
          </motion.p>
        </div>
      </section>

      {/* Overview Steps */}
      <section className="pb-16 lg:pb-24">
        <div className="container-hero">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {overview.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {index < overview.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
                )}
                <div className="relative bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-lg transition-shadow h-full">
                  <div className="absolute -top-4 -right-2 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                    <span className="font-display font-bold text-accent-foreground">
                      {step.number}
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
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
        </div>
      </section>

      {/* Detailed 8-Step Process */}
      <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cta/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />

        <div className="container-hero relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
              <Workflow className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">
                Detailed Hiring Process
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Simple 8-Step Process to
              <span className="block gradient-text">Build Your Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From requirements to onboarding, we handle everything. Get fully
              screened candidates in as little as 8 hours, complete hiring
              within days.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {detailedSteps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all hover:shadow-lg group"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                  {step.number}
                </div>
                {index < detailedSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 transition-colors ${colorMap[step.color].bg}`}
                >
                  <step.icon
                    className={`h-6 w-6 ${colorMap[step.color].text}`}
                  />
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

          {/* Stats */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-4 rounded-2xl bg-card border border-border">
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-accent">
                  8 hours
                </p>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast matching
                </p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-cta">
                  14 days
                </p>
                <p className="text-sm text-muted-foreground">
                  Complete hiring cycle
                </p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-success">
                  1 month
                </p>
                <p className="text-sm text-muted-foreground">
                  Flexible notice period
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-hero text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Build Your Global Team?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Start hiring pre-vetted, full-time professionals today. No risk, no
            hidden fees.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/candidates">
              <Button variant="cta" size="lg" className="gap-2">
                Browse Candidates <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/company-registration">
              <Button variant="outline" size="lg">
                Register as a Company
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
