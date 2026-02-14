import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PricingCalculator } from "./PricingCalculator";
import { ArrowRight, CheckCircle2, Globe2, Users, Shield } from "lucide-react";
const heroStats = [{
  value: "50K+",
  label: "Verified Candidates"
}, {
  value: "120+",
  label: "Countries"
}, {
  value: "5000+",
  label: "Companies Trust Us"
}, {
  value: "98%",
  label: "Client Satisfaction"
}];
const heroFeatures = ["Pre-vetted remote professionals", "Full-time dedicated employees", "Complete HR & payroll handled", "No hidden costs or surprises"];
export function HeroSection() {
  return <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-mesh opacity-60" />
      
      {/* Floating shapes */}
      <motion.div className="absolute top-32 left-10 w-24 h-24 rounded-full bg-accent/20 blur-xl" animate={{
      y: [0, -20, 0]
    }} transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      <motion.div className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-cta/20 blur-xl" animate={{
      y: [0, 20, 0]
    }} transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      <motion.div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-primary-foreground/10 blur-lg" animate={{
      y: [0, -15, 0],
      x: [0, 10, 0]
    }} transition={{
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      <div className="container-hero relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-20">
          {/* Left Column - Content */}
          <motion.div className="text-center lg:text-left" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            {/* Badge */}
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 mb-6" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2
          }}>
              <Globe2 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground/90">Global Talent, Local Excellence</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">Build World-Class
Remote Employees<span className="block gradient-text-hero">Teams at Cost Price</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              The first fully transparent, cost-plus global hiring platform. Pay employee salaries at cost + a flat monthly fee. No hidden markups. No surprises.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {heroFeatures.map((feature, index) => <motion.div key={feature} className="flex items-center gap-2" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.3 + index * 0.1
            }}>
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/80">{feature}</span>
                </motion.div>)}
            </div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }}>
              <Link to="/candidates">
                <Button variant="cta" size="xl" className="w-full sm:w-auto group">
                  Browse Talent
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Become a Candidate
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div className="mt-12 pt-8 border-t border-primary-foreground/10" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6
          }}>
              <div className="flex items-center justify-center lg:justify-start gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-sm text-primary-foreground/70">SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-sm text-primary-foreground/70">GDPR Ready</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Calculator */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="relative">
            <PricingCalculator />
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div className="relative z-10 -mb-16 pb-8" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.7
      }}>
          <div className="glass rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {heroStats.map((stat, index) => <motion.div key={stat.label} className="text-center" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.8 + index * 0.1
            }}>
                  <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
}