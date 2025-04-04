import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import OrdersList from "@/components/orders/OrdersList";

const MyOrders = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#FEFEFE] min-w-0 min-h-[900px] overflow-auto">
          <OrdersList />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MyOrders;
