import React, { useState } from "react";
import { Column } from "./table-parts/InvestorsTableHeader";
import InvestorsSearchBar from "./InvestorsSearchBar";
import InvestorsTable from "./InvestorsTable";
import { useInvestorsData } from "@/hooks/useInvestorsData";
import PersonsPagination from "@/components/personal/PersonsPagination";
import InvestorsTableSkeleton from "./InvestorsTableSkeleton";
import CompaniesError from "../companies/CompaniesError";
import { useNavigate } from "react-router-dom";

interface InvestorsListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

const defaultColumns: Column[] = [
  { id: "name" as any, width: 280, minWidth: 280 },
  { id: "type" as any, width: 200, minWidth: 200 },
  { id: "location" as any, width: 300, minWidth: 300 },
  { id: "aum" as any, width: 170, minWidth: 170 },
  { id: "founded" as any, width: 150, minWidth: 150 },
  { id: "funds" as any, width: 150, minWidth: 150 },
];

const InvestorsList = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: InvestorsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [columns] = useState<Column[]>(defaultColumns);
  const navigate = useNavigate();

  const { investors, isLoading, error, totalPages, totalItems } = useInvestorsData(
    currentPage,
    itemsPerPage,
    activeSearchQuery,
    filters as any
  );

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleView = (id: string) => navigate(`/investorprofile/${id}`);

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">Investors</h1>
      <InvestorsSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={(q) => setActiveSearchQuery(q)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      {isLoading ? (
        <InvestorsTableSkeleton />
      ) : error ? (
        <CompaniesError errorMessage={error} />
      ) : (
        <div className="w-full mt-8">
          <InvestorsTable investors={investors} columns={columns} onViewInvestor={handleView} />
        </div>
      )}
      <PersonsPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        totalItems={totalItems}
        disabled={isLoading}
      />
    </div>
  );
};

export default InvestorsList; 