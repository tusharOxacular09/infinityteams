import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FooterCTA() {
  return (
    <section className="hero-gradient text-primary-foreground">
      <div className="container-hero py-16 md:py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Build Your Global Team Without Risk
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Hire full-time global talent at cost price.{" "}
          <span className="block mt-1">No markups. One-month exit. Fully managed.</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/candidates">
            <Button variant="cta" size="lg" className="gap-2">
              Browse Talent
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="hero-outline" size="lg">
              Calculate Cost
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="hero-outline" size="lg">
              Book a Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
