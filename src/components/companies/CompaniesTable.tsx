
import React from "react";
import { CompanyType } from "@/types/company";
import CompaniesTableHeader from "./table-parts/CompaniesTableHeader";
import CompanyTableRow from "./table-parts/CompanyTableRow";
import { useTableColumnSizes } from "./hooks/useTableColumnSizes";
import EmptyState from "../personal/table/EmptyState";

interface CompaniesTableProps {
  companies: CompanyType[];
  selectedCompanies: string[];
  toggleCompanySelection: (id: string) => void;
  toggleAllCompanies: () => void;
  handleViewCompany: (id: string) => void;
  toggleFavorite: (id: string, event: React.MouseEvent) => void;
  formatAum: (aumValue: number | string | undefined | null) => string;
  isCompanySelected: (id: string | undefined) => boolean;
  isLoading: boolean;
}

const CompaniesTable = ({
  companies,
  selectedCompanies,
  toggleCompanySelection,
  toggleAllCompanies,
  handleViewCompany,
  toggleFavorite,
  formatAum,
  isCompanySelected,
  isLoading
}: CompaniesTableProps) => {
  const { columnSizes, handleResize } = useTableColumnSizes();

  if (companies.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  const allSelected = selectedCompanies.length === companies.length && companies.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
      <div className="table-container w-full">
        {/* Table Header */}
        <CompaniesTableHeader
          allSelected={allSelected}
          toggleAllCompanies={toggleAllCompanies}
          columnSizes={columnSizes}
          handleResize={handleResize}
        />
        
        {/* Table Rows */}
        <div className="divide-y divide-[#DFE4EA] w-full">
          {companies.map((company) => (
            <CompanyTableRow
              key={company.id}
              company={company}
              isSelected={isCompanySelected(company.id)}
              onToggleSelection={() => toggleCompanySelection(company.id || '')}
              onViewCompany={() => handleViewCompany(company.id || '')}
              onToggleFavorite={(e) => toggleFavorite(company.id || '', e)}
              columnSizes={columnSizes}
              formatAum={formatAum}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;
