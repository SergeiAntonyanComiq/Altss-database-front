import React, { useState, useEffect } from "react";
import { useDebounce } from "@/hooks";
import { DataTable } from "@/components/ui/DataTable";
import CustomPagination from "@/components/ui/CustomPagination";
import { SearchInput } from "@/components/ui/search-input";
import { Loading } from "@/utils";
import AppSidebar from "@/components/AppSidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { useIntegrationData } from "@/hooks/useIntegrationData";
import { integrationColumns } from "@/components/columns-bucket/IntegrationColumns";
import { deleteIntegrationOfficeById } from "@/services/integrationService";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Integration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = perPageParam ? parseInt(perPageParam, 10) : 10;
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { offices, isLoading, error, totalPages } = useIntegrationData(
    currentPage,
    itemsPerPage,
    debouncedSearch
  );

  const handleDelete = (id: string) => deleteIntegrationOfficeById(id);

  const updateUrl = (page: number, perPage: number) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", page.toString());
    queryParams.set("perPage", perPage.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const handlePageChange = (page: number) => {
    updateUrl(page, itemsPerPage);
  };

  const handleItemsPerPageChange = (perPage: number) => {
    updateUrl(1, perPage); // Reset to first page when changing items per page
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#FEFEFE] min-w-0 min-h-[900px] overflow-auto">
          <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
            <Loading show={isLoading} />
            <div className="flex-grow">
              <h1 className="text-[#111928] text-2xl font-semibold mb-10">
                Users
              </h1>

              <div className="mb-8 flex gap-4 items-center justify-between flex-wrap">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by Office Name"
                />
                <Button onClick={() => navigate("/integration/new")}>
                  Add New
                </Button>
              </div>

              {error ? (
                <div className="text-red-500 mt-8">{error}</div>
              ) : (
                <div className="w-full mt-8 mb-8 overflow-x-auto">
                  <DataTable
                    columns={integrationColumns(handleDelete)}
                    data={offices}
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              <CustomPagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Integration;
