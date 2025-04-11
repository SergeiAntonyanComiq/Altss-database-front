import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, SearchIcon, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  getSavedFilters, 
  deleteSavedFilter, 
  SavedSearchType 
} from "@/services/savedFiltersService";

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearchType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load saved searches
    const loadSavedSearches = async () => {
      setIsLoading(true);
      try {
        const data = await getSavedFilters();
        setSavedSearches(data);
      } catch (error) {
        console.error("Error loading saved searches:", error);
        toast({
          title: "Error loading saved searches",
          description: "There was a problem loading your saved searches. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedSearches();
  }, [toast]);

  const handleUseSearch = (search: SavedSearchType) => {
    // Navigate to persons page with saved search parameters
    navigate(`/persons?filter=${encodeURIComponent(search.id)}`);
  };

  const handleDeleteSearch = async (id: string, name: string) => {
    try {
      const success = await deleteSavedFilter(id);
      if (success) {
        setSavedSearches(prev => prev.filter(search => search.id !== id));
        toast({
          title: "Search deleted",
          description: `"${name}" has been removed from saved searches`
        });
      } else {
        throw new Error("Failed to delete saved search");
      }
    } catch (error) {
      console.error("Error deleting saved search:", error);
    toast({
        title: "Error",
        description: "There was a problem deleting your saved search. Please try again.",
        variant: "destructive"
    });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-6">
              <BookmarkIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h1 className="text-2xl font-semibold text-gray-800">Saved Searches</h1>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : savedSearches.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <SearchIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">You don't have any saved searches yet</h2>
                <p className="text-gray-500 mb-6">Save your search filters to quickly access them later</p>
                <Button 
                  onClick={() => navigate('/persons')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Go to Search
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                  {savedSearches.map((search) => (
                    <div key={search.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800">
                            {search.name}
                          </div>
                          
                          <div className="mt-2 text-sm text-gray-600">
                            {search.description ? (
                              <p>{search.description}</p>
                            ) : (
                              <p className="text-gray-400 italic">No description</p>
                            )}
                          </div>
                          
                          <div className="mt-3 flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            Saved on {new Date(search.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                            onClick={() => handleUseSearch(search)}
                            >
                            <SearchIcon className="h-4 w-4 mr-1" />
                            Use Search
                            </Button>
                            <Button
                            variant="ghost" 
                              size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteSearch(search.id, search.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SavedSearches;
