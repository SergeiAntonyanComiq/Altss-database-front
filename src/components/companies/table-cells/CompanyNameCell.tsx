
import React from "react";
import { Heart } from "lucide-react";

interface CompanyNameCellProps {
  companyName: string;
  isFavorite: boolean;
  onCompanyClick: () => void;
  onFavoriteClick: (e: React.MouseEvent) => void;
  firm_id?: string;
}

const CompanyNameCell = ({ companyName, isFavorite, onCompanyClick, onFavoriteClick, firm_id }: CompanyNameCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
    <div 
      className="flex-1 cursor-pointer truncate text-sm"
      onClick={onCompanyClick}
    >
      {companyName}
    </div>
    <button
      onClick={onFavoriteClick}
      className="ml-2 flex items-center justify-center flex-shrink-0"
    >
      <Heart 
        className={`h-5 w-5 cursor-pointer ${isFavorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
      />
    </button>
  </div>
);

export default CompanyNameCell;
