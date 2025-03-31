
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
  const section = searchParams.get('section') || "persons"; // Default to persons
  
  const [activeSection, setActiveSection] = useState<string>(section);
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = perPageParam ? parseInt(perPageParam, 10) : 10;

  // Update the activeSection when the URL parameter changes
  useEffect(() => {
    setActiveSection(section);
  }, [section]);

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

  // Handle section change
  const handleSectionChange = (newSection: string) => {
    const params = new URLSearchParams(location.search);
    params.set('section', newSection);
    params.set('page', '1'); // Reset to first page on section change
    navigate(`${location.pathname}?${params.toString()}`);
    setActiveSection(newSection);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "contacts":
        return <ContactsList />;
      case "persons":
      default:
        return <PersonsList2 />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] overflow-auto">
          {/* Section tabs */}
          <div className="border-b px-6 py-3 bg-white">
            <div className="flex space-x-6">
              <button
                onClick={() => handleSectionChange("persons")}
                className={`pb-2 text-sm font-medium ${
                  activeSection === "persons" 
                    ? "border-b-2 border-blue-500 text-blue-600" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Persons
              </button>
              <button
                onClick={() => handleSectionChange("contacts")}
                className={`pb-2 text-sm font-medium ${
                  activeSection === "contacts" 
                    ? "border-b-2 border-blue-500 text-blue-600" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
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
