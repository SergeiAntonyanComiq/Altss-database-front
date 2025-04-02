
import React from "react";
import { Star, StarOff } from "lucide-react";

interface CompanyNameCellProps {
  name: string;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite: boolean;
  firm_id?: string | number;
}

const CompanyNameCell = ({
  name,
  onClick,
  onToggleFavorite,
  isFavorite,
}: CompanyNameCellProps) => {
  return (
    <div
      className="flex min-h-11 w-full items-center gap-2.5 px-4"
      onClick={onClick}
    >
      <button
        onClick={onToggleFavorite}
        className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
      >
        {isFavorite ? (
          <Star className="h-[18px] w-[18px] fill-[#FFC319] text-[#FFC319]" />
        ) : (
          <StarOff className="h-[18px] w-[18px] text-[#D1D5DB]" />
        )}
      </button>
      <span className="overflow-hidden text-ellipsis line-clamp-1 font-medium text-[#111928]">
        {name}
      </span>
    </div>
  );
};

export default CompanyNameCell;
