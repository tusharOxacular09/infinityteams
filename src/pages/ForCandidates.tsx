import { motion } from "framer-motion";
import {
  Globe,
  Scale,
  DollarSign,
  TrendingUp,
  Building2,
  ShieldCheck,
  UserCheck,
  Eye,
  Handshake,
  Sprout,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const differentiators = [
  {
    icon: Globe,
    emoji: "🌍",
    title: "Work With International Companies",
    description:
      "Collaborate daily with global clients and teams across multiple countries. Gain hands-on experience with international projects, tools, and work cultures—while staying based in India.",
  },
  {
    icon: Scale,
    emoji: "⚖️",
    title: "True Work–Life Balance",
    description:
      "We believe great work comes from healthy, balanced professionals.",
    list: [
      "Fixed working hours",
      "Paid leaves and holidays",
      "No last-minute freelance pressure",
      "Predictable schedules and long-term roles",
    ],
  },
  {
    icon: DollarSign,
    emoji: "💰",
    title: "Fair, Transparent & Competitive Salaries",
    description: "At Infinity Teams, transparency is non-negotiable.",
    list: [
      "Competitive salaries aligned with international markets",
      "Clear salary structure—no hidden cuts or commissions",
      "On-time monthly payments",
      "Full visibility into compensation from day one",
    ],
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "Learn, Grow & Advance Your Career",
    description:
      "Infinity Teams is built for long-term growth, not short-term gigs.",
    list: [
      "Work on real-world global projects",
      "Learn modern tools, frameworks, and global best practices",
      "Clear career progression paths (Junior → Medior → Senior → Lead)",
      "Opportunities to grow with both clients and the platform",
    ],
  },
  {
    icon: Building2,
    emoji: "🏢",
    title: "World-Class Office Infrastructure",
    description:
      "We provide a professional office environment so you can focus on doing your best work.",
    list: [
      "Modern, well-equipped offices",
      "High-speed internet & power backup",
      "Ergonomic workstations & dual monitors",
      "Secure systems aligned with global standards",
    ],
    footnote:
      "Employees work from Infinity Teams offices—not unstable work-from-home setups.",
  },
  {
    icon: ShieldCheck,
    emoji: "🛡️",
    title: "Stability & Job Security",
    description: "Unlike freelance platforms, we offer:",
    list: [
      "Full-time employment contracts",
      "Long-term client engagements",
      "HR-managed roles with clear expectations",
      "Security, continuity, and peace of mind",
    ],
  },
  {
    icon: UserCheck,
    emoji: "🧑‍💼",
    title: "Dedicated HR & Employee Support",
    description:
      "Our HR team takes care of everything beyond your work:",
    list: [
      "Smooth onboarding",
      "Payroll & tax compliance",
      "Leave & attendance management",
      "Medical insurance & benefits",
      "Ongoing employee support",
    ],
    footnote: "You focus on your career—we handle the rest.",
  },
  {
    icon: Eye,
    emoji: "🌐",
    title: "Be Visible on a Global Hiring Platform",
    description:
      "Your profile is showcased to international companies actively looking for full-time professionals, not freelancers.",
    list: [
      "Professionally managed candidate profiles",
      "Global visibility",
      "Opportunities to work with multiple international clients over time",
    ],
  },
  {
    icon: Handshake,
    emoji: "🤝",
    title: "Respect, Transparency & Trust",
    description: "We treat our talent as partners, not resources.",
    list: [
      "Honest communication",
      "Clear roles, expectations, and salaries",
      "Professional work culture",
      "Long-term relationships, not short-term placements",
    ],
  },
  {
    icon: Sprout,
    emoji: "🌱",
    title: "Work With Purpose",
    description: "Infinity Teams is committed to:",
    list: [
      "Creating global career opportunities for Indian talent",
      "Supporting sustainability initiatives",
      "Reducing e-waste through refurbished equipment programs",
      "Building meaningful, ethical employment at scale",
    ],
  },
];

const whyJoinReasons = [
  {
    text: "Because You Want a Global Career Without Relocating",
    sub: "Work with international companies while staying in India.",
  },
  {
    text: "Because You Want Stability, Not Freelance Uncertainty",
    sub: "Enjoy a full-time job with predictable income and long-term growth.",
  },
  {
    text: "Because You Want Fair Pay & Transparency",
    sub: "Know exactly what you earn—no middlemen, no hidden margins.",
  },
  {
    text: "Because You Want to Grow Professionally",
    sub: "Gain international exposure, sharpen your skills, and advance your career.",
  },
  {
    text: "Because You Want a Professional Work Environment",
    sub: "Work from modern offices with the infrastructure you deserve.",
  },
  {
    text: "Because You Want a Company That Invests in You",
    sub: "We don't just place you—we support, manage, and grow your career.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const ForCandidates = () => {
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
            Build a Global Career{" "}
            <span className="text-accent">Without Leaving India</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Infinity Teams connects talented professionals in India with top
            international companies across Europe, the US, and beyond. We offer
            full-time, stable employment, global exposure, and a professional
            work environment—without the uncertainty of freelancing or
            traditional outsourcing.
          </motion.p>
          <motion.p
            className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Whether you're a developer, designer, accountant, marketer,
            engineer, or operations professional, Infinity Teams helps you build
            a long-term international career from India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Link to="/candidate-registration">
              <Button variant="cta" size="lg" className="gap-2">
                Join Infinity Teams <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-hero">
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-center text-foreground mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Makes Infinity Teams Different?
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need for a thriving international career, all in one
            place.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 lg:p-8 hover:shadow-lg transition-shadow"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-accent/10 p-2.5">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3">{item.description}</p>
                {item.list && (
                  <ul className="space-y-2">
                    {item.list.map((li) => (
                      <li key={li} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.footnote && (
                  <p className="mt-3 text-sm italic text-muted-foreground/80">
                    {item.footnote}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 lg:py-24">
        <div className="container-hero max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Join Infinity Teams?
          </motion.h2>

          <div className="space-y-4">
            {whyJoinReasons.map((reason, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 lg:p-6"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <CheckCircle2 className="h-6 w-6 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {reason.text}
                  </h3>
                  <p className="text-sm text-muted-foreground">{reason.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-accent/5">
        <div className="container-hero text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your International Career Starts Here
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Infinity Teams is more than a hiring platform. We are a career
            partner for ambitious professionals in India who want global
            exposure, stability, and long-term success.
          </motion.p>
          <motion.p
            className="text-lg font-semibold text-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            👉 Join Infinity Teams. Work globally. Grow confidently.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/candidate-registration">
              <Button variant="cta" size="lg" className="gap-2">
                Register as a Candidate <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForCandidates;
