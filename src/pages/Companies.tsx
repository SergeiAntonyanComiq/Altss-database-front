
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import CompaniesList from "@/components/companies/CompaniesList";

const Companies = () => {
  const [activeSection, setActiveSection] = useState<string>("companies");
  const location = useLocation();
  const navigate = useNavigate();

  // Parse the current page from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    // If page parameter exists but isn't being used yet, we'll handle it in the CompaniesList component
  }, [location]);

  const renderContent = () => {
    switch (activeSection) {
      case "companies":
        return <CompaniesList />;
      default:
        return <CompaniesList />;
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

export default Companies;
