import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface RegistrationProgressProps {
  steps: Step[];
  currentStep: number;
  totalSteps: number;
  onStepClick?: (stepId: number) => void;
}

export function RegistrationProgress({ steps, currentStep, totalSteps, onStepClick }: RegistrationProgressProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-2">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Counter */}
      <div className="text-right text-sm text-muted-foreground mb-6">
        Step {currentStep} of {totalSteps}
      </div>

      {/* Step Icons */}
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div 
              key={step.id} 
              className={cn(
                "flex flex-col items-center flex-1",
                onStepClick && "cursor-pointer group"
              )}
              onClick={() => onStepClick?.(step.id)}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 mb-2",
                  isCompleted && "bg-accent text-accent-foreground",
                  isCurrent && "bg-accent text-accent-foreground shadow-lg shadow-accent/30",
                  isUpcoming && "bg-muted text-muted-foreground",
                  onStepClick && "group-hover:ring-2 group-hover:ring-accent/50"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium text-center transition-colors hidden sm:block",
                  isCurrent && "text-accent",
                  isCompleted && "text-foreground",
                  isUpcoming && "text-muted-foreground",
                  onStepClick && "group-hover:text-accent"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
