import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ContactsList from "@/components/contacts/ContactsList";
import PersonsList2 from "@/components/personal/PersonsList2";
import { Toaster } from "@/components/ui/toaster";
import { getSavedFilterById } from "@/services/savedFiltersService";
import { useToast } from "@/components/ui/use-toast";

const PersonalCabinet3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parse the current page and items per page from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const section = searchParams.get('section');
  const filterId = searchParams.get('filter');
  
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageParam ? parseInt(perPageParam, 10) : 10);
  const [activeSection, setActiveSection] = useState<string>(section || "persons");
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);

  // Load filter if filter ID is provided in URL
  useEffect(() => {
    if (filterId) {
      const filter = getSavedFilterById(filterId);
      if (filter) {
        setSelectedFirmTypes(filter.firmTypes);
        toast({
          title: "Filter Applied",
          description: `Applied "${filter.name}" filter`,
        });
      }
    }
  }, [filterId, toast]);

  // Update URL when page or items per page changes - using useCallback to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [location.pathname, location.search, navigate]);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    setItemsPerPage(perPage);
    // Reset to first page when changing items per page
    setCurrentPage(1); 
    const params = new URLSearchParams(location.search);
    params.set('perPage', perPage.toString());
    params.set('page', '1');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [location.pathname, location.search, navigate]);

  // Filter change handler
  const handleFilterChange = useCallback((firmTypes: string[]) => {
    setSelectedFirmTypes(firmTypes);
  }, []);

  // Keep URL and state in sync - using proper dependency array
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    const newPageParam = newSearchParams.get('page');
    const newPerPageParam = newSearchParams.get('perPage');
    const newSection = newSearchParams.get('section');
    
    if (newPageParam && parseInt(newPageParam, 10) !== currentPage) {
      setCurrentPage(parseInt(newPageParam, 10));
    }
    
    if (newPerPageParam && parseInt(newPerPageParam, 10) !== itemsPerPage) {
      setItemsPerPage(parseInt(newPerPageParam, 10));
    }
    
    if (newSection && newSection !== activeSection) {
      setActiveSection(newSection);
    }
  }, [location.search]);

  const renderContent = useCallback(() => {
    // Use the section from URL or fallback to activeSection state
    const currentSection = section || activeSection;
    
    switch (currentSection) {
      case "contacts":
        return <ContactsList />;
      case "persons":
      default:
        return (
          <PersonsList2 
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            selectedFirmTypes={selectedFirmTypes}
            onFilterChange={handleFilterChange}
          />
        );
    }
  }, [
    section, 
    activeSection, 
    currentPage, 
    itemsPerPage, 
    handlePageChange, 
    handleItemsPerPageChange,
    selectedFirmTypes,
    handleFilterChange
  ]);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#FEFEFE] min-w-0 min-h-[900px] overflow-auto">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default PersonalCabinet3;
