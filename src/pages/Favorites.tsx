import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import {
  FavoriteFamilyOfficeType,
  FavoriteItem,
  FavoriteContactType,
  getFavorites,
  deleteFavorite,
} from "@/services/savedFiltersService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, User, Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/lib/axios.ts";
import { Loading } from "@/utils.tsx";
import {
  FamilyOfficeContactFavorites,
  FamilyOfficeFavorites,
} from "@/components/favorites";

const Favorites = () => {
  const [familyOffices, setFamilyOffices] = useState<
    FavoriteFamilyOfficeType[]
  >([]);
  const [familyOfficesContacts, setFamilyOfficesContacts] = useState<
    FavoriteContactType[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const { data } = await getFavorites();

        setFamilyOffices(
          data?.filter(
            (item: FavoriteItem) => item.item_type === "family_office"
          ) ?? []
        );
        setFamilyOfficesContacts(
          data?.filter(
            (item: FavoriteItem) => item.item_type === "family_office_contacts"
          ) ?? []
        );
      } catch (error) {
        toast({
          title: "Error loading favorites",
          description:
            "There was a problem loading your favorites. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await loadFavorites();
    })();
  }, [toast]);

  const handleView = (id: string, path: string) => navigate(`/${path}/${id}`);

  const removeFavorite = async (
    id: string,
    name: string,
    type: "family_office" | "family_office_contacts"
  ) => {
    try {
      setIsLoading(true);
      const success = await deleteFavorite(id, type);

      if (success) {
        toast({
          title: "Favorite deleted",
          description: `"${name}" has been removed from Favorites`,
        });

        if (type === "family_office") {
          setFamilyOffices((prevState) =>
            prevState.filter(({ item_id }) => item_id !== id)
          );
        } else {
          setFamilyOfficesContacts((prevState) =>
            prevState.filter(({ item_id }) => item_id !== id)
          );
        }
      }
    } catch (error) {
      toast({
        title: "Error deleting favorite",
        description:
          "There was a problem loading your favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmptyState = () =>
    !isLoading ? (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          You don't have any favorites yet
        </h2>
        <p className="text-gray-500 mb-6">
          Add Family offices or Family offices contacts to favorites to find
          them quickly later
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
    ) : null;

  return (
    <SidebarProvider>
      <Loading show={isLoading} />
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-purple-500 mr-2" />
              <h1 className="text-2xl font-semibold text-gray-800">
                Favorites
              </h1>
            </div>

            {familyOffices.length === 0 &&
            familyOfficesContacts.length === 0 ? (
              renderEmptyState()
            ) : (
              <div className="space-y-6">
                {familyOffices.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-gray-500" />
                      Family Offices
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {familyOffices.map((office) => (
                          <FamilyOfficeFavorites
                            key={office.item_id}
                            office={office}
                            handleView={handleView}
                            removeFavorite={removeFavorite}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {familyOfficesContacts.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      Family Offices Contacts
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {familyOfficesContacts.map((contact) => (
                          <FamilyOfficeContactFavorites
                            key={contact.item_id}
                            contact={contact}
                            handleView={handleView}
                            removeFavorite={removeFavorite}
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

export default Favorites;
