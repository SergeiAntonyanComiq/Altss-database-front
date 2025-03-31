
import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, id }) => {
  return (
    <div 
      className="relative flex items-center justify-center h-5 w-5 cursor-pointer"
      onClick={onChange}
    >
      <input 
        type="checkbox" 
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only" // visually hidden but accessible
      />
      <div 
        className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors ${
          checked ? 'bg-[#2665F0] border-[#2665F0]' : 'bg-white border-gray-300'
        }`}
      >
        {checked && (
          <svg 
            width="10" 
            height="8" 
            viewBox="0 0 10 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9 1L3.5 6.5L1 4" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default CustomCheckbox;
