
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxCellProps {
  isSelected: boolean;
  onToggle: (e: React.MouseEvent) => void;
  ariaLabel?: string;
}

const CheckboxCell = ({ isSelected, onToggle, ariaLabel = "Select row" }: CheckboxCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
    <Checkbox
      checked={isSelected}
      onCheckedChange={() => {
        // Create a synthetic event to match the expected type
        const syntheticEvent = { stopPropagation: () => {} } as React.MouseEvent;
        onToggle(syntheticEvent);
      }}
      aria-label={ariaLabel}
      className="h-5 w-5 rounded-md"
    />
  </div>
);

export default CheckboxCell;
export type { CheckboxCellProps };
