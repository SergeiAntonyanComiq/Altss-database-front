
import React, { useState } from "react";
import { Building2, Users, ShoppingBag, Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";
import PersonsList from "@/components/personal/PersonsList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const PersonalCabinet = () => {
  const [activeSection, setActiveSection] = useState<string>("persons");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <SidebarProvider defaultOpen={!sidebarCollapsed}>
      <div className="flex w-full min-h-screen bg-background">
        <Sidebar 
          className="bg-[#1A1F2C] text-white border-r border-[#2A2F3C]"
          collapsible={sidebarCollapsed ? "icon" : "none"}
        >
          <SidebarHeader className="flex flex-col relative">
            <div className="flex items-center justify-between p-4">
              <div className="bg-[#9b87f5] text-white font-bold text-xl p-2 w-12 h-12 flex items-center justify-center rounded">
                Alt
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#8E9196] hover:bg-[#2A2F3C] h-8 w-8 absolute right-2 top-4"
                onClick={toggleSidebar}
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("companies")}
                  isActive={activeSection === "companies"}
                  tooltip="Companies"
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                    activeSection === "companies"
                      ? "bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                      : "text-[#8E9196] hover:bg-[#2A2F3C]"
                  }`}
                >
                  <Building2 className="h-5 w-5" />
                  <span>Companies</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("persons")}
                  isActive={activeSection === "persons"}
                  tooltip="Persons"
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                    activeSection === "persons"
                      ? "bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                      : "text-[#8E9196] hover:bg-[#2A2F3C]"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Persons</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("orders")}
                  isActive={activeSection === "orders"}
                  tooltip="My Orders"
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                    activeSection === "orders"
                      ? "bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                      : "text-[#8E9196] hover:bg-[#2A2F3C]"
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>My Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("favorites")}
                  isActive={activeSection === "favorites"}
                  tooltip="Favorites"
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                    activeSection === "favorites"
                      ? "bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                      : "text-[#8E9196] hover:bg-[#2A2F3C]"
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("saved")}
                  isActive={activeSection === "saved"}
                  tooltip="Saved Searches"
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                    activeSection === "saved"
                      ? "bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                      : "text-[#8E9196] hover:bg-[#2A2F3C]"
                  }`}
                >
                  <Search className="h-5 w-5" />
                  <span>Saved Searches</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="mt-auto border-t border-[#2A2F3C]">
            <div className="flex items-center gap-3 p-4">
              <Avatar>
                <AvatarImage src="/lovable-uploads/21ab7830-17e7-4b33-a70a-dfdbd7546c29.png" alt="User Profile" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <span className="text-white text-sm">User Name</span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 bg-[#F6F6F7]">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PersonalCabinet;
