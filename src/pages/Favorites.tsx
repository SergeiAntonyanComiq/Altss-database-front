import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { 
  getFavoritePersons, 
  getFavoriteCompanies,
  removePersonFromFavorites, 
  removeCompanyFromFavorites,
  FavoritePersonType,
  FavoriteCompanyType 
} from "@/services/savedFiltersService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, User, Briefcase, MapPin, Trash2, Building2, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Favorites = () => {
  const [persons, setPersons] = useState<FavoritePersonType[]>([]);
  const [companies, setCompanies] = useState<FavoriteCompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load favorites list
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const [personsData, companiesData] = await Promise.all([
          getFavoritePersons(),
          getFavoriteCompanies()
        ]);
        setPersons(personsData);
        setCompanies(companiesData);
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

    // Listen for favorites updates
    const handleFavoritesUpdate = () => {
      loadFavorites();
    };
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
  }, [toast]);

  const handleViewProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };

  const handleViewCompany = (id: string) => {
    navigate(`/company/${id}`);
  };

  const handleRemoveFromFavorites = async (id: string, name: string, type: 'person' | 'company') => {
    try {
      let success;
      if (type === 'person') {
        success = await removePersonFromFavorites(id);
        if (success) {
          setPersons(prev => prev.filter(fav => fav.id !== id));
        }
      } else {
        success = await removeCompanyFromFavorites(id);
        if (success) {
          setCompanies(prev => prev.filter(fav => fav.id !== id));
        }
      }

      if (success) {
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

  const renderEmptyState = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Heart className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-medium text-gray-700 mb-2">You don't have any favorites yet</h2>
      <p className="text-gray-500 mb-6">Add contacts or companies to favorites to find them quickly later</p>
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={() => navigate('/persons')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Go to Contacts
        </Button>
        <Button 
          onClick={() => navigate('/companies')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Go to Companies
        </Button>
      </div>
    </div>
  );

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
            ) : persons.length === 0 && companies.length === 0 ? (
              renderEmptyState()
            ) : (
              <div className="space-y-6">
                {/* Companies Section */}
                {companies.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-gray-500" />
                      Companies
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {companies.map((company) => (
                          <div key={company.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <div 
                                    className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer"
                                    onClick={() => handleViewCompany(company.id)}
                                  >
                                    {company.name}
                                  </div>
                                  <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                                    Favorited
                                  </div>
                                </div>
                                
                                <div className="mt-2 space-y-1">
                                  {company.type && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                                      {company.type}
                                    </div>
                                  )}
                                  {company.aum && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                                      AUM: {company.aum}
                                    </div>
                                  )}
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                    Added on {new Date(company.addedAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewCompany(company.id)}
                                >
                                  Profile
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => handleRemoveFromFavorites(company.id, company.name, 'company')}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Persons Section */}
                {persons.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      Persons
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {persons.map((person) => (
                          <div key={person.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <div 
                                    className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer"
                                    onClick={() => handleViewProfile(person.id)}
                                  >
                                    {person.name}
                                  </div>
                                  <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                                    Favorited
                                  </div>
                                </div>
                                
                                <div className="mt-2 space-y-1">
                                  {person.position && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                      {person.position}
                                    </div>
                                  )}
                                  {person.company && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                                      {person.company}
                                    </div>
                                  )}
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                    Added on {new Date(person.addedAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewProfile(person.id)}
                                >
                                  Profile
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => handleRemoveFromFavorites(person.id, person.name, 'person')}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
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

export default Favorites;
