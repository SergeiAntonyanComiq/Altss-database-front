
import React from "react";
import { CompanyType } from "@/types/company";
import CheckboxCell from "../table-cells/CheckboxCell";
import CompanyNameCell from "../table-cells/CompanyNameCell";
import CompanyTypeCell from "../table-cells/CompanyTypeCell";
import AumCell from "../table-cells/AumCell";
import FoundedYearCell from "../table-cells/FoundedYearCell";
import TeamCell from "../table-cells/TeamCell";

interface CompanyTableRowProps {
  company: CompanyType;
  isSelected: boolean;
  onToggleSelection: () => void;
  onViewCompany: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  columnSizes: {
    checkbox: number;
    companyName: number;
    companyType: number;
    aum: number;
    foundedYear: number;
    knownTeam: number;
    actions: number;
  };
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
    <div className="flex min-h-[50px] w-full border-b border-[#DFE4EA]">
      {/* Checkbox cell */}
      <div style={{width: `${columnSizes.checkbox}%`}} className="flex items-center justify-center min-w-[40px]">
        <CheckboxCell
          isSelected={isSelected}
          onChange={onToggleSelection}
          ariaLabel={`Select ${company.firm_name}`}
        />
      </div>
      
      {/* Company Name cell */}
      <div style={{width: `${columnSizes.companyName}%`}} className="overflow-hidden text-sm text-gray-800 font-medium leading-tight">
        <CompanyNameCell
          companyName={company.firm_name}
          isFavorite={company.isFavorite || false}
          onCompanyClick={() => onViewCompany()}
          onFavoriteClick={onToggleFavorite}
        />
      </div>
      
      {/* Company Type cell */}
      <div style={{width: `${columnSizes.companyType}%`}} className="overflow-hidden text-sm text-blue-700 font-medium leading-tight">
        <CompanyTypeCell type={company.firm_type || company.type || 'N/A'} />
      </div>
      
      {/* AUM cell */}
      <div style={{width: `${columnSizes.aum}%`}} className="overflow-hidden text-sm text-gray-800 font-medium leading-tight">
        <AumCell aumFormatted={formatAum(company.aum)} />
      </div>
      
      {/* Founded Year cell */}
      <div style={{width: `${columnSizes.foundedYear}%`}} className="overflow-hidden text-sm text-gray-800 font-medium leading-tight">
        <FoundedYearCell year={company.year_est} />
      </div>
      
      {/* Known Team cell */}
      <div style={{width: `${columnSizes.knownTeam}%`}} className="overflow-hidden text-sm text-green-700 font-medium leading-tight">
        <TeamCell staffCount={company.total_staff} />
      </div>
      
      {/* Actions cell */}
      <div style={{width: `${columnSizes.actions}%`}} className="overflow-hidden min-w-[40px] flex items-center justify-center">
        <div className="flex min-h-11 w-full items-center gap-2.5 justify-center"></div>
      </div>
    </div>
  );
};

export default CompanyTableRow;
