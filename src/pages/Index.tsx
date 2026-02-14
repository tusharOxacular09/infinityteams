import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedCandidatesSection } from "@/components/home/FeaturedCandidatesSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { HiringProcessSection } from "@/components/home/HiringProcessSection";
import { CoreValuesSection } from "@/components/home/CoreValuesSection";
import { GlobalOfficesSection } from "@/components/home/GlobalOfficesSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CTASection } from "@/components/home/CTASection";
import { SocialImpactSection } from "@/components/home/SocialImpactSection";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyChooseUsSection />
      <FeaturesSection />
      <FeaturedCandidatesSection />
      <IndustriesSection />
      <HowItWorksSection />
      <HiringProcessSection />
      <ComparisonSection />
      <CoreValuesSection />
      <GlobalOfficesSection />
      <SocialImpactSection />
      <HomeFAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
