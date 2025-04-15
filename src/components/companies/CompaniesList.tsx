import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonsPagination from "@/components/personal/PersonsPagination";
import CompaniesSearchBar from "./CompaniesSearchBar";
import CompaniesTable from "./CompaniesTable";
import { Column } from "./table-parts/CompaniesTableHeader";
import CompaniesTableSkeleton from "./CompaniesTableSkeleton";
import CompaniesError from "./CompaniesError";
import { useCompaniesData } from "@/hooks/useCompaniesData";
import { useCompanySelection } from "./useCompanySelection";
import { formatAum } from "./companyUtils";
import { usePersistedColumns } from "./hooks/usePersistedColumns";

interface CompaniesListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

const defaultColumns: Column[] = [
  { id: 'name', width: 280, minWidth: 280 },
  { id: 'type', width: 200, minWidth: 200 },
  { id: 'background', width: 300, minWidth: 300 },
  { id: 'location', width: 300, minWidth: 300 },
  { id: 'website', width: 200, minWidth: 200 },
  { id: 'contact', width: 250, minWidth: 250 },
  { id: 'aum', width: 170, minWidth: 170 },
  { id: 'founded', width: 150, minWidth: 150 },
  { id: 'team', width: 150, minWidth: 150 },
];

const CompaniesList = ({ 
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: CompaniesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);
  const { columns, updateColumns, resetColumns } = usePersistedColumns();
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  
  const handleFilterChange = (filters: {
    firmTypes: string[];
    firmName: string;
    city: string;
    country: string;
    region: string;
    background: string;
    yearEst: string;
    totalStaff: string;
    peMainFirmStrategy: string;
    peGeographicExposure: string;
  }) => {
    setSelectedFirmTypes(filters.firmTypes);
    // Pass filters to useCompaniesData
    setActiveFilters(filters);
  };

  const [activeFilters, setActiveFilters] = useState<{
    firmTypes: string[];
    firmName: string;
    city: string;
    country: string;
    region: string;
    background: string;
    yearEst: string;
    totalStaff: string;
    peMainFirmStrategy: string;
    peGeographicExposure: string;
  }>({
    firmTypes: [],
    firmName: "",
    city: "",
    country: "",
    region: "",
    background: "",
    yearEst: "",
    totalStaff: "",
    peMainFirmStrategy: "",
    peGeographicExposure: ""
  });

  const { 
    companies, 
    isLoading, 
    error, 
    totalPages,
    totalItems
  } = useCompaniesData(currentPage, itemsPerPage, activeSearchQuery, activeFilters);
  
  const {
    selectedCompanies,
    toggleCompanySelection,
    toggleAllCompanies,
    isCompanySelected,
    toggleFavorite
  } = useCompanySelection();

  const navigate = useNavigate();

  const handleViewCompany = (id: string) => {
    navigate(`/company/${id}`);
  };

  const handleToggleFavorite = (id: string, event: React.MouseEvent) => {
    toggleFavorite(id, event, companies, () => {
      const updatedCompanies = companies.map(company => 
        company.id === id ? { ...company, isFavorite: !company.isFavorite } : company
      );
      // Update the companies array immutably
      if (updatedCompanies.some(c => c.id === id)) {
        // Only update if the company was found
        companies.splice(0, companies.length, ...updatedCompanies);
      }
    });
  };

  const handleColumnResize = (newColumns: Column[]) => {
    updateColumns(newColumns);
  };

  const handleColumnsChange = (newColumns: Column[]) => {
    updateColumns(newColumns);
  };

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">Companies</h1>
      
      {isLoading ? (
        <div className="flex gap-4 items-center mt-10">
          <div className="w-full h-11 bg-gray-100 animate-pulse rounded-full"></div>
        </div>
      ) : (
        <CompaniesSearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={(query) => setActiveSearchQuery(query)}
          selectedFirmTypes={selectedFirmTypes}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          selectedCompanies={selectedCompanies}
          companies={companies}
          toggleFavorite={handleToggleFavorite}
          onColumnsClick={() => setIsColumnModalOpen(true)}
        />
      )}
      
      {isLoading ? (
        <CompaniesTableSkeleton />
      ) : error ? (
        <CompaniesError errorMessage={error} />
      ) : (
        <div className="w-full mt-8">
          <CompaniesTable 
            companies={companies}
            selectedCompanies={selectedCompanies}
            toggleCompanySelection={toggleCompanySelection}
            toggleAllCompanies={() => toggleAllCompanies(companies)}
            handleViewCompany={handleViewCompany}
            toggleFavorite={handleToggleFavorite}
            formatAum={formatAum}
            isCompanySelected={isCompanySelected}
            isLoading={isLoading}
            columns={columns}
            onColumnResize={handleColumnResize}
            onColumnsChange={handleColumnsChange}
            isColumnModalOpen={isColumnModalOpen}
            onColumnModalClose={() => setIsColumnModalOpen(false)}
          />
        </div>
      )}
      
      <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-6">
        <PersonsPagination 
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
};

export default CompaniesList;
