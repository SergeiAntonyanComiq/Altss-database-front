import React from "react";
import { CompanyType } from "@/types/company";
import CompaniesTableHeader, {
  Column,
} from "./table-parts/CompaniesTableHeader";
import CompanyTableRow from "./table-parts/CompanyTableRow";
import EmptyState from "../personal/table/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import CompaniesColumnModal from "./CompaniesColumnModal";

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
  columns: Column[];
  onColumnResize: (columns: Column[]) => void;
  onColumnsChange: (columns: Column[]) => void;
  isColumnModalOpen?: boolean;
  onColumnModalClose?: () => void;
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
  isLoading,
  columns,
  onColumnResize,
  onColumnsChange,
  isColumnModalOpen = false,
  onColumnModalClose = () => {},
}: CompaniesTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full">
        <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
          <div className="overflow-x-auto thin-scrollbar">
            <CompaniesTableHeader
              allSelected={false}
              toggleAllCompanies={() => {}}
              columns={columns}
              onColumnResize={onColumnResize}
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

  const allSelected =
    selectedCompanies.length === companies.length && companies.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm w-full">
      <div className="w-full border border-[rgba(223,228,234,1)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto thin-scrollbar">
          <CompaniesTableHeader
            allSelected={allSelected}
            toggleAllCompanies={toggleAllCompanies}
            columns={columns}
            onColumnResize={onColumnResize}
          />

          <div className="w-full">
            {companies.map((company) => (
              <CompanyTableRow
                key={company.id}
                company={company}
                isSelected={isCompanySelected(company.id)}
                onToggleSelection={() =>
                  toggleCompanySelection(company.id || "")
                }
                onViewCompany={() => handleViewCompany(company.id || "")}
                onToggleFavorite={(e) => toggleFavorite(company.id || "", e)}
                columns={columns}
                formatAum={formatAum}
              />
            ))}
          </div>
        </div>
      </div>
      <CompaniesColumnModal
        isOpen={isColumnModalOpen}
        onClose={onColumnModalClose}
        columns={columns}
        onApplyColumns={onColumnsChange}
      />
    </div>
  );
};

export default CompaniesTable;
