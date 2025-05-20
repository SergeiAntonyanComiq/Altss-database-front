// components/ui/SearchInput.tsx
"use client";

import { cn } from "@/lib/utils";
import { X, Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
}) => {
  return (
    <div className={cn("min-w-60 w-[363px]", className)}>
      <div className="border border-[#DFE4EA] bg-white flex w-full gap-2 h-11 pl-5 pr-4 rounded-[50px] items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "bg-transparent outline-none flex-1 border-none text-base placeholder:text-[#9CA3AF]",
            value ? "text-black" : "text-[#9CA3AF]"
          )}
        />
        {value ? (
          <X
            className="text-[#9CA3AF] size-4 cursor-pointer"
            onClick={() => onChange("")}
          />
        ) : (
          <Search className="text-[#9CA3AF] size-4" />
        )}
      </div>
    </div>
  );
};
