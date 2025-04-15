import React from "react";
import { CompanyType } from "@/types/company";
import { TableCheckbox } from "@/components/ui/table-checkbox";
import CompanyNameCell from "../table-cells/CompanyNameCell";
import CompanyTypeCell from "../table-cells/CompanyTypeCell";
import BackgroundCell from "../table-cells/BackgroundCell";
import LocationCell from "../table-cells/LocationCell";
import WebsiteCell from "../table-cells/WebsiteCell";
import ContactCell from "../table-cells/ContactCell";
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
  const defaultWidths: Record<string, number> = {
    name: 280,
    type: 200,
    background: 300,
    location: 300,
    website: 200,
    contact: 250,
    aum: 170,
    founded: 150,
    team: 150,
  };

  // Calculate total minimum width and ensure we have valid columns
  const totalMinWidth = (columns || []).reduce((sum, col) => sum + col.minWidth, 0) + 44; // Include checkbox column width
  
  // If no columns provided, don't render anything
  if (!columns || columns.length === 0) {
    return null;
  }

  // Helper function to get column by index with fallback
  const getColumnStyle = (index: number) => {
    const column = columns[index];
    return {
      width: column?.width || defaultWidths[column?.id || ''] || 200,
      minWidth: column?.minWidth || defaultWidths[column?.id || ''] || 200,
    };
  };
  
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
      {columns.map((column, index) => {
        switch (column.id) {
          case 'name':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center gap-2.5 cursor-pointer"
                style={getColumnStyle(index)}
                onClick={onViewCompany}
              >
                <CompanyNameCell
                  companyName={company.firm_name}
                  isFavorite={company.isFavorite || false}
                  onCompanyClick={() => {}}
                  onFavoriteClick={onToggleFavorite}
                />
              </div>
            );
          case 'type':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <CompanyTypeCell type={company.firm_type || company.type || 'N/A'} />
              </div>
            );
          case 'background':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <BackgroundCell background={company.background} />
              </div>
            );
          case 'location':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <LocationCell
                  country={company.country}
                  address={company.address}
                  state={company.state_county}
                />
              </div>
            );
          case 'website':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <WebsiteCell website={company.website} />
              </div>
            );
          case 'contact':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <ContactCell
                  email={company.email}
                  tel={company.tel}
                  fax={company.fax}
                />
              </div>
            );
          case 'aum':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <AumCell aumFormatted={formatAum(company.aum)} />
              </div>
            );
          case 'founded':
            return (
              <div
                key={column.id}
                className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <FoundedYearCell year={company.year_est} />
              </div>
            );
          case 'team':
            return (
              <div
                key={column.id}
                className="px-4 py-3 flex items-center overflow-hidden"
                style={getColumnStyle(index)}
              >
                <TeamCell staffCount={company.total_staff} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default CompanyTableRow;
