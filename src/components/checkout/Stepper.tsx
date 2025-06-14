import { cn } from "@/lib/utils";

interface StepperProps {
  steps: readonly string[];
  activeStep: number;
}

export const Stepper = ({ steps, activeStep }: StepperProps) => (
  <div className="w-full mb-8">
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              activeStep >= index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <div className="text-sm ml-2">{step}</div>
          {index < steps.length - 1 && (
            <div className="w-16 h-0.5 bg-muted mx-2"></div>
          )}
        </div>
      ))}
    </div>
  </div>
);
