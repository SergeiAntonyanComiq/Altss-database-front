
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import UnderConstruction from "@/components/UnderConstruction";

const MyOrders = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7]">
          <UnderConstruction />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MyOrders;
