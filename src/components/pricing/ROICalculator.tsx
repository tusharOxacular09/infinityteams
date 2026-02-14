import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, DollarSign, Percent, Users } from "lucide-react";

export const ROICalculator = () => {
  const [localSalary, setLocalSalary] = useState(5000);
  const [teamSize, setTeamSize] = useState(3);
  const [infinitySalary, setInfinitySalary] = useState(1500);

  const calculations = useMemo(() => {
    const SERVICE_FEE = 500;
    const RECRUITMENT_FEE = Math.max(infinitySalary, 1500);
    
    // Monthly costs
    const localMonthlyCost = localSalary * teamSize;
    const infinityMonthlyCost = (infinitySalary + SERVICE_FEE) * teamSize;
    
    // Annual costs (including one-time recruitment fee amortized)
    const localAnnualCost = localMonthlyCost * 12;
    const infinityAnnualCost = (infinityMonthlyCost * 12) + (RECRUITMENT_FEE * teamSize);
    
    // Savings
    const monthlySavings = localMonthlyCost - infinityMonthlyCost;
    const annualSavings = localAnnualCost - infinityAnnualCost;
    const savingsPercentage = ((localAnnualCost - infinityAnnualCost) / localAnnualCost) * 100;
    
    return {
      localMonthlyCost,
      infinityMonthlyCost,
      localAnnualCost,
      infinityAnnualCost,
      monthlySavings,
      annualSavings,
      savingsPercentage,
    };
  }, [localSalary, teamSize, infinitySalary]);

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    })}`;
  };

  return (
    <section className="section-spacing">
      <div className="container-hero">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Calculate Your <span className="text-accent">ROI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much you can save by hiring through Infinity Teams compared to local hiring.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">Your Current Situation</h3>
              
              {/* Local Salary */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Local Employee Salary (Monthly)
                  </label>
                  <span className="text-lg font-bold text-foreground">{formatCurrency(localSalary)}</span>
                </div>
                <Slider
                  value={[localSalary]}
                  onValueChange={(value) => setLocalSalary(value[0])}
                  min={2000}
                  max={15000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>€2,000</span>
                  <span>€15,000</span>
                </div>
              </div>

              {/* Team Size */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Team Size
                  </label>
                  <span className="text-lg font-bold text-foreground">{teamSize} employees</span>
                </div>
                <Slider
                  value={[teamSize]}
                  onValueChange={(value) => setTeamSize(value[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Infinity Salary */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Infinity Teams Salary (Monthly)
                  </label>
                  <span className="text-lg font-bold text-accent">{formatCurrency(infinitySalary)}</span>
                </div>
                <Slider
                  value={[infinitySalary]}
                  onValueChange={(value) => setInfinitySalary(value[0])}
                  min={500}
                  max={5000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>€500</span>
                  <span>€5,000</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {/* Savings Highlight */}
              <motion.div 
                className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl border border-success/20 p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={`savings-${localSalary}-${teamSize}-${infinitySalary}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-success/10">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                    <p className="text-3xl font-bold text-success">
                      {formatCurrency(Math.max(0, calculations.annualSavings))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-success" />
                  <span className="text-success font-medium">
                    {Math.max(0, calculations.savingsPercentage).toFixed(1)}% cost reduction
                  </span>
                </div>
              </motion.div>

              {/* Cost Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl border border-border p-4">
                  <p className="text-sm text-muted-foreground mb-1">Local Hiring (Annual)</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(calculations.localAnnualCost)}
                  </p>
                </div>
                <div className="bg-accent/5 rounded-xl border border-accent/20 p-4">
                  <p className="text-sm text-muted-foreground mb-1">Infinity Teams (Annual)</p>
                  <p className="text-xl font-bold text-accent">
                    {formatCurrency(calculations.infinityAnnualCost)}
                  </p>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="bg-muted/50 rounded-xl border border-border p-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">Monthly Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {teamSize} employees × {formatCurrency(infinitySalary)}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(infinitySalary * teamSize)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Service fee × {teamSize}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(500 * teamSize)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Total Monthly</span>
                    <span className="font-bold text-accent">
                      {formatCurrency(calculations.infinityMonthlyCost)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                * Includes one-time recruitment fee of {formatCurrency(Math.max(infinitySalary, 1500))} per employee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
