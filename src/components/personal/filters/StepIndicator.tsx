
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mt-2 mb-4">
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span 
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              currentStep === index + 1 ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <div className="text-sm text-muted-foreground ml-2">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default StepIndicator;
