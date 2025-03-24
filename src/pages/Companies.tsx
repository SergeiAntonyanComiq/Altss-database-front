
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import CompaniesList from "@/components/companies/CompaniesList";

const Companies = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7]">
          <CompaniesList />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Companies;
