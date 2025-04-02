
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxCellProps {
  isSelected: boolean;
  onChange: () => void;
  ariaLabel: string;
}

const CheckboxCell = ({ isSelected, onChange, ariaLabel }: CheckboxCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
    <Checkbox
      checked={isSelected}
      onCheckedChange={onChange}
      aria-label={ariaLabel}
      className="h-5 w-5 rounded-md"
    />
  </div>
);

export default CheckboxCell;
