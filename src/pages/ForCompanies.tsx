import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Users, 
  DollarSign, 
  Clock, 
  Shield, 
  Globe, 
  TrendingUp,
  Headphones,
  FileCheck,
  Building2,
  ArrowRight,
  Zap,
  Heart,
  Target,
  Award,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const benefits = [
  {
    icon: DollarSign,
    title: "Save Up to 70%",
    description: "Hire top-tier talent at a fraction of the cost compared to local hiring, without compromising on quality.",
  },
  {
    icon: Users,
    title: "Full-Time Dedicated Employees",
    description: "Your team members work exclusively for you, not on gig projects. Build lasting relationships and company culture.",
  },
  {
    icon: Shield,
    title: "Zero Employer Risk",
    description: "We handle all HR, payroll, compliance, and legal requirements. You focus on growing your business.",
  },
  {
    icon: Clock,
    title: "Hire in 2 Weeks",
    description: "Our streamlined process gets you interview-ready candidates within days, not months.",
  },
  {
    icon: Globe,
    title: "Overlapping Time Zones",
    description: "Work with professionals in India who can align with European, UK, and US business hours.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Your dedicated account manager ensures smooth onboarding and ongoing team management.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Tell Us Your Needs",
    description: "Share your requirements, skills needed, and team culture. We'll understand exactly what you're looking for.",
  },
  {
    step: "02", 
    title: "We Curate Candidates",
    description: "Our team handpicks pre-vetted professionals matching your specific criteria from our talent pool.",
  },
  {
    step: "03",
    title: "Interview & Select",
    description: "Meet your shortlisted candidates. You make the final hiring decision based on fit and expertise.",
  },
  {
    step: "04",
    title: "Seamless Onboarding",
    description: "We handle contracts, payroll setup, and equipment. Your new team member starts working within days.",
  },
];

const comparisonData = [
  { feature: "Employment Type", infinityTeams: "Full-time dedicated", competitors: "Freelancers / Contractors" },
  { feature: "Real Salary Visibility", infinityTeams: "100% transparent", competitors: "Hidden markups" },
  { feature: "Pricing Model", infinityTeams: "Cost-plus (fixed fee)", competitors: "Hourly rates with unknowns" },
  { feature: "HR & Payroll", infinityTeams: "Fully managed", competitors: "You handle it" },
  { feature: "Long-term Retention", infinityTeams: "Built for stability", competitors: "High turnover risk" },
  { feature: "Cultural Fit", infinityTeams: "Carefully matched", competitors: "Random assignment" },
];

const stats = [
  { value: "70%", label: "Average Cost Savings" },
  { value: "2 weeks", label: "Time to Hire" },
  { value: "95%", label: "Retention Rate" },
  { value: "500+", label: "Happy Clients" },
];

export default function ForCompanies() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container-hero">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                For Companies
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Build Your <span className="gradient-text">Dream Team</span> from India
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Access a pool of 500+ pre-vetted professionals. Save up to 70% on hiring costs while getting dedicated full-time employees who become part of your company culture.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/candidates">
                  <Button variant="cta" size="lg" className="gap-2">
                    Browse Candidates
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-6 text-center shadow-lg"
                  >
                    <p className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Companies Choose <span className="gradient-text">Infinity Teams</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're not just a staffing agency. We're your strategic partner in building high-performing remote teams.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container-hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple 4-Step <span className="gradient-text">Hiring Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From first contact to onboarded team member in as little as two weeks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <span className="font-display text-5xl font-bold text-accent/20">
                    {step.step}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-accent/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container-hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Infinity Teams vs. <span className="text-accent">The Rest</span>
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              See why leading companies trust us over traditional outsourcing and freelance platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card text-foreground rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-4 px-6 font-display font-bold">Feature</th>
                    <th className="text-left py-4 px-6 font-display font-bold text-accent">Infinity Teams</th>
                    <th className="text-left py-4 px-6 font-display font-bold text-muted-foreground">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-2 text-accent">
                          <CheckCircle2 className="h-4 w-4" />
                          {row.infinityTeams}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{row.competitors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 md:py-24">
        <div className="container-hero">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Pre-Vetted Talent
              </h3>
              <p className="text-muted-foreground text-sm">
                Every candidate goes through our rigorous 5-step screening process including technical assessments and background checks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Perfect Match Guarantee
              </h3>
              <p className="text-muted-foreground text-sm">
                If your new hire doesn't work out within the first 30 days, we'll find you a replacement at no additional cost.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Transparent Pricing
              </h3>
              <p className="text-muted-foreground text-sm">
                See exactly what your employee earns and what our management fee covers. No hidden costs, ever.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent via-accent to-primary">
        <div className="container-hero text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
              Ready to Build Your Team?
            </h2>
            <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-8">
              Join 500+ companies who have transformed their businesses with our talent solutions. Start hiring today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/candidates">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Users className="h-4 w-4" />
                  Browse Candidates
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
                  Calculate Your Savings
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
