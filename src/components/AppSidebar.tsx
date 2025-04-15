import React, { useEffect, useState } from "react";
import { LogOut, ChevronRight, ChevronDown, Heart, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { cn } from "@/lib/utils";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { getFavoritePersons, getSavedFilters, getFavoriteCompanies } from "@/services/savedFiltersService";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { state } = useSidebar();
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [favoritePersons, setFavoritePersons] = useState([]);
  const [favoriteCompanies, setFavoriteCompanies] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [savedSearchesOpen, setSavedSearchesOpen] = useState(false);

  // Load favorites and saved searches
  useEffect(() => {
    const loadData = async () => {
      try {
        const favPersons = await getFavoritePersons();
        setFavoritePersons(favPersons || []);
      } catch (error) {
        console.error("Error loading favorite persons:", error);
        setFavoritePersons([]); // Reset on error
      }

      try {
        const favCompanies = await getFavoriteCompanies();
        setFavoriteCompanies(favCompanies || []);
      } catch (error) {
        console.error("Error loading favorite companies:", error);
        setFavoriteCompanies([]); // Reset on error
      }
      
      try {
        const searches = await getSavedFilters();
        setSavedSearches(searches || []);
      } catch (error) {
        console.error("Error loading saved searches:", error);
        setSavedSearches([]); // Reset on error
      }
    };

    loadData();

    // Add event listener for updates
    const handleUpdate = () => {
      console.log("Favorites or Saved Searches updated, reloading data...");
      loadData();
    };

    window.addEventListener('favoritesUpdated', handleUpdate);
    window.addEventListener('savedFiltersUpdated', handleUpdate);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('favoritesUpdated', handleUpdate);
      window.removeEventListener('savedFiltersUpdated', handleUpdate);
    };
  }, [location.pathname]); // Re-run on navigation

  // Fetch user profile including avatar when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching user profile:', error);
          return;
        }
        
        if (data) {
          setAvatarUrl(data.avatar_url || null);
          
          // Set user name for display
          const firstName = data.first_name || '';
          const lastName = data.last_name || '';
          if (firstName || lastName) {
            setUserName(`${firstName} ${lastName}`.trim());
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchUserProfile();
  }, [user]);

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
    }
  ];

  const getUserInitials = () => {
    if (userName) {
      const nameParts = userName.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      } else if (nameParts.length === 1) {
        return nameParts[0].substring(0, 2).toUpperCase();
      }
    }
    
    if (!user) return "UN";
    
    const email = user.email || "";
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "UN";
  };

  const handleNavigateToFavorite = (item, type: 'person' | 'company') => {
    if (type === 'company') {
      navigate(`/company/${item.id}`);
    } else {
      navigate(`/profile/${item.id}`);
    }
    setFavoritesOpen(false);
  };

  const handleApplySavedSearch = (filter) => {
    const path = filter.type === 'company' ? '/companies' : '/persons';
    navigate(`${path}?filter=${filter.id}`);
    setSavedSearchesOpen(false);
  };

  return (
    <>
      <Sidebar className="border-r border-[#DFE4EA] bg-white">
        <SidebarHeader className="pt-4 pb-3">
          <div className="flex w-full items-center justify-between px-6">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/bc40263e-ec64-44a5-b196-4642d02eba58.png"
                alt="Altss Logo" 
                className="h-10 w-auto object-contain rounded-md"
              />
            </div>
            <SidebarTrigger className="text-[#637381] w-6 h-6" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-4 mt-10">
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.title}>
                {index === 2 && <SidebarSeparator className="my-4 mx-1 bg-[#DFE4EA]" />}
                <SidebarMenuItem>
                  <button 
                    onClick={() => handleNavigation(item.path)}
                    className={`flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11
                      ${isActive(item.path) 
                        ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]" 
                        : "text-[#637381] hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={item.iconSrc} 
                        alt={item.title} 
                        className="h-6 w-6 object-contain"
                      />
                      <span>{item.title}</span>
                    </div>
                    {item.hasRightIcon && (
                      <ChevronRight className="h-5 w-5 text-[#637381] rotate-90" />
                    )}
                  </button>
                </SidebarMenuItem>
              </React.Fragment>
            ))}

            {/* Favorites Dropdown */}
            <SidebarMenuItem>
              <Collapsible open={favoritesOpen} onOpenChange={setFavoritesOpen} className="w-full">
                <CollapsibleTrigger className={`flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11
                  ${isActive("/favorites") 
                    ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]" 
                    : "text-[#637381] hover:bg-gray-100"
                  }`}>
                  <div className="flex items-center gap-2.5">
                    <Heart className="h-6 w-6" />
                    <span>Favorites</span>
                  </div>
                  {favoritesOpen ? 
                    <ChevronDown className="h-5 w-5 text-[#637381]" /> : 
                    <ChevronRight className="h-5 w-5 text-[#637381]" />
                  }
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {favoritePersons.length > 0 || favoriteCompanies.length > 0 ? (
                    <>
                      {/* Companies Section */}
                      {favoriteCompanies.length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Companies
                          </div>
                          {favoriteCompanies.map(favorite => (
                            <div 
                              key={favorite.id}
                              onClick={() => handleNavigateToFavorite(favorite, 'company')}
                              className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                            >
                              <span className="truncate">{favorite.name}</span>
                              {favorite.type && (
                                <span className="text-xs text-gray-400 truncate">
                                  {favorite.type}
                                </span>
                              )}
                            </div>
                          ))}
                        </>
                      )}

                      {/* Persons Section */}
                      {favoritePersons.length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Persons
                          </div>
                          {favoritePersons.map(favorite => (
                            <div 
                              key={favorite.id}
                              onClick={() => handleNavigateToFavorite(favorite, 'person')}
                              className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                            >
                              <span className="truncate">{favorite.name}</span>
                              {favorite.position && (
                                <span className="text-xs text-gray-400 truncate">
                                  {favorite.position}
                                </span>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <div className="py-2 px-3 text-sm text-gray-400">
                      No favorites yet
                    </div>
                  )}
                  <div 
                    className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-blue-500 font-medium"
                    onClick={() => handleNavigation('/favorites')}
                  >
                    View all favorites
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            {/* Saved Searches Dropdown */}
            <SidebarMenuItem>
              <Collapsible open={savedSearchesOpen} onOpenChange={setSavedSearchesOpen} className="w-full">
                <CollapsibleTrigger className={`flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11
                  ${isActive("/saved-searches") 
                    ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]" 
                    : "text-[#637381] hover:bg-gray-100"
                  }`}>
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f69faa278a069ce4b2090e224b9110b1e63802ea" 
                      alt="Saved Searches" 
                      className="h-6 w-6 object-contain"
                    />
                    <span>Saved Searches</span>
                  </div>
                  {savedSearchesOpen ? 
                    <ChevronDown className="h-5 w-5 text-[#637381]" /> : 
                    <ChevronRight className="h-5 w-5 text-[#637381]" />
                  }
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {savedSearches.length > 0 ? (
                    <>
                      {/* Companies Section */}
                      {savedSearches.filter(search => search.type === 'company').length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Companies
                          </div>
                          {savedSearches
                            .filter(search => search.type === 'company')
                            .map(filter => (
                              <div 
                                key={filter.id}
                                onClick={() => handleApplySavedSearch(filter)}
                                className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                              >
                                <span className="truncate">{filter.name}</span>
                              </div>
                            ))
                          }
                        </>
                      )}

                      {/* Persons Section */}
                      {savedSearches.filter(search => search.type === 'person').length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Persons
                          </div>
                          {savedSearches
                            .filter(search => search.type === 'person')
                            .map(filter => (
                              <div 
                                key={filter.id}
                                onClick={() => handleApplySavedSearch(filter)}
                                className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                              >
                                <span className="truncate">{filter.name}</span>
                              </div>
                            ))
                          }
                        </>
                      )}
                    </>
                  ) : (
                    <div className="py-2 px-3 text-sm text-gray-400">
                      No saved searches yet
                    </div>
                  )}
                  <div 
                    className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-blue-500 font-medium"
                    onClick={() => handleNavigation('/saved-searches')}
                  >
                    View all saved searches
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto p-6 border-t border-[#DFE4EA]">
          <div className="flex flex-col gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
              <Avatar>
                <AvatarImage 
                      src={avatarUrl || ""} 
                  alt="User Profile"
                      className="rounded-full object-cover" 
                />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <span className="text-[#637381] text-base font-medium truncate max-w-[120px]">
                    {userName || user?.email || "User Name"}
              </span>
            </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] rounded-md bg-[rgba(0,39,115,1)] text-white p-0 border-none">
                <DropdownMenuItem onClick={handleLogout} className="px-4 py-[7px] hover:bg-[rgba(0,39,115,0.8)] cursor-pointer">
                  Sign-out
                </DropdownMenuItem>
                <div className="border-t border-[rgba(225,232,255,1)] w-full my-[5px]" />
                <DropdownMenuItem onClick={() => window.open('mailto:support@altss.com')} className="px-4 py-[7px] hover:bg-[rgba(0,39,115,0.8)] cursor-pointer">
                  Contact Support
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/userprofile")} className="px-4 py-[7px] hover:bg-[rgba(0,39,115,0.8)] cursor-pointer">
                  Open My Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      {state === "collapsed" && (
        <div className="fixed top-10 left-3 z-50 md:flex">
          <SidebarTrigger className="bg-white shadow-md rounded-md p-1.5 hover:bg-gray-100" />
        </div>
      )}
    </>
  );
};

export default AppSidebar;
