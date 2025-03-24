
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import CompaniesList from "@/components/companies/CompaniesList";

const Companies = () => {
  const [activeSection, setActiveSection] = useState<string>("companies");

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
        <main className="flex-1 bg-[#F6F6F7]">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Companies;
