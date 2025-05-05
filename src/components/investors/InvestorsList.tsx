import React, { useState } from "react";
import { Column } from "./table-parts/InvestorsTableHeader";
import InvestorsSearchBar from "./InvestorsSearchBar";
import InvestorsTable from "./InvestorsTable";
import { useInvestorsData } from "@/hooks/useInvestorsData";
import InvestorsTableSkeleton from "./InvestorsTableSkeleton";
import CompaniesError from "../companies/CompaniesError";
import { useNavigate } from "react-router-dom";
import CustomPagination from "@/components/ui/CustomPagination.tsx";

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

const defaultColumns: Column[] = [
  { id: "name", width: 280, minWidth: 280 },
  { id: "type", width: 200, minWidth: 200 },
  { id: "location", width: 300, minWidth: 300 },
  { id: "aum", width: 170, minWidth: 170 },
  { id: "founded", width: 150, minWidth: 150 },
  { id: "funds", width: 150, minWidth: 150 },
];

const InvestorsList = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: InvestorsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterType>({});
  const [columns] = useState<Column[]>(defaultColumns);
  const navigate = useNavigate();

  const { investors, isLoading, error, totalPages, totalItems } =
    useInvestorsData(currentPage, itemsPerPage, activeSearchQuery, filters);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleView = (id: string) => navigate(`/investorprofile/${id}`);

  return (
    <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
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
        {isLoading ? (
          <InvestorsTableSkeleton />
        ) : error ? (
          <CompaniesError errorMessage={error} />
        ) : (
          <InvestorsTable
            investors={investors}
            columns={columns}
            onViewInvestor={handleView}
          />
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
