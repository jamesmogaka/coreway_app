import { cn } from "@/lib/utils";

interface StepperProps {
  steps: readonly string[];
  activeStep: number;
}

export const Stepper = ({ steps, activeStep }: StepperProps) => (
  <div className="w-full mb-8">
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300",
              activeStep >= index
                ? "bg-[#FFD59A] text-[#3A3A3A]"
                : "bg-[#90D1CA] text-[#3A3A3A]"
            )}
          >
            {index + 1}
          </div>
          <div className={cn(
            "text-sm ml-2 transition-colors duration-300",
            activeStep >= index ? "text-[#F5F5F5]" : "text-[#c2eae7]"
            )}>{step}</div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-[#90D1CA] mx-4"></div>
          )}
        </div>
      ))}
    </div>
  </div>
);
