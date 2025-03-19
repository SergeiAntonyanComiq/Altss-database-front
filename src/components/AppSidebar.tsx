import React from "react";
import { Building2, Users, ShoppingBag, Heart, Search, ChevronDown, PanelLeft, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { state } = useSidebar();
  const { toast } = useToast();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      title: "Companies",
      path: "/cabinet",
      icon: Building2,
    },
    {
      title: "Persons",
      path: "/cabinet2",
      icon: Users,
    },
    {
      title: "My Orders",
      path: "/cabinet3",
      icon: ShoppingBag,
    },
    {
      title: "Favorites",
      path: "/cabinet3?section=favorites",
      icon: Heart,
      hasDropdown: true,
    },
    {
      title: "Saved Searches",
      path: "/cabinet3?section=saved",
      icon: Search,
      hasDropdown: true,
    },
  ];

  const getUserInitials = () => {
    if (!user) return "UN";
    
    const email = user.email || "";
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "UN";
  };

  return (
    <>
      <Sidebar className="border-r border-[#F1F0FB]">
        <SidebarHeader className="pt-6 pb-4">
          <div className="flex justify-between items-center px-6">
            <div className="flex items-center">
              <div className="bg-[#2546F3] text-white font-bold text-sm h-10 w-10 rounded flex items-center justify-center">
                Altss
              </div>
            </div>
            <SidebarTrigger className="text-gray-400" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-1">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  data-active={isActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 text-[15px] px-6 ${
                    isActive(item.path) ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.title}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto p-6 border-t border-[#F1F0FB]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/lovable-uploads/21ab7830-17e7-4b33-a70a-dfdbd7546c29.png" alt="User Profile" />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <span className="text-gray-700 text-sm truncate max-w-[120px]">
                {user?.email || "User"}
              </span>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-start text-gray-500 hover:bg-blue-50 hover:text-blue-600 text-[15px] px-4 h-10 w-full border-gray-200"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Log Out</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      {state === "collapsed" && (
        <div className="fixed top-6 left-3 z-50 md:flex">
          <SidebarTrigger className="bg-white shadow-md rounded-md p-1.5 hover:bg-gray-100" />
        </div>
      )}
    </>
  );
};

export default AppSidebar;
