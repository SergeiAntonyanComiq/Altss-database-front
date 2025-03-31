
import React from "react";
import { Building2, Users, ShoppingBag, Heart, ChevronDown, PanelLeft, LogOut, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

// Define a type for menu items that can have either a Lucide icon component or a custom SVG function
type MenuItem = {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }> | (() => React.ReactNode);
};

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

  const menuItems: MenuItem[] = [
    {
      title: "Companies",
      path: "/companies",
      icon: Building2,
    },
    {
      title: "Persons",
      path: "/persons",
      icon: Users,
    },
    {
      title: "My Orders",
      path: "/my-orders",
      icon: ShoppingBag,
    },
    {
      title: "Favorites",
      path: "/favorites",
      icon: Heart,
    },
    {
      title: "Saved Searches",
      path: "/saved-searches",
      icon: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
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
              <img 
                src="/lovable-uploads/f0e39660-fbf7-43b0-a89f-e3a346681785.png" 
                alt="Altss Logo" 
                className="h-10"
              />
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
                  {typeof item.icon === 'function' ? 
                    item.icon() : 
                    <item.icon className="h-5 w-5 mr-3" />
                  }
                  <span className={typeof item.icon === 'function' ? "ml-3" : ""}>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto p-6 border-t border-[#F1F0FB]">
          <div className="flex flex-col gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-md transition-colors"
              onClick={() => handleNavigation("/profile")}
            >
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
