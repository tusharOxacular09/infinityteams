import { motion } from "framer-motion";
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
  Building2
} from "lucide-react";

const industries = [
  {
    icon: Code,
    title: "IT & Software Development",
    roles: ["Full-stack Developers", "Data Scientists", "AI Specialists", "DevOps Engineers"],
    color: "accent",
  },
  {
    icon: Cog,
    title: "Engineering & Architecture",
    roles: ["Mechanical Engineers", "Civil Engineers", "CAD Specialists", "BIM Experts"],
    color: "cta",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    roles: ["SEO Experts", "PPC Managers", "Content Marketers", "Social Media Managers"],
    color: "success",
  },
  {
    icon: Calculator,
    title: "Finance & Accounting",
    roles: ["Accountants", "Financial Analysts", "Bookkeepers", "Tax Specialists"],
    color: "accent",
  },
  {
    icon: Scale,
    title: "Legal Process Outsourcing",
    roles: ["Paralegals", "Legal Researchers", "Document Review", "Contract Managers"],
    color: "cta",
  },
  {
    icon: Heart,
    title: "Medical Process Outsourcing",
    roles: ["Medical Billing", "Medical Coding", "Transcriptionists", "Imaging Support"],
    color: "success",
  },
  {
    icon: Palette,
    title: "Creative Services",
    roles: ["Graphic Designers", "Web Designers", "Multimedia Specialists", "Animators"],
    color: "accent",
  },
  {
    icon: Headphones,
    title: "Business Process Outsourcing",
    roles: ["Virtual Assistants", "Customer Support", "Data Entry", "Telemarketing"],
    color: "cta",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    roles: ["iOS Developers", "Android Developers", "Flutter Experts", "React Native"],
    color: "success",
  },
  {
    icon: Cloud,
    title: "Cloud Computing & DevOps",
    roles: ["AWS Engineers", "Azure Specialists", "Kubernetes Experts", "CI/CD Engineers"],
    color: "accent",
  },
  {
    icon: Cpu,
    title: "Embedded Systems & IoT",
    roles: ["Firmware Developers", "Embedded Architects", "Testing Engineers"],
    color: "cta",
  },
  {
    icon: FileText,
    title: "Content Writing",
    roles: ["Blog Writers", "Technical Writers", "Copywriters", "Transcriptionists"],
    color: "success",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function IndustriesSection() {
  return (
    <section className="section-spacing bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cta/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="container-hero relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cta/10 border border-cta/20 mb-4">
            <Building2 className="h-4 w-4 text-cta" />
            <span className="text-sm font-medium text-cta">Industries We Serve</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Specialized Talent Across
            <span className="block gradient-text">12+ Industries</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide full-time, highly skilled professionals across multiple sectors, 
            helping businesses scale with specialized talent and fully managed operations.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.title}
              variants={itemVariants}
              className="group bg-card rounded-xl p-5 border border-border hover:border-accent/30 transition-all hover:shadow-lg"
            >
              <div className={`inline-flex p-2.5 rounded-lg mb-3 transition-colors ${
                industry.color === 'accent' 
                  ? 'bg-accent/10 group-hover:bg-accent/20' 
                  : industry.color === 'cta'
                  ? 'bg-cta/10 group-hover:bg-cta/20'
                  : 'bg-success/10 group-hover:bg-success/20'
              }`}>
                <industry.icon className={`h-5 w-5 ${
                  industry.color === 'accent' 
                    ? 'text-accent' 
                    : industry.color === 'cta'
                    ? 'text-cta'
                    : 'text-success'
                }`} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2 leading-tight">
                {industry.title}
              </h3>
              <ul className="space-y-1">
                {industry.roles.slice(0, 3).map((role) => (
                  <li key={role} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    {role}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
