
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import CompaniesList from "@/components/companies/CompaniesList";

const Companies = () => {
  const [activeSection, setActiveSection] = useState<string>("companies");
  const location = useLocation();
  const navigate = useNavigate();

  // Parse the current page, items per page, and filter from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const section = searchParams.get('section');
  const filterId = searchParams.get('filter');
  
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = perPageParam ? parseInt(perPageParam, 10) : 10;
  
  // Debug log for filter ID
  React.useEffect(() => {
    if (filterId) {
      console.log('FILTER DEBUG - Companies - Filter ID from URL:', filterId);
    }
  }, [filterId]);

  // Update URL when page or items per page changes
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleItemsPerPageChange = (perPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set('perPage', perPage.toString());
    params.set('page', '1'); // Reset to first page when changing items per page
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#FEFEFE] min-w-0 min-h-[900px] overflow-auto">
          <CompaniesList 
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

export default Companies;
