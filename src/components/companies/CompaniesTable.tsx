import React, { useCallback, useState } from "react";
import { CompanyType } from "@/types/company";
import CompaniesTableHeader, { Column } from "./table-parts/CompaniesTableHeader";
import CompanyTableRow from "./table-parts/CompanyTableRow";
import EmptyState from "../personal/table/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

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

const CompaniesTable: React.FC<CompaniesTableProps> = ({
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
  const [columns, setColumns] = useState<Column[]>([
    { id: 'name', width: 280, minWidth: 280 },
    { id: 'type', width: 300, minWidth: 300 },
    { id: 'aum', width: 170, minWidth: 170 },
    { id: 'founded', width: 250, minWidth: 250 },
    { id: 'team', width: 170, minWidth: 150 },
  ]);

  const handleColumnResize = useCallback((newColumns: Column[]) => {
    setColumns(newColumns);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full">
        <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <CompaniesTableHeader
              allSelected={false} 
              toggleAllCompanies={() => {}}
              columns={columns}
              onColumnResize={handleColumnResize}
            />
            <div className="space-y-1 p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (companies.length === 0) {
    return <EmptyState />;
  }

  const allSelected = selectedCompanies.length === companies.length && companies.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm w-full">
      <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <CompaniesTableHeader
            allSelected={allSelected}
            toggleAllCompanies={toggleAllCompanies}
            columns={columns}
            onColumnResize={handleColumnResize}
          />
          
          <div className="w-full">
            {companies.map((company) => (
              <CompanyTableRow
                key={company.id}
                company={company}
                isSelected={isCompanySelected(company.id)}
                onToggleSelection={() => toggleCompanySelection(company.id || '')}
                onViewCompany={() => handleViewCompany(company.id || '')}
                onToggleFavorite={(e) => toggleFavorite(company.id || '', e)}
                columns={columns}
                formatAum={formatAum}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;
