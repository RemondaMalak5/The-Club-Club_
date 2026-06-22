import React from "react";

const Stepper_orange = ({
  title,
  totalSteps = 3,
  currentStep = 1,
  onStepClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center mb-10  w-[50%]">
        <span className="hidden sm:inline text-[#364153] text-sm">
  الخطوة {currentStep} من {totalSteps}
</span>
      <div className="flex justify-between py-1 w-full px-5">
      

        <span className="text-[#364153] text-sm">
          {title}
        </span>
      </div>

      <div className="flex gap-2 items-center w-full">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isDone = stepNumber <= currentStep;

          return (
            <div
              key={index}
              onClick={() => {
                if (stepNumber < currentStep) {
                  onStepClick?.(stepNumber);
                }
              }}
              className={`w-56 h-2 rounded-full transition-all duration-300
                ${
                  stepNumber < currentStep
                    ? "cursor-pointer"
                    : "cursor-default"
                }
                ${
                  isDone
                    ? "bg-gradient-to-r from-[#FFA811] to-[#FF683B]"
                    : "bg-gray-200"
                }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Stepper_orange;