
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useNavigate } from "react-router-dom";
import { Filter, Search, Trash2, ExternalLink } from "lucide-react";
import { getSavedSearches, deleteSavedSearch, SavedSearch } from "@/services/savedSearchesService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

const SavedSearchesPage = () => {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSearches = async () => {
      setLoading(true);
      const data = await getSavedSearches();
      setSearches(data);
      setLoading(false);
    };

    loadSearches();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${name}"?`);
    
    if (confirmed) {
      const success = await deleteSavedSearch(id);
      if (success) {
        setSearches(searches.filter(search => search.id !== id));
      }
    }
  };

  const handleUseSearch = (search: SavedSearch) => {
    // Navigate to persons page with the selected filters
    const firmTypes = search.filter_data?.firmTypes || [];
    const searchQuery = search.filter_data?.searchQuery || "";
    
    // In a real app, you'd use a more sophisticated state management solution
    // But for now, we'll use localStorage to pass the filter data
    localStorage.setItem('lastAppliedSearch', JSON.stringify({
      firmTypes,
      searchQuery,
      name: search.name
    }));
    
    navigate('/persons');
    
    toast({
      title: "Search applied",
      description: `Applied "${search.name}" search`,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Saved Searches</h1>
            </div>

            {!user ? (
              <div className="bg-white rounded-lg p-6 text-center">
                <h2 className="text-lg font-medium mb-2">Sign in to view your saved searches</h2>
                <p className="text-muted-foreground mb-4">
                  You need to be logged in to save and view your searches.
                </p>
                <Button onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="h-24 bg-muted/50"></CardHeader>
                    <CardContent className="h-32 bg-muted/30 mt-2"></CardContent>
                    <CardFooter className="h-12 bg-muted/20 mt-2"></CardFooter>
                  </Card>
                ))}
              </div>
            ) : searches.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-medium mb-2">No saved searches yet</h2>
                <p className="text-muted-foreground mb-4">
                  Save your search filters to quickly access them later.
                </p>
                <Button onClick={() => navigate('/persons')}>
                  Go to Persons
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searches.map((search) => (
                  <Card key={search.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-start">
                        <span className="line-clamp-1 mr-2">{search.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleDelete(search.id, search.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                      <div className="text-xs text-muted-foreground">
                        Saved on {format(new Date(search.created_at), 'MMM d, yyyy')}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-3">
                        {search.filter_data?.searchQuery && (
                          <div className="flex items-center gap-1 mb-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm line-clamp-1">"{search.filter_data.searchQuery}"</span>
                          </div>
                        )}
                        {search.filter_data?.firmTypes && search.filter_data.firmTypes.length > 0 && (
                          <div className="flex items-center gap-1 mb-1">
                            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm">
                              {search.filter_data.firmTypes.length} {search.filter_data.firmTypes.length === 1 ? 'filter' : 'filters'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {search.filter_data?.firmTypes && search.filter_data.firmTypes.slice(0, 3).map((type, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                        {search.filter_data?.firmTypes && search.filter_data.firmTypes.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{search.filter_data.firmTypes.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => handleUseSearch(search)}
                      >
                        Apply Search <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </CardFooter>
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

export default SavedSearchesPage;
