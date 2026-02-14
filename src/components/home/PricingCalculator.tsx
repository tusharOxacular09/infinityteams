import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign, Clock, Globe } from "lucide-react";

const MONTHLY_WORKING_HOURS = 173;
const INFINITY_TEAMS_FEE = 349;
const FIXED_MONTHLY_FEES = INFINITY_TEAMS_FEE;

interface CurrencyOption {
  code: string;
  symbol: string;
  rate: number; // Rate against EUR
  name: string;
  locale: string[];
}

const currencies: CurrencyOption[] = [
  { code: "EUR", symbol: "€", rate: 1, name: "Euro", locale: ["de", "fr", "nl", "es", "it", "at", "be"] },
  { code: "USD", symbol: "$", rate: 1.08, name: "US Dollar", locale: ["en-US", "us"] },
  { code: "GBP", symbol: "£", rate: 0.86, name: "British Pound", locale: ["en-GB", "gb", "uk"] },
  { code: "INR", symbol: "₹", rate: 90.5, name: "Indian Rupee", locale: ["en-IN", "in", "hi"] },
];

// Auto-detect currency based on browser locale/timezone
function detectUserCurrency(): CurrencyOption {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language.toLowerCase();
    
    // Check timezone for region detection
    if (timezone.includes("America") || timezone.includes("US")) {
      return currencies.find(c => c.code === "USD") || currencies[0];
    }
    if (timezone.includes("London") || timezone.includes("Europe/London") || locale.includes("gb")) {
      return currencies.find(c => c.code === "GBP") || currencies[0];
    }
    if (timezone.includes("Kolkata") || timezone.includes("India") || locale.includes("in")) {
      return currencies.find(c => c.code === "INR") || currencies[0];
    }
    if (timezone.includes("Europe")) {
      return currencies.find(c => c.code === "EUR") || currencies[0];
    }
    
    // Fallback to locale-based detection
    for (const currency of currencies) {
      if (currency.locale.some(l => locale.includes(l))) {
        return currency;
      }
    }
  } catch (e) {
    // Fallback to EUR if detection fails
  }
  return currencies[0];
}

export function PricingCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(1000);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [autoDetected, setAutoDetected] = useState(false);

  // Auto-detect currency on mount
  useEffect(() => {
    const detected = detectUserCurrency();
    setSelectedCurrency(detected);
    setAutoDetected(true);
  }, []);

  const calculations = useMemo(() => {
    const totalMonthlyCost = monthlySalary + FIXED_MONTHLY_FEES;
    const hourlyRate = totalMonthlyCost / MONTHLY_WORKING_HOURS;
    
    return {
      totalMonthlyCost,
      hourlyRate,
      fixedFees: FIXED_MONTHLY_FEES,
    };
  }, [monthlySalary]);

  const formatCurrency = (amount: number) => {
    const convertedAmount = amount * selectedCurrency.rate;
    return `${selectedCurrency.symbol}${convertedAmount.toLocaleString('en-US', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 2 
    })}`;
  };

  return (
    <div className="calculator-card">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-cta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-accent/10">
            <Calculator className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">Pricing Calculator</h3>
            <p className="text-sm text-muted-foreground">Estimate your hiring costs instantly</p>
          </div>
        </div>

        {/* Currency Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Display Currency</label>
            {autoDetected && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Globe className="h-3 w-3" />
                Auto-detected
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  setSelectedCurrency(currency);
                  setAutoDetected(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCurrency.code === currency.code
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {currency.symbol} {currency.code}
              </button>
            ))}
          </div>
        </div>

        {/* Salary Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">Employee Monthly Salary (EUR)</label>
            <span className="text-lg font-bold text-accent">€{monthlySalary.toLocaleString()}</span>
          </div>
          <Slider
            value={[monthlySalary]}
            onValueChange={(value) => setMonthlySalary(value[0])}
            min={500}
            max={10000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>€500</span>
            <span>€10,000</span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="p-4 rounded-xl bg-accent/10 border border-accent/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`monthly-${monthlySalary}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">Total Monthly</span>
            </div>
            <p className="text-2xl font-bold font-display text-foreground">
              {formatCurrency(calculations.totalMonthlyCost)}
            </p>
          </motion.div>
          
          <motion.div 
            className="p-4 rounded-xl bg-accent/10 border border-accent/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`hourly-${monthlySalary}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">Hourly Rate</span>
            </div>
            <p className="text-2xl font-bold font-display text-foreground">
              {formatCurrency(calculations.hourlyRate)}
            </p>
          </motion.div>
        </div>

        {/* Fee Breakdown */}
        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Monthly Cost Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Employee Salary</span>
              <span className="font-medium text-foreground">{formatCurrency(monthlySalary)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Infinity Teams Fee</span>
              <span className="font-medium text-foreground">{formatCurrency(INFINITY_TEAMS_FEE)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border mt-2">
              <span className="font-semibold text-foreground">Total Monthly</span>
              <span className="font-bold text-accent">{formatCurrency(calculations.totalMonthlyCost)}</span>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
          <h4 className="text-sm font-semibold text-foreground mb-3">What's included in the Infinity Teams Fee</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {[
              "Recruitment",
              "Salary",
              "HR & Payroll",
              "Compliance & Tax",
              "Office & Infrastructure",
              "IT & Equipment Support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-accent">✔</span>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
