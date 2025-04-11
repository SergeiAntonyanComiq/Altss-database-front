import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { getFavoritePersons, removePersonFromFavorites, FavoritePersonType } from "@/services/savedFiltersService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, User, Briefcase, MapPin, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoritePersonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load favorites list
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const data = await getFavoritePersons();
        setFavorites(data);
      } catch (error) {
        console.error("Error loading favorites:", error);
        toast({
          title: "Error loading favorites",
          description: "There was a problem loading your favorites. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [toast]);

  const handleViewProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };

  const handleRemoveFromFavorites = async (id: string, name: string) => {
    try {
      const success = await removePersonFromFavorites(id);
      if (success) {
        setFavorites(prev => prev.filter(fav => fav.id !== id));
        toast({
          title: "Removed from favorites",
          description: `${name} has been removed from favorites`
        });
      } else {
        throw new Error("Failed to remove from favorites");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast({
        title: "Error",
        description: "There was a problem removing from favorites. Please try again.",
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
              <Heart className="h-6 w-6 text-purple-500 mr-2" />
              <h1 className="text-2xl font-semibold text-gray-800">Favorites</h1>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : favorites.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">You don't have any favorite contacts yet</h2>
                <p className="text-gray-500 mb-6">Add contacts to favorites to find them quickly later</p>
                <Button 
                  onClick={() => navigate('/persons')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Go to Contacts
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <div 
                              className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer"
                              onClick={() => handleViewProfile(favorite.id)}
                            >
                              {favorite.name}
                            </div>
                            <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                              Favorited
                            </div>
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            {favorite.position && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                {favorite.position}
                              </div>
                            )}
                            {favorite.company && (
                              <div className="flex items-center text-sm text-gray-600">
                                <User className="h-4 w-4 mr-2 text-gray-400" />
                                {favorite.company}
                              </div>
                            )}
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              Added on {new Date(favorite.addedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewProfile(favorite.id)}
                          >
                            Profile
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleRemoveFromFavorites(favorite.id, favorite.name)}
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

export default Favorites;
