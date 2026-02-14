import { motion } from "framer-motion";
import { DollarSign, PiggyBank, Users, Settings, Building2, Zap, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Transparent Cost-Plus Pricing",
    description: "See real employee salaries upfront. You pay the actual salary plus a flat monthly fee. No markups. No hidden costs.",
  },
  {
    icon: PiggyBank,
    title: "Up to 70% Cost Savings",
    description: "Build world-class teams while saving up to 70% compared to local hiring and up to 30% versus traditional outsourcing.",
  },
  {
    icon: Users,
    title: "Full-Time Dedicated Talent",
    description: "Your team works exclusively for you. No freelancers, no shared resources, and no divided attention.",
  },
  {
    icon: Settings,
    title: "Fully Managed Operations",
    description: "We handle recruitment, HR, payroll, compliance, benefits, and performance management from day one.",
  },
  {
    icon: Building2,
    title: "Office-Based Teams",
    description: "Your talent works from modern, professionally managed offices with secure infrastructure and high-speed connectivity.",
  },
  {
    icon: Zap,
    title: "Fast Hiring",
    description: "Get shortlisted candidates in as little as 8 hours. Average time to hire is just 14 days.",
  },
  {
    icon: ShieldCheck,
    title: "Flexible and Risk Free",
    description: "Scale your team up or down with just one month's notice. No long-term contracts and no penalties.",
  },
  {
    icon: Headphones,
    title: "End-to-End Support",
    description: "Every client gets a dedicated account manager and continuous operational support for long-term success.",
  },
];
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
export function WhyChooseUsSection() {
  return <section className="section-spacing bg-muted/30 relative overflow-hidden">
      <div className="container-hero relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-14" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-5">
            <span className="text-sm font-medium text-accent">Why Choose Us</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Companies Choose
            <span className="block gradient-text pb-2">Infinity Teams</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Hire full time global talent without hidden costs, long term risk, or operational complexity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }}>
          {features.map(feature => <motion.div key={feature.title} variants={itemVariants} className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all hover:shadow-lg h-full">
              {/* Icon */}
              <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-5">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}