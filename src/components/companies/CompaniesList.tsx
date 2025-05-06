import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompaniesSearchBar from "./CompaniesSearchBar";
import CompaniesTableSkeleton from "./CompaniesTableSkeleton";
import CompaniesError from "./CompaniesError";
import { useCompaniesData } from "@/hooks/useCompaniesData";
import { useCompanySelection } from "./useCompanySelection";
import { getSavedFilterById } from "@/services/savedFiltersService";
import { useToast } from "@/components/ui/use-toast";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { DataTable } from "@/components/ui/DataTable.tsx";
import { companiesColumns } from "@/components/columns-bucket";

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

  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const { toast } = useToast();
  const navigate = useNavigate();

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

  useEffect(() => {
    const loadFilter = async () => {
      if (!filterId) return;
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
        } else {
          toast({
            title: "Filter Not Found",
            description:
              "The requested filter could not be found or is not applicable to companies",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Error Loading Filter",
          description: "There was an error loading the filter",
          variant: "destructive",
        });
      }

      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      if (searchParams.has("filter")) {
        searchParams.delete("filter");
        navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
          replace: true,
        });
      }
    };

    loadFilter();
  }, [filterId, toast, navigate, onPageChange]);

  const handleFilterChange = (filters: typeof activeFilters) => {
    setSelectedFirmTypes(filters.firmTypes);
    setActiveFilters(filters);
  };

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
    toggleFavorite,
  } = useCompanySelection();

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

    toggleFavorite(id, companies, () => {
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

  useEffect(() => {
    if (companies) {
      const initialFavorites: Record<number, boolean> = {};
      companies.forEach((fo) => {
        initialFavorites[fo.id] = fo.isFavorite;
      });

      setFavorites(initialFavorites);
    }
  }, [companies]);

  return (
    <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
        Companies
      </h1>

      <div className="mt-6">
        <CompaniesSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={(query) => setActiveSearchQuery(query)}
          selectedFirmTypes={selectedFirmTypes}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          selectedCompanies={selectedCompanies}
          companies={companies}
        />
      </div>

      <div className="flex-grow mt-8">
        {isLoading ? (
          <CompaniesTableSkeleton />
        ) : error ? (
          <CompaniesError errorMessage={error} />
        ) : (
          <div>
            <DataTable
              columns={companiesColumns(
                favorites,
                handleToggleFavorite,
                toggleAllCompanies,
                toggleCompanySelection,
              )}
              data={companies}
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <CustomPagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          totalItems={totalItems}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default CompaniesList;
