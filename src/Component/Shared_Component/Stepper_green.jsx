import React from "react";

const Stepper_green = ({
  currentStep = 1,
  totalSteps = 4,
  title,
  onStepClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center  mb-5 w-[50%]">
      <span className="text-[#364153] text-sm mb-8">
        الخطوة {currentStep} من {totalSteps}
      </span>

      <div className="flex gap-2 items-end w-full">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isDone = stepNumber <= currentStep;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <span className="h-5 text-sm text-[#364153]">
                {isActive ? title : ""}
              </span>

              <div
                onClick={() => {
                  if (stepNumber < currentStep) {
                    onStepClick?.(stepNumber);
                  }
                }}
                className={`w-full h-2 rounded-full transition-all duration-300 ${
                  stepNumber < currentStep ? "cursor-pointer" : "cursor-default"
                } ${
                  isDone
                    ? "bg-gradient-to-r from-[#08AC85DB] to-[#00786F]"
                    : "bg-gray-200"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper_green;