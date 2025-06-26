import React, { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip.tsx";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[30px] border py-0.5 text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden px-3.5 h-8.5",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#DBE5FE] text-[#0145C7] [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-[#007E601A] text-[#007E60] [a&]:hover:bg-primary/90",
        outline:
          "border-[#0145C7] bg-transparent text-[#0145C7] [a&]:hover:bg-primary/90",
        error:
          "border-transparent bg-[#FEF3F3] text-[#BC1C21] [a&]:hover:bg-primary/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({
  className,
  variant,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    children: React.ReactNode;
  }) {
  const Comp = asChild ? Slot : "span";
  const textRef = useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const isTruncated = el.scrollWidth > el.clientWidth;
    setShowTooltip(isTruncated);
  }, [children]);

  const content = (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      <span
        ref={textRef}
        className="truncate overflow-hidden text-ellipsis block max-w-full"
      >
        {children}
      </span>
    </Comp>
  );

  return showTooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}
