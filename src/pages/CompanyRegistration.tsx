import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, MailCheck, FileText, CheckCircle2, Bug, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RegistrationProgress } from "@/components/registration/RegistrationProgress";
import { CompanyAccountStep } from "@/components/company-registration/steps/CompanyAccountStep";
import { CompanyEmailVerificationStep } from "@/components/company-registration/steps/CompanyEmailVerificationStep";
import { CompanyDetailsStep } from "@/components/company-registration/steps/CompanyDetailsStep";
import { HiringPreferencesStep } from "@/components/company-registration/steps/HiringPreferencesStep";
import { CompanySuccessStep } from "@/components/company-registration/steps/CompanySuccessStep";
import infinityTeamsLogo from "@/assets/infinity-teams-logo.png";

const steps = [
  { id: 1, title: "Account", icon: Building2 },
  { id: 2, title: "Verify Email", icon: MailCheck },
  { id: 3, title: "Company Details", icon: FileText },
  { id: 4, title: "Hiring Prefs", icon: Sparkles },
  { id: 5, title: "Complete", icon: CheckCircle2 },
];

export default function CompanyRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [testMode, setTestMode] = useState(false);

  const handleAccountNext = (accountEmail: string) => {
    setEmail(accountEmail);
    setCurrentStep(2);
  };

  const handleStepClick = (stepId: number) => {
    if (testMode || stepId < currentStep) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28 pb-16">
        <div className="container-hero max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img src={infinityTeamsLogo} alt="Infinity Teams" className="h-14 w-auto object-contain mx-auto" />
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Company Registration
            </h1>
            <p className="text-muted-foreground text-lg">
              Register your company to access our global talent pool
            </p>
          </div>

          {/* Test Mode Toggle */}
          <div className="flex items-center justify-end gap-2 mb-6 p-3 rounded-lg border border-border bg-muted/50">
            <Bug className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="test-mode" className="text-sm text-muted-foreground cursor-pointer">
              Test Mode
            </Label>
            <Switch
              id="test-mode"
              checked={testMode}
              onCheckedChange={setTestMode}
            />
          </div>

          {/* Progress */}
          {currentStep < 5 && (
            <div className="mb-8">
              <RegistrationProgress
                steps={steps}
                currentStep={currentStep}
                totalSteps={steps.length}
                onStepClick={handleStepClick}
              />
            </div>
          )}

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <CompanyAccountStep onNext={handleAccountNext} testMode={testMode} />
              )}
              {currentStep === 2 && (
                <CompanyEmailVerificationStep
                  email={email}
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                  testMode={testMode}
                />
              )}
              {currentStep === 3 && (
                <CompanyDetailsStep
                  onNext={() => setCurrentStep(4)}
                  onSkip={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                  testMode={testMode}
                />
              )}
              {currentStep === 4 && (
                <HiringPreferencesStep
                  onNext={() => setCurrentStep(5)}
                  onBack={() => setCurrentStep(3)}
                  testMode={testMode}
                />
              )}
              {currentStep === 5 && <CompanySuccessStep />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
