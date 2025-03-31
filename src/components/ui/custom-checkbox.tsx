
import React from "react";
import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

const CustomCheckbox = ({
  checked = false,
  onChange,
  disabled = false,
  className,
  id,
  "aria-label": ariaLabel,
}: CustomCheckboxProps) => {
  return (
    <div 
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      id={id}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onChange?.()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          !disabled && onChange?.();
        }
      }}
      className={cn(
        "w-5 h-5 rounded-lg flex items-center justify-center cursor-pointer",
        checked 
          ? "bg-[#2665F0]" 
          : "bg-white border border-gray-300",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {checked && (
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 14 14" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path 
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export { CustomCheckbox };
