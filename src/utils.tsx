import React from "react";

interface LoadingProps {
  show?: boolean;
  local?: boolean;
  onClick?: () => void;
}

export const Loading = ({
  show = false,
  local = false,
  onClick,
}: LoadingProps) =>
  show ? (
    <div
      onClick={onClick}
      className={`${
        local ? "absolute" : "fixed"
      } inset-0 z-[100] flex items-center justify-center ${
        local ? "bg-white/60 text-gray-700" : "bg-black/60 text-white"
      }`}
      data-testid="backdrop"
    >
      <div className="relative w-12 h-12">
        <svg className="animate-spin w-full h-full" viewBox="0 0 50 50">
          <circle
            className="text-transparent"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="url(#circularGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="circularGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4B5563" stopOpacity="0.4" />{" "}
              {/* gray-700 */}
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="ml-4 text-lg">Loading...</span>
    </div>
  ) : null;
