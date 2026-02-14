import { motion } from "framer-motion";
import { 
  Search, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Users, 
  Globe2, 
  Zap, 
  HeartHandshake 
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Talent Search",
    description: "Use AI-powered search to find the perfect candidates. Filter by skills, experience, location, and salary expectations.",
    color: "accent",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Vetted Professionals",
    description: "Every candidate goes through rigorous screening. Technical assessments, background checks, and reference verification included.",
    color: "cta",
  },
  {
    icon: FileText,
    title: "Complete HR Management",
    description: "We handle onboarding, contracts, leave management, and all HR administrative tasks for your remote team.",
    color: "success",
  },
  {
    icon: CreditCard,
    title: "Hassle-Free Payroll",
    description: "Automated salary administration, tax compliance, and timely payments. No complex international wire transfers.",
    color: "accent",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Your personal account manager ensures smooth communication and resolves any issues promptly.",
    color: "cta",
  },
  {
    icon: Globe2,
    title: "Global Compliance",
    description: "We navigate local labor laws, tax regulations, and compliance requirements in every country we operate.",
    color: "success",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-hero relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Why Choose Us</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="block gradient-text">Build Your Global Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From talent search to payroll, we provide a complete solution for hiring and managing 
            full-time remote employees worldwide.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group card-elevated bg-card rounded-2xl p-6 lg:p-8 border border-border"
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 transition-colors ${
                feature.color === 'accent' 
                  ? 'bg-accent/10 group-hover:bg-accent/20' 
                  : feature.color === 'cta'
                  ? 'bg-cta/10 group-hover:bg-cta/20'
                  : 'bg-success/10 group-hover:bg-success/20'
              }`}>
                <feature.icon className={`h-6 w-6 ${
                  feature.color === 'accent' 
                    ? 'text-accent' 
                    : feature.color === 'cta'
                    ? 'text-cta'
                    : 'text-success'
                }`} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-muted/50 border border-border">
            <HeartHandshake className="h-6 w-6 text-accent" />
            <p className="text-foreground">
              <span className="font-semibold">Join 5,000+ companies</span>
              <span className="text-muted-foreground"> already hiring globally with Infinity Teams</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
