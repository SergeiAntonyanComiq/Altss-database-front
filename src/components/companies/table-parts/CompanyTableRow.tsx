import React from "react";
import { CompanyType } from "@/types/company";
import { TableCheckbox } from "@/components/ui/table-checkbox";
import CompanyNameCell from "../table-cells/CompanyNameCell";
import CompanyTypeCell from "../table-cells/CompanyTypeCell";
import AumCell from "../table-cells/AumCell";
import FoundedYearCell from "../table-cells/FoundedYearCell";
import TeamCell from "../table-cells/TeamCell";
import { Column } from "./CompaniesTableHeader";

interface CompanyTableRowProps {
  company: CompanyType;
  isSelected: boolean;
  onToggleSelection: () => void;
  onViewCompany: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  columns: Column[];
  formatAum: (aumValue: number | string | undefined | null) => string;
}

const CompanyTableRow: React.FC<CompanyTableRowProps> = ({
  company,
  isSelected,
  onToggleSelection,
  onViewCompany,
  onToggleFavorite,
  columns,
  formatAum
}: CompanyTableRowProps) => {
  // Calculate total minimum width
  const totalMinWidth = columns.reduce((sum, col) => sum + col.minWidth, 0) + 44; // Include checkbox column width
  
  return (
    <div className="flex w-full border-b border-[rgba(223,228,234,1)]" style={{ minWidth: `${totalMinWidth}px` }}>
      <div className="w-11 min-w-[44px] border-r border-[rgba(223,228,234,1)] flex items-center justify-center py-3">
        <TableCheckbox
          id={`company-${company.id}`}
          checked={isSelected}
          onCheckedChange={onToggleSelection}
          aria-label={`Select ${company.firm_name}`}
        />
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center gap-2.5 cursor-pointer"
        style={{ width: columns[0].width, minWidth: columns[0].minWidth }}
        onClick={onViewCompany}
      >
        <CompanyNameCell
          companyName={company.firm_name}
          isFavorite={company.isFavorite || false}
          onCompanyClick={() => {}}
          onFavoriteClick={onToggleFavorite}
        />
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
        style={{ width: columns[1].width, minWidth: columns[1].minWidth }}
      >
        <CompanyTypeCell type={company.firm_type || company.type || 'N/A'} />
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
        style={{ width: columns[2].width, minWidth: columns[2].minWidth }}
      >
        <AumCell aumFormatted={formatAum(company.aum)} />
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
        style={{ width: columns[3].width, minWidth: columns[3].minWidth }}
      >
        <FoundedYearCell year={company.year_est} />
      </div>
      
      <div 
        className="px-4 py-3 flex items-center"
        style={{ width: columns[4].width, minWidth: columns[4].minWidth }}
      >
        <TeamCell staffCount={company.total_staff} />
      </div>
    </div>
  );
};

export default CompanyTableRow;
