import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, ChevronDown, Heart, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
  SidebarTrigger,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FavoriteFamilyOfficeType,
  FavoriteContactType,
  getSavedSearches,
  SavedSearchType,
  FavoriteItem,
  getFavorites,
  SavedFiltersType,
  getSavedFilters,
} from "@/services/savedFiltersService";
import { isLocked } from "@/utils/routeAccess.ts";
import { FavoriteSidebarList } from "@/components/favorites";
import { withTooltipRenderer } from "@/components/ui/withTooltipRenderer.tsx";
import { UserIcon } from "@/components/ui/icons/User.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { getUserById } from "@/services/usersService.ts";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    userPlan,
    userData,
    userStatus,
    handleLogout: logout,
  } = useAuth();
  const { state } = useSidebar();
  const { toast } = useToast();
  const [favoriteFamilyOfficesContacts, setFavoriteFamilyOfficesContacts] =
    useState<FavoriteContactType[]>([]);
  const [favoriteFamilyOffices, setFavoriteFamilyOffices] = useState<
    FavoriteFamilyOfficeType[]
  >([]);
  const [savedSearchesOffices, setSavedSearchesOffices] = useState<
    SavedSearchType[]
  >([]);
  const [savedFilterOffices, setSavedFilterOffices] = useState<
    SavedFiltersType[]
  >([]);
  const [savedSearchesContacts, setSavedSearchesContacts] = useState<
    SavedSearchType[]
  >([]);
  const [savedFilterContacts, setSavedFilterContacts] = useState<
    SavedFiltersType[]
  >([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [savedSearchesOpen, setSavedSearchesOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const userAvatarUrl = useMemo(
    () => userData?.avatar_url,
    [userData?.avatar_url]
  );
  const userFullName = useMemo(
    () => userData?.full_name,
    [userData?.full_name]
  );
  const userEmail = useMemo(() => userData?.email, [userData?.email]);

  const isAdmin = userPlan === "admin";

  const profileLoadedRef = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      if (!userStatus || userStatus === "pending") {
        return;
      }

      try {
        const { data: favoriteData } = await getFavorites();

        setFavoriteFamilyOffices(
          favoriteData?.filter(
            (item: FavoriteItem) => item.item_type === "family_office"
          ) ?? []
        );
        setFavoriteFamilyOfficesContacts(
          favoriteData?.filter(
            (item: FavoriteItem) => item.item_type === "family_office_contacts"
          ) ?? []
        );

        const { data: searchesData } = await getSavedSearches();
        const { data: filtersData } = await getSavedFilters();

        setSavedSearchesOffices(
          searchesData.filter(
            (search: SavedSearchType) => search.table_name === "family_office"
          ) || []
        );
        setSavedFilterOffices(
          filtersData.filter(
            (filter: SavedFiltersType) => filter.table_name === "family_office"
          ) || []
        );
        setSavedSearchesContacts(
          searchesData.filter(
            (search: SavedSearchType) =>
              search.table_name === "family_office_contacts"
          ) || []
        );
        setSavedFilterContacts(
          filtersData.filter(
            (filter: SavedFiltersType) =>
              filter.table_name === "family_office_contacts"
          ) || []
        );
      } catch (error) {
        setSavedSearchesContacts([]);
        setSavedSearchesOffices([]);
      }
    };

    (async () => {
      await loadData();
    })();

    const handleUpdate = async () => {
      await loadData();
    };

    window.addEventListener("favoritesUpdated", handleUpdate);
    window.addEventListener("savedFiltersUpdated", handleUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleUpdate);
      window.removeEventListener("savedFiltersUpdated", handleUpdate);
    };
  }, [location.pathname, userStatus]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setUserName(userFullName ?? userEmail ?? "");
        setAvatarUrl(userAvatarUrl ?? "/profile.png");
        profileLoadedRef.current = true;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    (async () => {
      await fetchUserProfile();
    })();
  }, [userAvatarUrl, userEmail, userFullName]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/familyoffices");
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      title: "Family Offices search",
      path: "/familyoffices",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/ddb46b8f5e3677e41421100e12cb4f99fefdcce6",
      hasRightIcon: false,
    },
    {
      title: "Family Offices contacts",
      path: "/familyofficescontacts",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/94865fa92bf7a1022c9d340f97476cfd56b8e6d4",
      hasRightIcon: false,
    },
    {
      title: "Company search",
      path: "/companies",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/ddb46b8f5e3677e41421100e12cb4f99fefdcce6",
      hasRightIcon: false,
    },
    {
      title: "Investors search",
      path: "/investors",
      iconSrc: "/images/investor_icon.svg",
      hasRightIcon: false,
    },
    {
      title: "People search",
      path: "/persons",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/94865fa92bf7a1022c9d340f97476cfd56b8e6d4",
      hasRightIcon: false,
    },
    // TODO integrate My Order page
    // {
    //   title: "My Orders",
    //   path: "/my-orders",
    //   iconSrc:
    //     "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/cb551c4c9f44d0939c54de446551512a630f1b13",
    //   hasRightIcon: false,
    // },
  ];

  const mainMenuItems = menuItems.slice(0, 5);
  const secondaryMenuItems = menuItems.slice(5);

  const getUserInitials = () => {
    if (userName) {
      const nameParts = userName.split(" ");
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

  const handleNavigateToFavorite = (id: string, type: "office" | "contact") => {
    if (type === "office") {
      navigate(`/familyoffices/${id}`);
    } else {
      navigate(`/familyofficescontactsprofile/${id}`);
    }
    setFavoritesOpen(false);
  };

  const handleApplySavedSearch = (search: SavedSearchType) => {
    const path =
      search.table_name === "family_office"
        ? "/familyoffices"
        : "/familyofficescontacts";

    const query = new URLSearchParams();

    if (search.searchQuery) {
      query.set("search", search.searchQuery);
    }

    navigate(`${path}?${query.toString()}`);
  };

  const handleApplySavedFilter = (filer: SavedFiltersType) => {
    const path =
      filer.table_name === "family_office"
        ? "/familyoffices"
        : "/familyofficescontacts";

    const query = new URLSearchParams();

    if (filer.filterQuery) {
      query.set("filterQuery", filer.filterQuery);
    }

    if (filer.filterText) {
      query.append("filterText", filer.filterText);
    }

    navigate(`${path}?${query.toString()}`);
  };

  useEffect(() => {
    if (userFullName) {
      setUserName(userFullName);
    } else {
      (async () => {
        try {
          const newUser = await getUserById(user?.sub);
          setUserName(newUser?.full_name ?? "");
        } catch (error) {
          setUserName("");
        }
      })();
    }
  }, [user?.sub, userFullName]);

  return (
    <>
      <Sidebar className="border-r border-[#DFE4EA] bg-white">
        <SidebarHeader className="pt-4 pb-3">
          <div className="flex w-full items-center justify-between px-6">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(`/familyoffices`)}
            >
              <img
                src="/images/logo.png"
                alt="Altss Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <SidebarTrigger className="text-[#637381] w-6 h-6" />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 mt-10">
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() =>
                        !isLocked(item.path, userPlan) &&
                        handleNavigation(item.path)
                      }
                      disabled={isLocked(item.path, userPlan)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11 space-x-4",
                        isActive(item.path) && !isLocked(item.path, userPlan)
                          ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]"
                          : "text-[#637381]",
                        isLocked(item.path, userPlan)
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.iconSrc}
                          alt={item.title}
                          className="h-6 w-6 object-contain"
                        />
                        <span className="whitespace-nowrap">{item.title}</span>
                      </div>
                      {isLocked(item.path, userPlan) ? (
                        <Lock className="w-4 h-4 text-[#A0AEC0]" />
                      ) : (
                        item.hasRightIcon && (
                          <ChevronRight className="h-5 w-5 text-[#637381] rotate-90" />
                        )
                      )}
                    </button>

                    {userPlan === "trial" &&
                      item.path === "/familyofficescontacts" && (
                        <TooltipContent side="bottom">
                          Not available for trial users
                        </TooltipContent>
                      )}
                  </TooltipTrigger>
                </Tooltip>
              </SidebarMenuItem>
            ))}

            <SidebarSeparator className="my-4 mx-1 bg-[#DFE4EA]" />
            {secondaryMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11
                    ${
                      isActive(item.path)
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
                    <span className="whitespace-nowrap">{item.title}</span>
                  </div>
                  {item.hasRightIcon && (
                    <ChevronRight className="h-5 w-5 text-[#637381] rotate-90" />
                  )}
                </button>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem>
              <Collapsible
                open={favoritesOpen}
                onOpenChange={setFavoritesOpen}
                className="w-full"
              >
                <CollapsibleTrigger
                  className={`flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11
                  ${
                    isActive("/favorites")
                      ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]"
                      : "text-[#637381] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="h-6 w-6" />
                    <span>Favorites</span>
                  </div>
                  {favoritesOpen ? (
                    <ChevronDown className="h-5 w-5 text-[#637381]" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-[#637381]" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {favoriteFamilyOfficesContacts.length > 0 ||
                  favoriteFamilyOffices.length > 0 ? (
                    <>
                      {favoriteFamilyOffices.length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Family Offices
                          </div>
                          {favoriteFamilyOffices.map((favorite) => (
                            <FavoriteSidebarList
                              key={favorite.item_id}
                              id={favorite.item_id}
                              name={favorite.data.firm_name}
                              title={favorite.data.firm_type}
                              type="office"
                              handleNavigateToFavorite={
                                handleNavigateToFavorite
                              }
                            />
                          ))}
                        </>
                      )}

                      {favoriteFamilyOfficesContacts.length > 0 && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Family Offices Contacts
                          </div>
                          {favoriteFamilyOfficesContacts.map((favorite) => (
                            <FavoriteSidebarList
                              key={favorite.item_id}
                              id={favorite.item_id}
                              name={favorite.data.full_name}
                              title={favorite.data.title}
                              type="contact"
                              handleNavigateToFavorite={
                                handleNavigateToFavorite
                              }
                            />
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
                    onClick={() => handleNavigation("/favorites")}
                  >
                    View all favorites
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible
                open={savedSearchesOpen}
                onOpenChange={setSavedSearchesOpen}
                className="w-full"
              >
                <CollapsibleTrigger
                  className={`flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11
                  ${
                    isActive("/saved-searches")
                      ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]"
                      : "text-[#637381] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f69faa278a069ce4b2090e224b9110b1e63802ea"
                      alt="Saved Searches"
                      className="h-6 w-6 object-contain"
                    />
                    <span>Saved Searches</span>
                  </div>
                  {savedSearchesOpen ? (
                    <ChevronDown className="h-5 w-5 text-[#637381]" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-[#637381]" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {savedSearchesOffices.length > 0 ||
                  savedSearchesContacts.length > 0 ||
                  savedFilterOffices.length > 0 ||
                  savedSearchesContacts.length > 0 ? (
                    <>
                      {(savedSearchesOffices.length > 0 ||
                        savedFilterOffices.length > 0) && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Family Offices
                          </div>
                          {savedSearchesOffices.map((filter) => (
                            <div
                              key={filter.id}
                              onClick={() => handleApplySavedSearch(filter)}
                              className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                            >
                              {withTooltipRenderer(
                                <span className="truncate">
                                  {filter.searchQuery}
                                </span>,
                                filter.searchQuery
                              )}
                            </div>
                          ))}
                          {savedFilterOffices.map((filter) => (
                            <div
                              key={filter.id}
                              onClick={() => handleApplySavedFilter(filter)}
                              className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                            >
                              {withTooltipRenderer(
                                <span className="truncate">
                                  {filter.filterText}
                                </span>,
                                filter.filterText
                              )}
                            </div>
                          ))}
                        </>
                      )}

                      {(savedSearchesContacts.length > 0 ||
                        savedFilterContacts.length > 0) && (
                        <>
                          <div className="px-3 py-1 text-xs font-medium text-gray-500">
                            Family Office Contacts
                          </div>
                          {savedSearchesContacts.map((filter) => (
                            <div
                              key={filter.id}
                              onClick={() => handleApplySavedSearch(filter)}
                              className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                            >
                              <span className="truncate">
                                {withTooltipRenderer(
                                  <span className="truncate">
                                    {filter.searchQuery}
                                  </span>,
                                  filter.searchQuery
                                )}
                              </span>
                            </div>
                          ))}
                          {savedFilterContacts.map((filter) => (
                            <div
                              key={filter.id}
                              onClick={() => handleApplySavedFilter(filter)}
                              className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
                            >
                              <span className="truncate">
                                {withTooltipRenderer(
                                  <span className="truncate">
                                    {filter.filterText}
                                  </span>,
                                  filter.filterText
                                )}
                              </span>
                            </div>
                          ))}
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
                    onClick={() => handleNavigation("/saved-searches")}
                  >
                    View all saved searches
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarSeparator className="my-4 mx-1 bg-[#DFE4EA]" />

            {isAdmin && (
              <SidebarMenuItem key="users">
                <button
                  onClick={() => navigate("/users")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11",
                    isActive("/users")
                      ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]"
                      : "text-[#637381] hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <UserIcon />
                    <span className="whitespace-nowrap">Users</span>
                  </div>
                </button>
              </SidebarMenuItem>
            )}

            {isAdmin && (
              <SidebarMenuItem key="users">
                <button
                  onClick={() => navigate("/integration")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md text-[15px] py-2.5 px-3.5 min-h-11",
                    isActive("/integration")
                      ? "bg-[rgba(38,101,240,0.05)] text-[#2665F0] border-r-[3px] border-[#2665F0]"
                      : "text-[#637381] hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Zap />
                    <span className="whitespace-nowrap">Integration</span>
                  </div>
                </button>
              </SidebarMenuItem>
            )}
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
                  <span className="text-[#637381] text-base font-medium">
                    {userName || ""}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[200px] rounded-md bg-[rgba(0,39,115,1)] text-white p-0 border-none"
              >
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="px-4 py-[7px] hover:bg-[rgba(0,39,115,0.8)] cursor-pointer"
                >
                  Sign-out
                </DropdownMenuItem>
                <div className="border-t border-[rgba(225,232,255,1)] w-full my-[5px]" />
                <DropdownMenuItem
                  onClick={() => window.open("mailto:support@altss.com")}
                  className="px-4 py-[7px] hover:bg-[rgba(0,39,115,0.8)] cursor-pointer"
                >
                  Contact Support
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigation("/userprofile")}
                  className="px-4 py-[7px] hover:bg-[rgba(0,39,115,0.8)] cursor-pointer"
                >
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
