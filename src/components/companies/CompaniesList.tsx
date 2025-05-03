import React, { useState, useEffect } from "react";
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
import { getSavedFilterById } from "@/services/savedFiltersService";
import { useToast } from "@/components/ui/use-toast";

interface CompaniesListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  filterId?: string | null;
}

const CompaniesList = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  filterId,
}: CompaniesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);
  const { columns, updateColumns } = usePersistedColumns();
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFilter = async () => {
      if (filterId) {
        try {
          const filter = await getSavedFilterById(filterId);
          if (filter && filter.type === "company") {
            const isYear = /^\d{4}(-\d+)?$/.test(filter.name);

            const companyFilters = {
              firmTypes: filter.firmTypes || [],
              firmName: filter.companyName || "",
              city: filter.location || "",
              country: "",
              region: "",
              background: filter.responsibilities || "",
              yearEst: isYear ? filter.name.split("-")[0] : "",
              totalStaff: "",
              peMainFirmStrategy: "",
              peGeographicExposure: "",
            };

            onPageChange(1);
            setSelectedFirmTypes(companyFilters.firmTypes);
            setActiveFilters(companyFilters);

            toast({
              title: "Filter Applied",
              description: `Applied "${filter.name}" filter`,
            });

            const currentUrl = new URL(window.location.href);
            const searchParams = new URLSearchParams(currentUrl.search);
            if (searchParams.has("filter")) {
              searchParams.delete("filter");
              navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
                replace: true,
              });
            }
          } else {
            toast({
              title: "Filter Not Found",
              description:
                "The requested filter could not be found or is not applicable to companies",
              variant: "destructive",
            });

            const currentUrl = new URL(window.location.href);
            const searchParams = new URLSearchParams(currentUrl.search);
            if (searchParams.has("filter")) {
              searchParams.delete("filter");
              navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
                replace: true,
              });
            }
          }
        } catch {
          toast({
            title: "Error Loading Filter",
            description: "There was an error loading the filter",
            variant: "destructive",
          });
        }
      }
    };

    loadFilter();
  }, [filterId, toast, navigate, onPageChange]);

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
    setActiveFilters(filters);
  };

  const [activeFilters, setActiveFilters] = useState({
    firmTypes: [],
    firmName: "",
    city: "",
    country: "",
    region: "",
    background: "",
    yearEst: "",
    totalStaff: "",
    peMainFirmStrategy: "",
    peGeographicExposure: "",
  });

  const { companies, isLoading, error, totalPages, totalItems } =
    useCompaniesData(
      currentPage,
      itemsPerPage,
      activeSearchQuery,
      activeFilters,
    );

  const {
    selectedCompanies,
    toggleCompanySelection,
    toggleAllCompanies,
    isCompanySelected,
    toggleFavorite,
  } = useCompanySelection();

  const handleViewCompany = (id: string) => {
    navigate(`/company/${id}`);
  };

  const handleToggleFavorite = (id: string, event: React.MouseEvent) => {
    toggleFavorite(id, event, companies, () => {
      const updatedCompanies = companies.map((company) =>
        company.id === id
          ? { ...company, isFavorite: !company.isFavorite }
          : company,
      );
      if (updatedCompanies.some((c) => c.id === id)) {
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
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
        Companies
      </h1>

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
