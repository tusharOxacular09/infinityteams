import { motion } from "framer-motion";
import {
  Leaf,
  Laptop,
  Users,
  Recycle,
  Heart,
  Globe,
  GraduationCap,
  TreePine,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const pillars = [
  {
    icon: Laptop,
    title: "Refurbished Laptops for Students",
    description:
      "When our clients upgrade their hardware, we don't let the old equipment go to waste. We refurbish corporate laptops and donate them to underprivileged students across India — giving them tools to learn, grow, and compete in a digital economy.",
    highlights: [
      "500+ laptops donated to date",
      "Partnered with 12 schools and NGOs",
      "Each laptop serves a student for 3+ years",
    ],
  },
  {
    icon: Users,
    title: "Meaningful Job Creation in India",
    description:
      "Offshoring often gets a bad reputation. We're changing the narrative. Every position we fill creates a well-paid, full-time career — not a gig. Our team members receive competitive salaries, benefits, and a growth path, lifting families and entire communities.",
    highlights: [
      "1,000+ full-time jobs created",
      "Average salary 40% above local market",
      "Career development & training included",
    ],
  },
  {
    icon: Recycle,
    title: "Reducing E-Waste",
    description:
      "The tech industry generates 50+ million tons of e-waste annually. By refurbishing and redistributing hardware instead of discarding it, we actively reduce our environmental footprint and encourage a circular economy mindset across our client base.",
    highlights: [
      "2+ tons of e-waste diverted from landfills",
      "Partnership with certified recycling centres",
      "Zero-waste target for our own offices by 2026",
    ],
  },
];

const commitments = [
  {
    icon: TreePine,
    title: "Carbon-Conscious Operations",
    description:
      "Our offices in India and the Netherlands run on renewable energy wherever possible. We offset travel-related emissions and encourage remote-first practices.",
  },
  {
    icon: GraduationCap,
    title: "Education & Upskilling",
    description:
      "We invest in continuous learning for our talent pool — from technical certifications to soft-skill workshops — ensuring they stay competitive and fulfilled.",
  },
  {
    icon: Heart,
    title: "Community Engagement",
    description:
      "Our teams volunteer locally, from coding bootcamps for young adults to mentorship programmes connecting experienced professionals with aspiring talent.",
  },
  {
    icon: Globe,
    title: "Ethical Employment Standards",
    description:
      "We adhere to international labour standards, ensure fair wages, provide health benefits, and maintain transparent employment practices across all our offices.",
  },
];

export default function Sustainability() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-emerald-500/5 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <Leaf className="w-[600px] h-[600px] text-emerald-500 absolute -top-40 -right-40" />
        </div>
        <div className="container-hero relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
              <Leaf className="h-4 w-4" />
              Our Commitment
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Hiring That <span className="gradient-text">Makes a Difference</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Infinity Teams, social impact isn't an afterthought — it's woven
              into every hire, every laptop, and every career we help build. We
              believe business growth and positive change go hand in hand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 md:py-24">
        <div className="container-hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Three <span className="gradient-text">Impact Pillars</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Concrete actions, measurable results. Here's how we're making a
              real difference.
            </p>
          </motion.div>

          <div className="space-y-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-2xl p-8 md:p-10"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
                    <pillar.icon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-6 space-y-4">
                    <p className="font-display font-semibold text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Key Highlights
                    </p>
                    {pillar.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 text-sm text-foreground"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Leaf className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Commitments */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beyond the <span className="gradient-text">Bottom Line</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our broader commitments to people, planet, and ethical business
              practices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {commitments.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 flex gap-5 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 via-emerald-500 to-primary">
        <div className="container-hero text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Build a Team. Build a Better World.
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              When you hire through Infinity Teams, you're not just scaling your
              business — you're creating careers, empowering students, and
              reducing waste. Let's grow together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/candidates">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                >
                  <Users className="h-4 w-4" />
                  Browse Candidates
                </Button>
              </Link>
              <Link to="/for-companies">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 gap-2"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
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
