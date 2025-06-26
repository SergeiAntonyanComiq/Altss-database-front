import React, { useState } from "react";
import { useDebounce } from "@/hooks";
import { DataTable } from "@/components/ui/DataTable";
import CustomPagination from "@/components/ui/CustomPagination";
import { SearchInput } from "@/components/ui/search-input"; // same one used in toolbar
import { Loading } from "@/utils";
import { useUsersData } from "@/hooks/useUsersData.ts";
import { getUserColumns } from "@/components/columns-bucket/userColumns.ts";
import AppSidebar from "@/components/AppSidebar.tsx";

import { SidebarProvider } from "@/components/ui/sidebar.tsx";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    users,
    isLoading,
    error,
    totalPages,
    handleStatusChange,
    handlePlanChange,
  } = useUsersData(currentPage, itemsPerPage, debouncedSearch);

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

              <div className="mb-8 flex gap-4 items-center flex-wrap">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by User Name or Email"
                />
              </div>

              {error ? (
                <div className="text-red-500 mt-8">{error}</div>
              ) : (
                <div className="w-full mt-8 mb-8 overflow-x-auto">
                  <DataTable
                    columns={getUserColumns(
                      handleStatusChange,
                      handlePlanChange
                    )}
                    data={users}
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              <CustomPagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Users;
