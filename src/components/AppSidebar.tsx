
import React from "react";
import { LogOut, ChevronRight } from "lucide-react";
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
  SidebarSeparator,
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
      path: "/companies",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/ddb46b8f5e3677e41421100e12cb4f99fefdcce6",
      hasRightIcon: false
    },
    {
      title: "Persons",
      path: "/persons",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/94865fa92bf7a1022c9d340f97476cfd56b8e6d4",
      hasRightIcon: false
    },
    {
      title: "My Orders",
      path: "/my-orders",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/cb551c4c9f44d0939c54de446551512a630f1b13",
      hasRightIcon: false
    },
    {
      title: "Favorites",
      path: "/favorites",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/31a6ca2e49aa013c782f793e48805961b525cc26",
      hasRightIcon: true
    },
    {
      title: "Saved Searches",
      path: "/saved-searches",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f69faa278a069ce4b2090e224b9110b1e63802ea",
      hasRightIcon: true
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
      <Sidebar className="border-r border-[#DFE4EA] bg-white transition-all duration-300 ease-in-out">
        <SidebarHeader className="pt-4 pb-3">
          <div className="flex w-full items-center justify-between px-6">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/bc40263e-ec64-44a5-b196-4642d02eba58.png"
                alt="Altss Logo" 
                className="h-10 w-auto object-contain rounded-md"
              />
            </div>
            <SidebarTrigger className="text-[#637381] w-6 h-6 hover:bg-gray-100 rounded transition-colors" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-4 mt-10">
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.title}>
                {index === 3 && <SidebarSeparator className="my-2 bg-[#DFE4EA]" />}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    data-active={isActive(item.path)}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center justify-between text-[#637381] hover:bg-gray-100 hover:text-gray-800 text-[15px] py-3 px-4 rounded-md transition-all duration-200 ${
                      isActive(item.path) 
                        ? "bg-[#3758F9] text-white font-medium" 
                        : "font-medium"
                    }`}
                  >
                    <div className="flex items-center">
                      <img 
                        src={item.iconSrc} 
                        alt={item.title} 
                        className={`h-6 w-6 mr-3 object-contain ${isActive(item.path) ? "filter brightness-0 invert" : ""}`}
                      />
                      <span>{item.title}</span>
                    </div>
                    {item.hasRightIcon && (
                      <ChevronRight className={`h-5 w-5 ${isActive(item.path) ? "text-white" : "text-[#637381]"} ${isActive(item.path) ? "" : "rotate-90"} transition-transform duration-200`} />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto p-6 border-t border-[#DFE4EA]">
          <div className="flex flex-col gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
              onClick={() => handleNavigation("/profile")}
            >
              <Avatar>
                <AvatarImage 
                  src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/635dde9f8ef84a19da3d5dd766f2e72d108bd70c" 
                  alt="User Profile"
                  className="rounded-full" 
                />
                <AvatarFallback className="bg-[#3758F9] text-white">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <span className="text-[#637381] text-base font-medium truncate max-w-[120px]">
                {user?.email || "User Name"}
              </span>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-start text-[#637381] hover:bg-gray-100 hover:text-gray-700 text-[15px] px-4 h-10 w-full border-gray-200 transition-colors"
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
          <SidebarTrigger className="bg-white shadow-md rounded-md p-1.5 hover:bg-gray-100 transition-colors" />
        </div>
      )}
    </>
  );
};

export default AppSidebar;
