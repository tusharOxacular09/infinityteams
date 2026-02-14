import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingCalculator } from "@/components/home/PricingCalculator";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { ROICalculator } from "@/components/pricing/ROICalculator";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-hero text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Simple, Transparent <span className="text-accent">Pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            No hidden fees, no surprises. Pay only for what you need with our cost-plus model 
            that gives you complete visibility into where your money goes.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span className="text-foreground">100% Salary Transparency</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span className="text-foreground">Fixed €500/month Service Fee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span className="text-foreground">No Long-term Contracts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <PricingTiers />

      {/* Interactive Calculator */}
      <section className="section-spacing bg-muted/30">
        <div className="container-hero">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Calculate Your Costs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our interactive calculator to estimate your monthly costs based on your team's salary requirements.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* FAQ Section */}
      <PricingFAQ />

      <Footer />
    </div>
  );
};

export default Pricing;
