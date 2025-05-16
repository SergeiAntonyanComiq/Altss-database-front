import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import {
  FavoriteFamilyOfficeType,
  FavoriteItem,
  FavoriteContactType,
} from "@/services/savedFiltersService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  User,
  Briefcase,
  MapPin,
  Trash2,
  Building2,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/lib/axios.ts";
import { Loading } from "@/utils.tsx";

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
        const { data } = await apiClient.get<{ data: FavoriteItem[] }>(
          `favorites`
        );
        const items = data.data;

        setFamilyOffices(
          (items?.filter((item) => item.item_type === "family_office") ??
            []) as FavoriteFamilyOfficeType[]
        );
        setFamilyOfficesContacts(
          (items?.filter(
            (item) => item.item_type === "family_office_contacts"
          ) ?? []) as FavoriteContactType[]
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

  const handleViewProfile = (id: string) =>
    navigate(`/familyofficescontactsprofile/${id}`);

  const handleViewOffices = (id: string) => navigate(`/familyoffices/${id}`);

  const removeFavorite = async (
    id: string,
    type: "family_office" | "family_office_contacts"
  ) => {
    const data = {
      itemType: type,
      itemIds: [id],
      favorited: false,
    };

    try {
      setIsLoading(true);
      await apiClient.post("/favorites/toggle", data);

      if (type === "family_office") {
        setFamilyOffices((prevState) =>
          prevState.filter(({ item_id }) => item_id !== id)
        );
      } else {
        setFamilyOfficesContacts((prevState) =>
          prevState.filter(({ item_id }) => item_id !== id)
        );
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

  const renderEmptyState = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Heart className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-medium text-gray-700 mb-2">
        You don't have any favorites yet
      </h2>
      <p className="text-gray-500 mb-6">
        Add Family offices or Family offices contacts to favorites to find them
        quickly later
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
                          <div
                            key={office.item_id}
                            className="p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <div
                                    className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer"
                                    onClick={() =>
                                      handleViewOffices(office.item_id)
                                    }
                                  >
                                    {office.data.firm_name}
                                  </div>
                                  <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                                    Favorited
                                  </div>
                                </div>

                                <div className="mt-2 space-y-1">
                                  {office.data.firm_type && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                                      {office.data.firm_type}
                                    </div>
                                  )}
                                  {office.data.aum && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                                      AUM: {office.data.aum}
                                    </div>
                                  )}
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                    Added on{" "}
                                    {new Date(
                                      office.created_at
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleViewOffices(office.item_id)
                                  }
                                >
                                  Profile
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() =>
                                    removeFavorite(
                                      office.item_id,
                                      "family_office"
                                    )
                                  }
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

                {familyOfficesContacts.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      Family Offices Contacts
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {familyOfficesContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <div
                                    className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer"
                                    onClick={() =>
                                      handleViewProfile(contact.item_id)
                                    }
                                  >
                                    {contact.data.full_name}
                                  </div>
                                  <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                                    Favorited
                                  </div>
                                </div>

                                <div className="mt-2 space-y-1">
                                  {contact.data.title && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                      {contact.data.title}
                                    </div>
                                  )}
                                  {contact.data.company_id && (
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                                      {contact.data.company_id}
                                    </div>
                                  )}
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                    Added on{" "}
                                    {new Date(
                                      contact.created_at
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleViewProfile(contact.item_id)
                                  }
                                >
                                  Profile
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() =>
                                    removeFavorite(
                                      contact.item_id,
                                      "family_office_contacts"
                                    )
                                  }
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
