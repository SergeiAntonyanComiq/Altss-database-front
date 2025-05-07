import React, { useState } from "react";
import InvestorsSearchBar from "./InvestorsSearchBar";
import { useInvestorsData } from "@/hooks/useInvestorsData";
import InvestorsTableSkeleton from "./InvestorsTableSkeleton";
import CompaniesError from "../companies/CompaniesError";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { DataTable } from "@/components/ui/DataTable.tsx";
import { investorsColumns } from "@/components/columns-bucket";
import { Loading } from "@/utils.tsx";

interface InvestorsListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

type FilterType = {
  firmTypes?: string[];
  companyName?: string;
  position?: string;
  location?: string;
  responsibilities?: string;
  bio?: string;
};

const InvestorsList = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: InvestorsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterType>({});

  const { investors, isLoading, error, totalPages, totalItems } =
    useInvestorsData(currentPage, itemsPerPage, activeSearchQuery, filters);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
      <Loading show={isLoading} />
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
        Investors
      </h1>

      <InvestorsSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={(q) => setActiveSearchQuery(q)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="flex-grow mt-8">
        {error ? (
          <CompaniesError errorMessage={error} />
        ) : (
          <div>
            <DataTable columns={investorsColumns()} data={investors} />
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

export default InvestorsList;
