import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { FamilyOfficesContactsList } from "@/components/familyofficescontacts";

const FamilyOfficesContacts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");
  const filterId = searchParams.get("filter");

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = perPageParam ? parseInt(perPageParam, 10) : 10;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleItemsPerPageChange = (perPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("perPage", perPage.toString());
    params.set("page", "1"); // Reset to first page when changing items per page
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#FEFEFE] min-w-0 min-h-[900px] overflow-auto">
          <FamilyOfficesContactsList
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            filterId={filterId}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FamilyOfficesContacts;
