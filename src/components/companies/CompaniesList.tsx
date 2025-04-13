import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonsPagination from "@/components/personal/PersonsPagination";
import CompaniesSearchBar from "./CompaniesSearchBar";
import CompaniesTable from "./CompaniesTable";
import CompaniesTableSkeleton from "./CompaniesTableSkeleton";
import CompaniesError from "./CompaniesError";
import { useCompaniesData } from "@/hooks/useCompaniesData";
import { useCompanySelection } from "./useCompanySelection";
import { formatAum } from "./companyUtils";

interface CompaniesListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

const CompaniesList = ({ 
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: CompaniesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { 
    companies, 
    isLoading, 
    error, 
    totalPages,
    totalItems
  } = useCompaniesData(currentPage, itemsPerPage);
  
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
    // Using the toggleFavorite from useCompanySelection
    toggleFavorite(id, event, companies, () => {
      // We need to modify the state from the hook instead
      companies.forEach(company => {
        if (company.id === id) {
          company.isFavorite = !company.isFavorite;
        }
      });
    });
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
