
import React from "react";
import { CompanyType } from "@/types/company";
import AumCell from "../table-cells/AumCell";
import TeamCell from "../table-cells/TeamCell";
import CheckboxCell from "../table-cells/CheckboxCell";
import CompanyNameCell from "../table-cells/CompanyNameCell";
import CompanyTypeCell from "../table-cells/CompanyTypeCell";
import FoundedYearCell from "../table-cells/FoundedYearCell";

interface CompanyTableRowProps {
  company: CompanyType;
  isSelected: boolean;
  onToggleSelection: () => void;
  onViewCompany: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  columnSizes: Record<string, number>;
  formatAum: (aumValue: number | string | undefined | null) => string;
}

const CompanyTableRow = ({
  company,
  isSelected,
  onToggleSelection,
  onViewCompany,
  onToggleFavorite,
  columnSizes,
  formatAum
}: CompanyTableRowProps) => {
  return (
    <div
      onClick={onViewCompany}
      className="table-row flex items-center hover:bg-[rgba(60,106,173,0.05)] cursor-pointer duration-200"
    >
      <div className="min-w-12" style={{ width: columnSizes.checkbox }}>
        <CheckboxCell
          selected={isSelected}
          onToggle={(e) => {
            e.stopPropagation();
            onToggleSelection();
          }}
        />
      </div>
      
      <div style={{ width: columnSizes.name }}>
        <CompanyNameCell 
          name={company.firm_name} 
          onClick={onViewCompany}
          onToggleFavorite={(e) => {
            e.stopPropagation();
            onToggleFavorite(e);
          }}
          isFavorite={company.isFavorite || false}
          // Make sure to pass firm_id
          firm_id={company.firm_id}
        />
      </div>
      
      <div style={{ width: columnSizes.type }}>
        <CompanyTypeCell type={company.type} />
      </div>
      
      <div style={{ width: columnSizes.location }}>
        <div className="flex min-h-11 items-center px-4">
          <span className="text-[#111928] text-sm overflow-hidden text-ellipsis line-clamp-1">
            {company.location || 'N/A'}
          </span>
        </div>
      </div>
      
      <div style={{ width: columnSizes.team }}>
        <TeamCell staffCount={company.employees} />
      </div>
      
      <div style={{ width: columnSizes.aum }}>
        <AumCell aumValue={company.aum} formatAum={formatAum} />
      </div>
      
      <div style={{ width: columnSizes.founded }}>
        <FoundedYearCell foundedYear={company.foundedYear} />
      </div>
    </div>
  );
};

export default CompanyTableRow;
