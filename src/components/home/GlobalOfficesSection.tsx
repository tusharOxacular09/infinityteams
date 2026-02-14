import { motion } from "framer-motion";
import { MapPin, Phone, Building, Globe2 } from "lucide-react";

interface Office {
  city: string;
  country: string;
  type: string;
  address: string;
  phone?: string;
  comingSoon?: boolean;
  flag: string;
}

const offices: Office[] = [
  {
    city: "Mumbai",
    country: "India",
    type: "Talent & Operations Hub",
    address: "B Wing, Lumos cowork, Vasudev Chamber, CRESCENT GRANDE, 5th, Old Nagardas Rd, Mogra Village, Andheri East, Mumbai, Maharashtra 400069",
    phone: "+91 777 467 1788",
    flag: "🇮🇳",
  },
  {
    city: "Bangalore",
    country: "India",
    type: "Talent & Operations Hub",
    address: "Bangalore Tech Hub, Karnataka",
    flag: "🇮🇳",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    type: "European HQ",
    address: "Isaäc Asscherpad 11, 1096 BJ Amsterdam",
    phone: "+31 20 8080 486",
    flag: "🇳🇱",
  },
  {
    city: "New Jersey",
    country: "United States",
    type: "US Operations",
    address: "Coming Soon",
    comingSoon: true,
    flag: "🇺🇸",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export function GlobalOfficesSection() {
  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
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
            <Globe2 className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Global Presence</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Offices Around
            <span className="block gradient-text">The World</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            With operations in talent-rich hubs and business centers globally, 
            we're positioned to serve clients and support talent worldwide.
          </p>
        </motion.div>

        {/* Offices Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {offices.map((office) => (
            <motion.div
              key={office.city}
              variants={itemVariants}
              className={`relative bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all hover:shadow-lg ${
                office.comingSoon ? 'opacity-80' : ''
              }`}
            >
              {office.comingSoon && (
                <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-cta/20 text-cta text-xs font-medium">
                  Coming Soon
                </div>
              )}
              
              <div className="text-4xl mb-4">{office.flag}</div>
              
              <div className="flex items-start gap-2 mb-2">
                <Building className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {office.city}
                  </h3>
                  <p className="text-sm text-muted-foreground">{office.country}</p>
                </div>
              </div>
              
              <p className="text-xs font-medium text-accent mb-3">{office.type}</p>
              
              {!office.comingSoon && (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-snug">
                      {office.address}
                    </p>
                  </div>
                  
                  {office.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a 
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="text-sm text-foreground hover:text-accent transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
