import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils.ts";

export function withTooltipRenderer(
  element: React.ReactElement,
  text: string,
): React.ReactElement {
  const Wrapper = () => {
    const ref = useRef<HTMLElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const isTruncated = el.scrollWidth > el.clientWidth;
      setShowTooltip(isTruncated);
    }, [text]);

    const cloned = React.cloneElement(element, {
      ref,
      className: cn(
        element.props.className,
        "truncate overflow-hidden text-ellipsis block max-w-full",
      ),
    });

    return showTooltip ? (
      <Tooltip>
        <TooltipTrigger asChild>{cloned}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    ) : (
      cloned
    );
  };

  return <Wrapper />;
}
