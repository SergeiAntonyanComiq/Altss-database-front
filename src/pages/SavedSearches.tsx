import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, SearchIcon, User, Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteSavedSearches,
  getSavedSearches,
  SavedSearchType,
} from "@/services/savedFiltersService";
import {
  FamilyOfficeContactSearches,
  FamilyOfficeSearches,
} from "@/components/saved-searches";

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearchType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadSavedSearches = async () => {
      setIsLoading(true);
      try {
        const data = await getSavedSearches();
        setSavedSearches(data.data);
      } catch (error) {
        toast({
          title: "Error loading saved searches",
          description:
            "There was a problem loading your saved searches. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await loadSavedSearches();
    })();
  }, [toast]);

  const handleUseSearch = (search: SavedSearchType) => {
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

  const handleDeleteSearch = async (id: number, query: string) => {
    try {
      const success = await deleteSavedSearches(id);

      if (success) {
        setSavedSearches((prev) => prev.filter((search) => search.id !== id));
        toast({
          title: "Search deleted",
          description: `"${query}" has been removed from saved searches`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem deleting your saved search. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderEmptyState = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <SearchIcon className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-medium text-gray-700 mb-2">
        You don't have any saved searches yet
      </h2>
      <p className="text-gray-500 mb-6">
        Save your search filters to quickly access them later
      </p>
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => navigate("/familyofficescontacts")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Go to Family Offices contacts
        </Button>
        <Button
          onClick={() => navigate("/familyoffices")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Go to Family Offices
        </Button>
      </div>
    </div>
  );

  const contactSearches =
    savedSearches?.filter(
      (search) => search.table_name === "family_office_contacts"
    ) ?? [];
  const officeSearches =
    savedSearches?.filter((search) => search.table_name === "family_office") ??
    [];

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-6">
              <BookmarkIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="text-2xl font-semibold text-gray-800">
                Saved Searches
              </h1>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : savedSearches.length === 0 ? (
              renderEmptyState()
            ) : (
              <div className="space-y-6">
                {officeSearches.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-gray-500" />
                      Family Offices
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {officeSearches.map((search) => (
                          <FamilyOfficeSearches
                            handleDeleteSearch={handleDeleteSearch}
                            handleUseSearch={handleUseSearch}
                            search={search}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {contactSearches.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      Family Offices Contacts
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {contactSearches.map((search) => (
                          <FamilyOfficeContactSearches
                            handleDeleteSearch={handleDeleteSearch}
                            handleUseSearch={handleUseSearch}
                            search={search}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SavedSearches;
