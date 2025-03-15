
import React, { useState } from "react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarInset
} from "@/components/ui/sidebar";
import PersonsList from "@/components/personal/PersonsList";
import { Building, Heart, User, ShoppingCart, Search } from "lucide-react";

const PersonalCabinet = () => {
  const [activeSection, setActiveSection] = useState<string>("persons");

  const renderContent = () => {
    switch (activeSection) {
      case "persons":
        return <PersonsList />;
      case "companies":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Companies</h2></div>;
      case "orders":
        return <div className="p-6"><h2 className="text-2xl font-semibold">My Orders</h2></div>;
      case "favorites":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Favorites</h2></div>;
      case "saved":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Saved Searches</h2></div>;
      default:
        return <PersonsList />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <Sidebar>
          <div className="flex items-center justify-center p-4 bg-[#9b87f5] text-white font-bold text-2xl h-14">
            Alt
          </div>
          <SidebarContent className="bg-[#1A1F2C] text-white h-full">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "companies"}
                  onClick={() => setActiveSection("companies")}
                  className={`${activeSection === "companies" ? "bg-[#6E59A5] text-white" : "hover:bg-[#2A2F3C] text-[#8E9196]"}`}
                >
                  <Building className="h-5 w-5" />
                  <span>Companies</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "persons"}
                  onClick={() => setActiveSection("persons")}
                  className={`${activeSection === "persons" ? "bg-[#6E59A5] text-white" : "hover:bg-[#2A2F3C] text-[#8E9196]"}`}
                >
                  <User className="h-5 w-5" />
                  <span>Persons</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "orders"}
                  onClick={() => setActiveSection("orders")}
                  className={`${activeSection === "orders" ? "bg-[#6E59A5] text-white" : "hover:bg-[#2A2F3C] text-[#8E9196]"}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>My Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "favorites"}
                  onClick={() => setActiveSection("favorites")}
                  className={`${activeSection === "favorites" ? "bg-[#6E59A5] text-white" : "hover:bg-[#2A2F3C] text-[#8E9196]"}`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "saved"}
                  onClick={() => setActiveSection("saved")}
                  className={`${activeSection === "saved" ? "bg-[#6E59A5] text-white" : "hover:bg-[#2A2F3C] text-[#8E9196]"}`}
                >
                  <Search className="h-5 w-5" />
                  <span>Saved Searches</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-4 border-t border-[#2A2F3C] bg-[#1A1F2C] flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img src="/lovable-uploads/21ab7830-17e7-4b33-a70a-dfdbd7546c29.png" alt="" className="h-8 w-8 object-cover" />
            </div>
            <span className="text-sm font-medium text-white">User Name</span>
          </div>
        </Sidebar>
        <SidebarInset className="bg-[#F6F6F7]">
          {renderContent()}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PersonalCabinet;
