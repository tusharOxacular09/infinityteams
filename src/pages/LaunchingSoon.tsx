import { motion } from "framer-motion";
import {
  Rocket, Mail, ArrowRight, User, Building2, Globe, MapPin, Phone,
  DollarSign, Shield, Server, Users, CheckCircle, Linkedin, Zap, Eye, Euro,
  PiggyBank, Settings, ShieldCheck, Headphones
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import infinityTeamsLogo from "@/assets/light-logo.svg";

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

function EmailCapture({ variant = "hero" }: { variant?: "hero" | "footer" }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"candidate" | "client" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "https://vaibhavarora2-001-site17.anytempurl.com/api/EarlyAccess/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, role }),
        }
      );

      if (!response.ok) {
        let errorPayload: { message?: string } | string | null = null;
        try {
          errorPayload = await response.json();
        } catch {
          errorPayload = await response.text().catch(() => null);
        }
        const message =
          typeof errorPayload === "string"
            ? errorPayload
            : errorPayload?.message;

        throw new Error(message || "Unable to submit right now.");
      }

      setSubmitted(true);
      setEmail("");
      setRole(null);
    } catch (error) {
      const text = error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";
      setErrorMessage(text);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "rounded-2xl p-8 text-center",
          variant === "hero"
            ? "bg-accent/10 border border-accent/20"
            : "bg-primary-foreground/10 border border-primary-foreground/20"
        )}
      >
        <div className="text-3xl mb-3">🎉</div>
        <p
          className={cn(
            "font-display font-bold text-xl",
            variant === "hero" ? "text-accent" : "text-primary-foreground"
          )}
        >
          Congratulations, you're on the list!
        </p>
        <p
          className={cn(
            "text-sm mt-2",
            variant === "hero" ? "text-muted-foreground" : "text-primary-foreground/60"
          )}
        >
          We'll notify you before our March 2026 launch.
        </p>
      </motion.div>
    );
  }

  const isHero = variant === "hero";

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setRole("client")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm",
            role === "client"
              ? "border-cta bg-cta/15 text-cta"
              : isHero
                ? "border-border text-muted-foreground hover:border-muted-foreground/40"
                : "border-primary-foreground/20 text-primary-foreground/60 hover:border-primary-foreground/40"
          )}
        >
          <Building2 className="h-4 w-4" />
          I'm Hiring Talent
        </button>
        <button
          type="button"
          onClick={() => setRole("candidate")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm",
            role === "candidate"
              ? "border-accent bg-accent/15 text-accent"
              : isHero
                ? "border-border text-muted-foreground hover:border-muted-foreground/40"
                : "border-primary-foreground/20 text-primary-foreground/60 hover:border-primary-foreground/40"
          )}
        >
          <User className="h-4 w-4" />
          I'm Looking for a Job
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className={cn(
            "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4",
            isHero ? "text-muted-foreground/50" : "text-primary-foreground/30"
          )} />
          <Input
            type="email"
            placeholder={role == "client" ? "Enter your business email" : "Enter your email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cn(
              "pl-10 h-12 rounded-xl",
              isHero
                ? "bg-background border-border"
                : "bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30"
            )}
          />
        </div>
        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="gap-2 h-12 rounded-xl px-6"
          disabled={!role || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Get Early Access"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      {errorMessage && (
        <p className="text-sm sm:text-sm text-center mt-2 font-medium text-rose-400">
          {errorMessage}
        </p>
      )}
      {!role && (
        <p className={cn(
          "text-xs text-center",
          isHero ? "text-muted-foreground/60" : "text-primary-foreground/40"
        )}>Select your role above to continue</p>
      )}
    </div>
  );
}

/* ─── World Map Dots SVG (subtle) ─── */
function WorldMapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
      <svg viewBox="0 0 1200 600" className="w-full h-full" fill="currentColor">
        {/* Simplified dot pattern representing continents */}
        {[
          // Europe
          [480, 140], [500, 135], [520, 130], [510, 150], [530, 145], [490, 160], [540, 155],
          [500, 170], [520, 165], [460, 155], [475, 170],
          // Asia
          [600, 150], [620, 140], [640, 145], [660, 150], [680, 160], [700, 155],
          [720, 170], [740, 180], [650, 170], [670, 180], [690, 190], [710, 200],
          [630, 190], [650, 200], [670, 210], [690, 220],
          // India
          [660, 230], [670, 240], [680, 250], [660, 260], [670, 270],
          // Africa
          [500, 250], [510, 270], [520, 290], [500, 300], [510, 310],
          // Americas
          [200, 140], [220, 150], [210, 170], [230, 160], [240, 180],
          [250, 200], [230, 210], [240, 230], [260, 250], [250, 270],
          [220, 300], [230, 320], [240, 340],
          // Connections (dots along lines)
          [350, 160], [400, 155], [450, 150],
          [550, 170], [570, 175],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3} />
        ))}
        {/* Connection lines */}
        <line x1="230" y1="160" x2="490" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="510" y1="150" x2="670" y2="240" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="490" y1="150" x2="670" y2="240" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
}

const offices = [
  {
    city: "Amsterdam",
    flag: "🇳🇱",
    label: "EU Headquarters",
    address: "Isaäc Asscherpad 11, 1096 BJ Amsterdam",
    phone: "+31 20 8080 486",
    email: "netherlands@infinityteams.com"
  },
  {
    city: "Mumbai",
    flag: "🇮🇳",
    label: "Operations & Talent Hub",
    address: "Lumos Cowork, Andheri East, Mumbai 400069",
    phone: "+91 77746 71788",
    email: "india@infinityteams.com"
  },
  {
    city: "New Jersey",
    flag: "🇺🇸",
    label: "Operations & Talent Hub",
    address: "42 Mason Ave, East Brunswick NJ 08816",
    email: "usa@infinityteams.com"
  },
];

export default function LaunchingSoon() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Sticky Nav ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-primary/90 backdrop-blur-lg border-b border-primary-foreground/10">
        <div className="container-hero flex items-center justify-between h-16">
          <img src={infinityTeamsLogo} alt="Infinity Teams" className="h-10 object-contain" />
          <Button variant="cta" size="sm" className="gap-1.5 rounded-lg text-cta-foreground" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Early Access <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-primary text-primary-foreground">
        <WorldMapBackground />
        <div className="container-hero relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-semibold">
              <Rocket className="h-4 w-4" />
              Launching March 2026
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight">
              Hire Global Talent{" "}
              <span className="gradient-text-hero pb-2 inline-block">Without Borders.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Full-time international employees. Transparent cost-plus pricing.
              Fully managed HR, payroll, and compliance.
            </motion.p>

            <motion.div variants={fadeUp} custom={3}>
              <EmailCapture variant="footer" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ THE PROBLEM ═══════════ */}
      <section className="section-spacing bg-muted/50">
        <div className="container-hero">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Hiring Is Expensive. Outsourcing Is Opaque.{" "}
              <span className="text-muted-foreground">Freelancing Is Unstable.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg leading-relaxed">
              Local hiring costs too much. Traditional outsourcing hides markups and cuts corners.
              Freelance platforms lack the stability your business needs.
              There has to be a better way.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 mt-14 max-w-4xl mx-auto"
          >
            {[
              { icon: Euro, title: "Local Hiring", desc: "High salaries, expensive benefits, limited talent pool", color: "text-destructive" },
              { icon: Eye, title: "Outsourcing", desc: "Hidden markups, lack of transparency, and quality concerns", color: "text-warning" },
              { icon: Zap, title: "Freelancing", desc: "No commitment, inconsistent quality, no team culture", color: "text-muted-foreground" },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i} className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center">
                <div className={cn("inline-flex p-3 rounded-xl bg-muted mb-4", item.color)}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ THE SOLUTION ═══════════ */}
      <section className="section-spacing">
        <div className="container-hero">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center space-y-6 mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              The Solution
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Meet <span className="gradient-text pb-2 inline-block">Infinity Teams</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make hiring global talent as simple as hiring locally at a fraction of the cost, with full transparency.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Euro, title: "Transparent Pricing", desc: "Salary + €349/mo fixed fee. No hidden markups." },
              { icon: Users, title: "Full Recruitment", desc: "We source, vet, and onboard top talent for you." },
              { icon: Shield, title: "Compliance & HR", desc: "Payroll, taxes, contracts: all handled." },
              { icon: Server, title: "Office & IT", desc: "Fully equipped workspace and infrastructure." },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i} className="bg-card rounded-2xl p-6 border border-border card-elevated text-center">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SIMPLE PRICING ═══════════ */}
      <section className="section-spacing bg-primary text-primary-foreground">
        <div className="container-hero">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-2xl mx-auto text-center space-y-10"
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold">
              Simple, Transparent Pricing
            </motion.h2>

            <motion.div variants={fadeUp} custom={1} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 md:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-sm text-primary-foreground/50 uppercase tracking-wider font-semibold mb-1">Employee Salary</p>
                  <p className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Your Choice</p>
                </div>
                <span className="text-3xl font-display font-bold text-accent">+</span>
                <div className="text-center">
                  <p className="text-sm text-primary-foreground/50 uppercase tracking-wider font-semibold mb-1">Infinity Teams Fee</p>
                  <p className="font-display text-3xl md:text-4xl font-bold text-accent">€349<span className="text-lg text-primary-foreground/50">/mo</span></p>
                </div>
              </div>
              <div className="h-px bg-primary-foreground/10" />
              <p className="text-primary-foreground/70 text-sm">
                All-inclusive: recruitment, HR, payroll, compliance, office & IT infrastructure.
              </p>
            </motion.div>

            <motion.p variants={fadeUp} custom={2} className="text-primary-foreground/50 text-sm">
              No hidden markups. No long-term lock-ins. One-month exit policy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ GLOBAL PRESENCE ═══════════ */}
      <section className="section-spacing">
        <div className="container-hero">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center space-y-6 mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <Globe className="h-4 w-4" />
              Global Presence
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Offices Across the Globe
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{office.flag}</span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{office.city}</h3>
                    <p className="text-xs text-muted-foreground">{office.label}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                  </div>
                  {office.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                        {office.phone}
                      </a>
                    </div>
                  )}
                  {office.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TECHNOLOGY PLATFORM ═══════════ */}
      <section className="section-spacing bg-muted/50">
        <div className="container-hero">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center space-y-6 mb-14"
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Built as a <span className="gradient-text pb-2 inline-block">Technology Platform</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">
              Not just a service, but a complete hiring infrastructure.
            </motion.p>
          </motion.div>

           <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {features.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i} className="bg-card rounded-2xl p-6 border border-border card-elevated text-center">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHO IT'S FOR ═══════════ */}
      <section className="section-spacing">
        <div className="container-hero">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Who It's For
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* For Companies */}
            <motion.div variants={fadeUp} custom={0} className="bg-card rounded-2xl p-8 border border-border card-elevated">
              <div className="inline-flex p-3 rounded-xl bg-cta/10 text-cta mb-5">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">For Companies</h3>
              <ul className="space-y-3">
                {[
                  "Hire global full-time talent for a flat monthly fee.",
                  "Save up to 70% vs local hiring and 30% vs outsourcing.",
                  "We handle hiring, payroll, HR, and compliance end-to-end.",
                  "Scale your team with 1-month notice—no lock-ins.",
                  "View real salaries and profiles before hiring.",
                  "Get screened candidates fast (hours to days).",
                  "One predictable monthly invoice per hire.",
                  "Calculate hourly cost in your local currency instantly.",
                  "Office setup included: IT, equipment, and support.",
                  "Lower risk: contracts, taxes, insurance, and admin covered.",
                 ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* For Candidates */}
            <motion.div variants={fadeUp} custom={1} className="bg-card rounded-2xl p-8 border border-border card-elevated">
              <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-5">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">For Candidates</h3>
              <ul className="space-y-3">
                {[
                  "Work directly with global companies remotely.",
                  "Learn Western work culture: clarity and ownership.",
                  "Build real products, not just support work.",
                  "Grow with global tools and best practices.",
                  "Improve fast with meaningful work and feedback.",
                  "Better work-life balance with modern teams.",
                  "Get global exposure and travel opportunities.",
                  "Build a strong profile for international employers.",
                  "Gain world-class experience to boost your career.",
                  "Ship impactful features and see your results.",
                 ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section id="waitlist" className="section-spacing bg-primary text-primary-foreground">
        <div className="container-hero">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-bold leading-tight">
              The Future of Hiring{" "}
              <span className="gradient-text-hero pb-2 inline-block">Has No Borders.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/60 text-lg">
              Early access available before our March 2026 launch.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <EmailCapture variant="footer" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-primary border-t border-primary-foreground/10">
        <div className="container-hero py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={infinityTeamsLogo} alt="Infinity Teams" className="h-10 object-contain" />
              <span className="text-xs text-primary-foreground/40">
                © {new Date().getFullYear()} Infinity Teams. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/infinityteams" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-accent text-primary-foreground hover:text-accent-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
