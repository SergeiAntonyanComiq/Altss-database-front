import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ContactsList from "@/components/contacts/ContactsList";
import PersonsList from "@/components/personal/PersonsList.tsx";
import { Toaster } from "@/components/ui/toaster";

const PersonalCabinet3 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");
  const section = searchParams.get("section");

  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam, 10) : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    perPageParam ? parseInt(perPageParam, 10) : 10
  );
  const [activeSection, setActiveSection] = useState<string>(
    section || "persons"
  );

  // Состояния для всех параметров фильтра
  const [selectedFirmTypes, setSelectedFirmTypes] = useState<string[]>([]);
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [responsibilitiesFilter, setResponsibilitiesFilter] = useState("");
  const [bioFilter, setBioFilter] = useState("");

  // Filter change handler
  const handleFilterChange = useCallback(
    (filters: {
      firmTypes: string[];
      companyName: string;
      position: string;
      location: string;
      responsibilities: string;
      bio: string;
    }) => {
      // Обновляем все параметры фильтра
      setSelectedFirmTypes(filters.firmTypes);
      setCompanyNameFilter(filters.companyName);
      setPositionFilter(filters.position);
      setLocationFilter(filters.location);
      setResponsibilitiesFilter(filters.responsibilities);
      setBioFilter(filters.bio);

      // Clear filter param from URL if we're just changing filters directly
      const params = new URLSearchParams(location.search);
      if (params.has("filter")) {
        params.delete("filter");
        navigate(`${location.pathname}?${params.toString()}`, {
          replace: true,
        });
      }
    },
    [location.pathname, location.search, navigate]
  );

  // Update URL when page or items per page changes - using useCallback to prevent unnecessary re-renders
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const params = new URLSearchParams(location.search);
      params.set("page", page.toString());
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    },
    [location.pathname, location.search, navigate]
  );

  const handleItemsPerPageChange = useCallback(
    (perPage: number) => {
      setItemsPerPage(perPage);
      // Reset to first page when changing items per page
      setCurrentPage(1);
      const params = new URLSearchParams(location.search);
      params.set("perPage", perPage.toString());
      params.set("page", "1");
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    },
    [location.pathname, location.search, navigate]
  );

  useEffect(() => {
    const loadFilter = async () => {};

    (async () => {
      await loadFilter();
    })();
  }, []);

  // Keep URL and state in sync - using proper dependency array
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    const newPageParam = newSearchParams.get("page");
    const newPerPageParam = newSearchParams.get("perPage");
    const newSection = newSearchParams.get("section");

    if (newPageParam && parseInt(newPageParam, 10) !== currentPage) {
      setCurrentPage(parseInt(newPageParam, 10));
    }

    if (newPerPageParam && parseInt(newPerPageParam, 10) !== itemsPerPage) {
      setItemsPerPage(parseInt(newPerPageParam, 10));
    }

    if (newSection && newSection !== activeSection) {
      setActiveSection(newSection);
    }
  }, [location.search, currentPage, itemsPerPage, activeSection]);

  const renderContent = useCallback(() => {
    // Use the section from URL or fallback to activeSection state
    const currentSection = section || activeSection;

    switch (currentSection) {
      case "contacts":
        return <ContactsList />;
      case "persons":
      default:
        return (
          <PersonsList
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            selectedFirmTypes={selectedFirmTypes}
            onFilterChange={handleFilterChange}
            companyNameFilter={companyNameFilter}
            positionFilter={positionFilter}
            locationFilter={locationFilter}
            responsibilitiesFilter={responsibilitiesFilter}
            bioFilter={bioFilter}
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
    handleFilterChange,
    companyNameFilter,
    positionFilter,
    locationFilter,
    responsibilitiesFilter,
    bioFilter,
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
