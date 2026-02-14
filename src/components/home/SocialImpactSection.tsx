import { motion } from "framer-motion";
import { Leaf, Laptop, Users, Recycle, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const impactPillars = [
  {
    icon: Laptop,
    title: "Refurbished Laptops for Students",
    description:
      "We donate refurbished company laptops to underprivileged students across India, giving them the tools to build a brighter future.",
    stat: "500+",
    statLabel: "Laptops donated",
  },
  {
    icon: Users,
    title: "Job Creation in India",
    description:
      "Every hire through Infinity Teams creates meaningful, well-paid employment — lifting families and communities while delivering world-class talent.",
    stat: "1,000+",
    statLabel: "Jobs created",
  },
  {
    icon: Recycle,
    title: "Reduced E-Waste",
    description:
      "By refurbishing and reusing corporate hardware instead of discarding it, we actively reduce e-waste and lower our environmental footprint.",
    stat: "2 tons",
    statLabel: "E-waste diverted",
  },
];

export function SocialImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative leaf pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
        <Leaf className="w-full h-full text-accent" />
      </div>

      <div className="container-hero relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
            <Leaf className="h-4 w-4" />
            Social Impact & Sustainability
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hiring That <span className="gradient-text">Makes a Difference</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every team you build with us contributes to job creation, education,
            and a greener planet. Impact isn't a side-effect — it's part of
            our model.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {impactPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/20 transition-colors">
                <pillar.icon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="font-display text-3xl font-bold text-foreground mb-1">
                {pillar.stat}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">
                {pillar.statLabel}
              </p>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link to="/sustainability">
            <Button variant="outline" size="lg" className="gap-2 group">
              <Heart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Learn About Our Impact
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
