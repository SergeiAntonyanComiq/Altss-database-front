
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { getSavedSearches, deleteSavedSearch, SavedSearch } from "@/services/savedSearchesService";
import { Button } from "@/components/ui/button";
import { Tag, Trash2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const SavedSearches = () => {
  const navigate = useNavigate();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedSearches = async () => {
      setIsLoading(true);
      try {
        const searches = await getSavedSearches();
        setSavedSearches(searches);
      } catch (error) {
        console.error('Error fetching saved searches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedSearches();
  }, []);

  const handleDelete = async (id: string) => {
    const success = await deleteSavedSearch(id);
    if (success) {
      setSavedSearches(prev => prev.filter(search => search.id !== id));
    }
  };

  const handleApplySearch = (search: SavedSearch) => {
    // Build the query parameters for the persons page
    const params = new URLSearchParams();
    if (search.filter_data.firmTypes.length > 0) {
      params.set('firmTypes', JSON.stringify(search.filter_data.firmTypes));
    }
    if (search.filter_data.searchQuery) {
      params.set('q', search.filter_data.searchQuery);
    }
    
    // Navigate to persons page with the query parameters
    navigate(`/persons?${params.toString()}`);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#FEFEFE] min-w-0 min-h-[900px] overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <Link to="/persons" className="flex items-center text-gray-500 mb-4 hover:text-gray-700">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Persons
              </Link>
              <h1 className="text-2xl font-semibold text-[#111928]">Saved Searches</h1>
              <p className="text-gray-600 mt-1">
                View and manage your saved searches
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : savedSearches.length === 0 ? (
              <div className="bg-gray-50 border rounded-lg p-8 text-center">
                <h2 className="text-lg font-medium text-gray-700 mb-2">No saved searches yet</h2>
                <p className="text-gray-500 mb-4">
                  Save your filters and searches from the Persons page to quickly access them later.
                </p>
                <Link to="/persons">
                  <Button>
                    Go to Persons
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {savedSearches.map(search => (
                  <div 
                    key={search.id} 
                    className={cn(
                      "border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                    )}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Tag size={16} className="text-blue-600" />
                          <h3 className="font-medium text-lg">{search.name}</h3>
                        </div>
                        <div className="text-sm text-gray-500">
                          Saved {format(new Date(search.created_at), 'PPP')}
                        </div>

                        <div className="mt-3">
                          {search.filter_data.firmTypes.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              <span className="text-sm font-medium text-gray-700">Firm Types:</span>
                              {search.filter_data.firmTypes.map(type => (
                                <span key={type} className="text-sm bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                                  {type}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {search.filter_data.searchQuery && (
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium text-gray-700">Search Query:</span>
                              <span className="text-sm text-gray-600">"{search.filter_data.searchQuery}"</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApplySearch(search)}
                        >
                          Apply
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(search.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default SavedSearches;
