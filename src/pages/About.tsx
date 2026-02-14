import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import teamGroup from "@/assets/team/team-group.jpg";
import officeWorkspace from "@/assets/team/office-workspace.jpg";
import teamWorking from "@/assets/team/team-working.jpg";
import teamCollaboration from "@/assets/team/team-collaboration.jpg";
import teamFun from "@/assets/team/team-fun.jpg";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Shield,
  Fingerprint,
  Shuffle,
  Link2,
  Users,
  Heart,
  Laptop,
  Briefcase,
  Recycle,
  Globe,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Shield,
    title: "Trust",
    description:
      "We build reliable, long-lasting partnerships by honoring commitments and delivering consistently high-quality results.",
    color: "accent" as const,
  },
  {
    icon: Fingerprint,
    title: "Real",
    description:
      "We speak honestly, act with integrity, and stay true to who we are. Authenticity shapes our communication and decisions.",
    color: "cta" as const,
  },
  {
    icon: Shuffle,
    title: "Flexibility",
    description:
      "Every business is unique. Our solutions are adaptable, adjusting quickly to changing needs and ensuring the right fit.",
    color: "success" as const,
  },
  {
    icon: Link2,
    title: "Connection",
    description:
      "We believe in collaboration with purpose. By truly understanding people, we create stronger, more impactful relationships.",
    color: "accent" as const,
  },
  {
    icon: Eye,
    title: "Transparent",
    description:
      "Open communication and clarity are at the core of everything—from pricing to processes, from recruitment to delivery.",
    color: "cta" as const,
  },
  {
    icon: Users,
    title: "Togetherness",
    description:
      "Success is a shared journey. We work as partners with clients and allies with talent, achieving more together.",
    color: "success" as const,
  },
];

const causes = [
  {
    icon: Laptop,
    title: "Refurbished Laptops for Students",
    description:
      "We give retired office laptops a second life by refurbishing and distributing them to students in underserved communities, bridging the digital divide.",
    stat: "500+",
    statLabel: "Laptops donated",
  },
  {
    icon: Briefcase,
    title: "Job Creation in India",
    description:
      "Every hire through our platform creates a well-paying, professionally managed job in India's top cities — contributing to economic growth and career development.",
    stat: "1,000+",
    statLabel: "Jobs created",
  },
  {
    icon: Recycle,
    title: "Reducing E-Waste",
    description:
      "By extending the lifespan of hardware through refurbishment and responsible disposal, we actively reduce the environmental impact of electronic waste.",
    stat: "2 Tons",
    statLabel: "E-waste diverted",
  },
];

const milestones = [
  "Founded with a mission to make global hiring transparent and fair",
  "Offices established in Mumbai, Bangalore, and Hyderabad",
  "Serving clients across Europe, North America, and the Middle East",
  "500+ professionals successfully placed and managed",
  "Launched refurbished laptop program for underprivileged students",
  "Continuously expanding into new industries and markets",
];

const colorClasses = {
  accent: {
    bg: "bg-accent/10",
    bgHover: "group-hover:bg-accent/20",
    text: "text-accent",
  },
  cta: {
    bg: "bg-cta/10",
    bgHover: "group-hover:bg-cta/20",
    text: "text-cta",
  },
  success: {
    bg: "bg-success/10",
    bgHover: "group-hover:bg-success/20",
    text: "text-success",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="container-hero relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Globe className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                About Infinity Teams
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Hiring Should Be{" "}
              <span className="gradient-text">Transparent, Fair & Simple</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Infinity Teams is the only global hiring platform built on radical
              transparency. We connect companies with full-time, office-based
              professionals — managed end-to-end — at actual cost plus one fixed
              monthly fee. No hidden markups. No middlemen. Just your team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-hero">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-card rounded-2xl p-8 md:p-10 border border-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-5">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's most trusted and transparent global hiring
                platform — where every company, regardless of size, can build
                high-performing international teams without hidden costs,
                complexity, or risk.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-2xl p-8 md:p-10 border border-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="inline-flex p-3 rounded-xl bg-cta/10 mb-5">
                <Target className="h-7 w-7 text-cta" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses worldwide by providing full-time,
                dedicated professionals at transparent cost-plus pricing —
                backed by complete employment management, modern office
                infrastructure, and unwavering commitment to quality and
                compliance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container-hero max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5 text-center">
              Our Story
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4 text-sm md:text-base">
              <p>
                Infinity Teams was born from a simple frustration: global hiring
                was broken. Companies were paying inflated rates to agencies that
                hid their margins, while talented professionals overseas were
                underpaid and undervalued.
              </p>
              <p>
                We set out to fix that. We built a platform where every cost is
                visible, every salary is real, and every employee is treated as a
                valued professional — not a line item on an invoice.
              </p>
              <p>
                Today, we manage full-time teams for companies across Europe,
                North America, and the Middle East from our offices in India's
                top cities. Our clients trust us because they see exactly where
                their money goes. Our talent trusts us because we invest in
                their careers, workspace, and wellbeing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey / Milestones */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-hero max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Our Journey
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Key milestones that define who we are today.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {milestones.map((milestone) => (
              <motion.div
                key={milestone}
                variants={fadeUp}
                className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border"
              >
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm md:text-base text-foreground">
                  {milestone}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20">
        <div className="container-hero">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Our Core Values
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              The Principles That Guide Everything We Do
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These values shape how we work, build relationships, and create
              value for our clients, talent, and team.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value) => {
              const colors = colorClasses[value.color];
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="group bg-card rounded-2xl p-7 border border-border hover:shadow-lg transition-all text-center"
                >
                  <div
                    className={`inline-flex p-3.5 rounded-xl mb-4 ${colors.bg} ${colors.bgHover} transition-colors`}
                  >
                    <value.icon className={`h-7 w-7 ${colors.text}`} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Good Causes */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-hero">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
              <Recycle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">
                Our Good Causes
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Hiring That Makes a Difference
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond building great teams, we're committed to creating positive
              social and environmental impact with every hire.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {causes.map((cause) => (
              <motion.div
                key={cause.title}
                variants={fadeUp}
                className="bg-card rounded-2xl p-7 border border-border hover:shadow-lg transition-all text-center"
              >
                <div className="inline-flex p-3.5 rounded-xl bg-success/10 mb-4">
                  <cause.icon className="h-7 w-7 text-success" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {cause.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {cause.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-display text-2xl font-bold text-success">
                    {cause.stat}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cause.statLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link to="/sustainability">
              <Button variant="outline" size="lg" className="gap-2">
                Learn More About Our Impact{" "}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 md:py-20">
        <div className="container-hero max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Where We Operate
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Our talent works from professionally managed offices in India's
              top cities, serving clients across the globe.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                city: "Mumbai",
                desc: "Financial capital & business hub",
              },
              {
                city: "Bangalore",
                desc: "India's Silicon Valley for tech talent",
              },
              {
                city: "Hyderabad",
                desc: "Major IT & engineering centre",
              },
            ].map((office) => (
              <motion.div
                key={office.city}
                variants={fadeUp}
                className="bg-card rounded-xl p-6 border border-border text-center"
              >
                <Building2 className="h-6 w-6 text-accent mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {office.city}
                </h3>
                <p className="text-sm text-muted-foreground">{office.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Life at Infinity Teams - Photo Gallery */}
      <section className="py-16 md:py-20">
        <div className="container-hero">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Life at Infinity Teams
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Meet the People Behind the Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our vibrant offices, collaborative culture, and the real people who make it all happen.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Large hero image - team group */}
            <motion.div variants={fadeUp} className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-border">
              <img src={teamGroup} alt="Infinity Teams group photo at our office" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            {/* Office workspace */}
            <motion.div variants={fadeUp} className="col-span-2 rounded-2xl overflow-hidden border border-border aspect-[16/9]">
              <img src={officeWorkspace} alt="Our modern open-plan office workspace" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            {/* Collaboration */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-border aspect-square">
              <img src={teamCollaboration} alt="Team members collaborating on projects" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            {/* Working */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-border aspect-square">
              <img src={teamWorking} alt="Focused team member working at their desk" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </motion.div>

          {/* Fun culture strip */}
          <motion.div
            className="mt-6 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-border aspect-[21/9]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <img src={teamFun} alt="Team enjoying a game of table tennis at the office" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-hero text-center max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to Build Your Team?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Join companies across the world who trust Infinity Teams for
              transparent, hassle-free global hiring.
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
