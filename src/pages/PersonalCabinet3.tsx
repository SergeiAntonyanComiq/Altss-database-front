
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ContactsList from "@/components/contacts/ContactsList";
import PersonsList2 from "@/components/personal/PersonsList2";

const PersonalCabinet3 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse the current page and items per page from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const sectionParam = searchParams.get('section');
  
  const [activeSection, setActiveSection] = useState<string>(sectionParam || "persons");
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageParam ? parseInt(perPageParam, 10) : 10);

  // Update URL when page, items per page, or section changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('perPage', itemsPerPage.toString());
    params.set('section', activeSection);
    navigate(`${location.pathname}?${params.toString()}`);
  }, [currentPage, itemsPerPage, activeSection, navigate, location.pathname]);

  // Handle page change from child components
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change from child components
  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle section change
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setCurrentPage(1); // Reset to first page when changing sections
  };

  const renderContent = () => {
    switch (activeSection) {
      case "contacts":
        return <ContactsList />;
      case "persons":
      default:
        return (
          <PersonsList2 />
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PersonalCabinet3;
