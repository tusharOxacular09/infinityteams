import { motion } from "framer-motion";
import { 
  Shield, 
  Fingerprint, 
  Shuffle, 
  Link2, 
  Eye, 
  Users,
  Heart
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust",
    description: "We build reliable, long-lasting partnerships by honoring commitments and delivering consistently high-quality results.",
    color: "accent",
  },
  {
    icon: Fingerprint,
    title: "Real",
    description: "We speak honestly, act with integrity, and stay true to who we are. Authenticity shapes our communication and decisions.",
    color: "cta",
  },
  {
    icon: Shuffle,
    title: "Flexibility",
    description: "Every business is unique. Our solutions are adaptable, adjusting quickly to changing needs and ensuring the right fit.",
    color: "success",
  },
  {
    icon: Link2,
    title: "Connection",
    description: "We believe in collaboration with purpose. By truly understanding people, we create stronger, more impactful relationships.",
    color: "accent",
  },
  {
    icon: Eye,
    title: "Transparent",
    description: "Open communication and clarity are at the core of everything—from pricing to processes, from recruitment to delivery.",
    color: "cta",
  },
  {
    icon: Users,
    title: "Togetherness",
    description: "Success is a shared journey. We work as partners with clients and allies with talent, achieving more together.",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function CoreValuesSection() {
  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-hero relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Heart className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Our Core Values</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Principles That
            <span className="block gradient-text">Guide Everything We Do</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These values shape how we work, build relationships, and create value 
            for our clients, talent, and team.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all hover:shadow-xl text-center"
            >
              {/* Icon background glow */}
              <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl transition-opacity group-hover:opacity-100 opacity-0 ${
                value.color === 'accent' 
                  ? 'bg-accent/30' 
                  : value.color === 'cta'
                  ? 'bg-cta/30'
                  : 'bg-success/30'
              }`} />
              
              <div className={`relative inline-flex p-4 rounded-2xl mb-5 transition-colors ${
                value.color === 'accent' 
                  ? 'bg-accent/10 group-hover:bg-accent/20' 
                  : value.color === 'cta'
                  ? 'bg-cta/10 group-hover:bg-cta/20'
                  : 'bg-success/10 group-hover:bg-success/20'
              }`}>
                <value.icon className={`h-8 w-8 ${
                  value.color === 'accent' 
                    ? 'text-accent' 
                    : value.color === 'cta'
                    ? 'text-cta'
                    : 'text-success'
                }`} />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
