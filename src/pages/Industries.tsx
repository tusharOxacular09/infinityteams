import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Cog,
  Megaphone,
  Calculator,
  Scale,
  Heart,
  Palette,
  Headphones,
  Smartphone,
  Cloud,
  Cpu,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  {
    icon: Code,
    title: "IT & Software Development",
    description:
      "Build and scale your technology teams with top-tier developers, engineers, and architects who work full-time, exclusively for you.",
    roles: [
      "Full-stack Developers",
      "Data Scientists",
      "AI & ML Specialists",
      "DevOps Engineers",
      "QA Engineers",
      "Software Architects",
    ],
    color: "accent" as const,
  },
  {
    icon: Cog,
    title: "Engineering & Architecture",
    description:
      "Access highly skilled engineers and architects for design, modeling, and project execution across civil, mechanical, and structural domains.",
    roles: [
      "Mechanical Engineers",
      "Civil Engineers",
      "CAD Specialists",
      "BIM Experts",
      "Structural Engineers",
      "MEP Engineers",
    ],
    color: "cta" as const,
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Grow your brand with dedicated marketing professionals who manage campaigns, content, and analytics for measurable results.",
    roles: [
      "SEO Experts",
      "PPC Managers",
      "Content Marketers",
      "Social Media Managers",
      "Email Marketing Specialists",
      "Analytics Experts",
    ],
    color: "success" as const,
  },
  {
    icon: Calculator,
    title: "Finance & Accounting",
    description:
      "Streamline your financial operations with qualified accountants, analysts, and bookkeepers who ensure accuracy and compliance.",
    roles: [
      "Accountants",
      "Financial Analysts",
      "Bookkeepers",
      "Tax Specialists",
      "Payroll Administrators",
      "Audit Support",
    ],
    color: "accent" as const,
  },
  {
    icon: Scale,
    title: "Legal Process Outsourcing",
    description:
      "Reduce legal costs with trained paralegals and legal support professionals handling research, document review, and contract management.",
    roles: [
      "Paralegals",
      "Legal Researchers",
      "Document Review Specialists",
      "Contract Managers",
      "Compliance Analysts",
      "IP Support",
    ],
    color: "cta" as const,
  },
  {
    icon: Heart,
    title: "Medical Process Outsourcing",
    description:
      "Support your healthcare operations with specialists in medical billing, coding, transcription, and imaging processes.",
    roles: [
      "Medical Billing Specialists",
      "Medical Coders",
      "Transcriptionists",
      "Imaging Support",
      "Claims Processing",
      "Healthcare Data Analysts",
    ],
    color: "success" as const,
  },
  {
    icon: Palette,
    title: "Creative Services",
    description:
      "Bring your visual identity to life with designers, animators, and creative professionals dedicated to your brand.",
    roles: [
      "Graphic Designers",
      "Web Designers",
      "UI/UX Designers",
      "Multimedia Specialists",
      "Animators",
      "Video Editors",
    ],
    color: "accent" as const,
  },
  {
    icon: Headphones,
    title: "Business Process Outsourcing",
    description:
      "Offload operational tasks to trained professionals who handle support, data entry, and administrative workflows efficiently.",
    roles: [
      "Virtual Assistants",
      "Customer Support Agents",
      "Data Entry Specialists",
      "Back-office Support",
      "Order Processing",
      "Telemarketing",
    ],
    color: "cta" as const,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Build and maintain native and cross-platform mobile applications with dedicated developers working exclusively on your products.",
    roles: [
      "iOS Developers",
      "Android Developers",
      "Flutter Experts",
      "React Native Developers",
      "Mobile QA Engineers",
      "App Architects",
    ],
    color: "success" as const,
  },
  {
    icon: Cloud,
    title: "Cloud Computing & DevOps",
    description:
      "Modernize your infrastructure with cloud engineers and DevOps specialists who build, deploy, and manage scalable systems.",
    roles: [
      "AWS Engineers",
      "Azure Specialists",
      "Kubernetes Experts",
      "CI/CD Engineers",
      "Cloud Architects",
      "Site Reliability Engineers",
    ],
    color: "accent" as const,
  },
  {
    icon: Cpu,
    title: "Embedded Systems & IoT",
    description:
      "Develop firmware, embedded software, and IoT solutions with engineers experienced in hardware-software integration.",
    roles: [
      "Firmware Developers",
      "Embedded Architects",
      "Testing Engineers",
      "IoT Developers",
      "RTOS Specialists",
      "Hardware Integration Engineers",
    ],
    color: "cta" as const,
  },
  {
    icon: FileText,
    title: "Content Writing",
    description:
      "Produce high-quality content at scale with writers who specialize in blogs, technical documentation, and marketing copy.",
    roles: [
      "Blog Writers",
      "Technical Writers",
      "Copywriters",
      "Transcriptionists",
      "Content Strategists",
      "Ghostwriters",
    ],
    color: "success" as const,
  },
];

const colorClasses = {
  accent: {
    bg: "bg-accent/10",
    bgHover: "group-hover:bg-accent/20",
    text: "text-accent",
    border: "hover:border-accent/30",
  },
  cta: {
    bg: "bg-cta/10",
    bgHover: "group-hover:bg-cta/20",
    text: "text-cta",
    border: "hover:border-cta/30",
  },
  success: {
    bg: "bg-success/10",
    bgHover: "group-hover:bg-success/20",
    text: "text-success",
    border: "hover:border-success/30",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Industries() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="container-hero relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Specialized Talent Across{" "}
              <span className="gradient-text">12+ Industries</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              We provide full-time, highly skilled professionals across multiple
              sectors — helping businesses scale with dedicated talent and fully
              managed operations. No freelancers. No shared resources. Just your
              team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="pb-16 md:pb-24">
        <motion.div
          className="container-hero grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry) => {
            const colors = colorClasses[industry.color];
            return (
              <motion.div
                key={industry.title}
                variants={itemVariants}
                className={`group bg-card rounded-xl p-6 border border-border ${colors.border} transition-all hover:shadow-lg`}
              >
                <div
                  className={`inline-flex p-3 rounded-lg mb-4 ${colors.bg} ${colors.bgHover} transition-colors`}
                >
                  <industry.icon className={`h-6 w-6 ${colors.text}`} />
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {industry.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {industry.description}
                </p>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
                    Key Roles
                  </p>
                  {industry.roles.map((role) => (
                    <div
                      key={role}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                      {role}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-hero text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Don't See Your Industry?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-6">
            We regularly expand into new domains. Talk to us about your hiring
            needs and we'll find the right talent for your team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/candidates">
              <Button size="lg" className="gap-2">
                Browse Candidates <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
