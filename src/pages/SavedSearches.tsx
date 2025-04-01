
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Trash2, Clock, ArrowRight } from "lucide-react";
import { 
  getSavedSearchesFromDatabase, 
  SavedSearchType,
  deleteSavedSearch
} from "@/services/savedSearchesService";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearchType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch saved searches from the database
  useEffect(() => {
    const fetchSavedSearches = async () => {
      setIsLoading(true);
      try {
        const searches = await getSavedSearchesFromDatabase();
        setSavedSearches(searches);
      } catch (error) {
        console.error("Error fetching saved searches:", error);
        toast({
          title: "Error",
          description: "Failed to load saved searches",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedSearches();
  }, [toast]);

  const handleDeleteSearch = async (id: string) => {
    try {
      const success = await deleteSavedSearch(id);
      if (success) {
        setSavedSearches(savedSearches.filter(search => search.id !== id));
        toast({
          title: "Success",
          description: "Search deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete search",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting search:", error);
      toast({
        title: "Error",
        description: "Failed to delete search",
        variant: "destructive",
      });
    }
  };

  const handleApplySearch = (search: SavedSearchType) => {
    // Navigate to the persons page with the saved search applied
    const params = new URLSearchParams();
    
    if (search.filter_data.firmTypes?.length) {
      params.set('firmTypes', search.filter_data.firmTypes.join(','));
    }
    
    if (search.filter_data.searchQuery) {
      params.set('searchQuery', search.filter_data.searchQuery);
    }
    
    navigate(`/persons?${params.toString()}`);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Saved Searches</h1>
            
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-white border border-[#DFE4EA] animate-pulse">
                    <CardHeader className="h-24"></CardHeader>
                    <CardContent className="h-20"></CardContent>
                  </Card>
                ))}
              </div>
            ) : savedSearches.length === 0 ? (
              <Card className="bg-white border border-[#DFE4EA] p-6 text-center">
                <div className="flex flex-col items-center py-10">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No saved searches</h3>
                  <p className="text-muted-foreground mb-6">
                    Save your searches to quickly access them later
                  </p>
                  <Button onClick={() => navigate("/persons")}>
                    Go to persons
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedSearches.map((search) => (
                  <Card key={search.id} className="bg-white border border-[#DFE4EA] hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold">{search.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{format(new Date(search.created_at), 'MMM d, yyyy')}</span>
                          </CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleDeleteSearch(search.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {search.filter_data.searchQuery && (
                          <div className="flex items-center text-sm">
                            <Search className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              "{search.filter_data.searchQuery}"
                            </span>
                          </div>
                        )}
                        {search.filter_data.firmTypes && search.filter_data.firmTypes.length > 0 && (
                          <div className="flex items-center text-sm">
                            <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {search.filter_data.firmTypes.length === 1 
                                ? search.filter_data.firmTypes[0]
                                : `${search.filter_data.firmTypes.length} filters`}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center"
                          onClick={() => handleApplySearch(search)}
                        >
                          <span>Apply Search</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SavedSearches;
