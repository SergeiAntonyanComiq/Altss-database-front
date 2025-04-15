import React from "react";
import { Heart } from "lucide-react";

interface CompanyNameCellProps {
  companyName: string;
  isFavorite: boolean;
  onCompanyClick: () => void;
  onFavoriteClick: (e: React.MouseEvent) => void;
}

const CompanyNameCell = ({ companyName, isFavorite, onCompanyClick, onFavoriteClick }: CompanyNameCellProps) => (
  <div className="flex items-center gap-1 ml-1 flex-1 min-w-0">
    <span className="text-sm font-medium text-gray-800 truncate">
      {companyName}
    </span>
    <button 
      onClick={onFavoriteClick}
      className="focus:outline-none ml-auto text-gray-400 hover:text-[#03887E]"
    >
      <Heart 
        className={`h-4 w-4 ${isFavorite ? 'text-[#03887E] fill-[#03887E]' : ''}`} 
      />
    </button>
  </div>
);

export default CompanyNameCell;
