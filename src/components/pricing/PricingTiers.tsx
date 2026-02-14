import { Check, Zap, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    icon: Zap,
    employees: "1-3",
    features: [
      "Full-time dedicated employees",
      "Complete salary transparency",
      "HR & payroll management",
      "Standard onboarding (2 weeks)",
      "Email support",
      "Monthly reporting",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    description: "Best for scaling companies",
    icon: Rocket,
    employees: "4-10",
    features: [
      "Everything in Starter",
      "Priority candidate matching",
      "Dedicated account manager",
      "Expedited onboarding (1 week)",
      "Priority support",
      "Weekly check-ins",
      "Performance tracking tools",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    icon: Building2,
    employees: "10+",
    features: [
      "Everything in Growth",
      "Custom SLA agreements",
      "On-site visits available",
      "Custom reporting & analytics",
      "Dedicated success team",
      "Volume discounts on fees",
      "Custom integration support",
    ],
    highlight: false,
  },
];

export const PricingTiers = () => {
  return (
    <section className="section-spacing">
      <div className="container-hero">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All plans include our transparent cost-plus pricing model. 
            The only difference is the level of support and additional services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                tier.highlight 
                  ? "border-accent shadow-lg scale-105 z-10" 
                  : "border-border hover:border-accent/50"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className={tier.highlight ? "pt-10" : ""}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${tier.highlight ? "bg-accent/10" : "bg-muted"}`}>
                    <tier.icon className={`h-6 w-6 ${tier.highlight ? "text-accent" : "text-foreground"}`} />
                  </div>
                  <CardTitle className="font-display text-2xl">{tier.name}</CardTitle>
                </div>
                <CardDescription className="text-base">{tier.description}</CardDescription>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Team size</p>
                  <p className="font-display text-3xl font-bold text-foreground">{tier.employees} <span className="text-lg font-normal text-muted-foreground">employees</span></p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium text-foreground mb-2">Pricing Model</p>
                  <p className="text-muted-foreground text-sm">
                    Employee Salary + <span className="font-semibold text-accent">€500/mo</span> service fee
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    + One-time recruitment fee (1 month salary, min €1,500)
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button 
                    variant={tier.highlight ? "cta" : "outline"} 
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          All plans include full salary transparency. No hidden markups, ever.
        </p>
      </div>
    </section>
  );
};
