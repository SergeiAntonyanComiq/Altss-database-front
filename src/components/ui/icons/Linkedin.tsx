import React from "react";
import { cn } from "@/lib/utils.ts";

export const LinkedinIcon = ({
  width = 16,
  height = 16,
  className = "",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    className={cn("fill-current text-[#0A66C2]", className)}
    viewBox="0 0 34 34"
    {...props}
  >
    <path d="M34,3.1c0-1.7-1.4-3.1-3.1-3.1H3.1C1.4,0,0,1.4,0,3.1v27.8C0,32.6,1.4,34,3.1,34h27.8c1.7,0,3.1-1.4,3.1-3.1V3.1z M10,29H5V12.5h5V29z M7.5,10.3c-1.6,0-2.9-1.3-2.9-2.9C4.6,5.8,5.9,4.5,7.5,4.5c1.6,0,2.9,1.3,2.9,2.9C10.4,9,9.1,10.3,7.5,10.3z M29,29h-5v-7.8c0-1.9,0-4.3-2.6-4.3c-2.6,0-3,2-3,4.1V29h-5V12.5h4.8v2.2h0.1c0.7-1.3,2.4-2.6,4.9-2.6c5.2,0,6.2,3.4,6.2,7.8V29z" />
  </svg>
);
