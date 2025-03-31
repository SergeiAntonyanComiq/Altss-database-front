
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
  const section = searchParams.get('section') || "persons";
  
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageParam ? parseInt(perPageParam, 10) : 10);
  const [activeSection, setActiveSection] = useState<string>(section);

  // Update URL when page or items per page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    const params = new URLSearchParams(location.search);
    params.set('perPage', perPage.toString());
    params.set('page', '1');
    navigate(`${location.pathname}?${params.toString()}`);
  };

  // Change section (persons/contacts)
  const handleSectionChange = (newSection: string) => {
    setActiveSection(newSection);
    const params = new URLSearchParams(location.search);
    params.set('section', newSection);
    params.set('page', '1');
    navigate(`${location.pathname}?${params.toString()}`);
  };

  // Keep URL and state in sync
  useEffect(() => {
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
    if (perPageParam) {
      setItemsPerPage(parseInt(perPageParam, 10));
    }
    if (section) {
      setActiveSection(section);
    }
  }, [pageParam, perPageParam, section]);

  const renderContent = () => {
    switch (activeSection) {
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
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#FEFEFE] min-w-0 min-h-[900px] overflow-auto">
          <div className="px-6 pt-6">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => handleSectionChange("persons")}
                className={`pb-2 px-1 ${activeSection === "persons" ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-600"}`}
              >
                Persons
              </button>
              <button
                onClick={() => handleSectionChange("contacts")}
                className={`pb-2 px-1 ${activeSection === "contacts" ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-600"}`}
              >
                Contacts
              </button>
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PersonalCabinet3;
