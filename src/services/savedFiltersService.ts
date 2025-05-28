import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import apiClient from "@/lib/axios.ts";
import { UpdateFavorites } from "@/hooks";

export interface FavoriteItem {
  created_at: Date;
  id: number;
  item_id: string;
  user_id: string;
  item_type?: string;
  data: FamilyOffice | FamilyOfficeContact;
}

export type SavedSearchType = {
  created_at: string;
  id: number;
  searchQuery: string;
  table_name: string;
  user_id: string;
};

export type SavedFiltersType = {
  created_at: string;
  id: number;
  filterText: string;
  filterQuery: string;
  table_name: string;
  user_id: string;
};

export interface FavoriteContactType {
  created_at: Date;
  id: number;
  item_id: string;
  user_id: string;
  item_type?: string;
  data: FamilyOfficeContact;
}

export interface FavoriteFamilyOfficeType {
  created_at: Date;
  id: number;
  item_id: string;
  user_id: string;
  item_type?: string;
  data: FamilyOffice;
}

export const getFavorites = async () => {
  try {
    const { data } = await apiClient.get(`favorites`);

    return data;
  } catch (error) {
    new Error(error.message);
  }
};

export const getSavedSearches = async () => {
  try {
    const { data } = await apiClient.get("saved-searches");

    return data;
  } catch (error) {
    new Error(error.message);
  }
};

export const getSavedFilters = async () => {
  try {
    const { data } = await apiClient.get("saved-filters");

    return data;
  } catch (error) {
    new Error(error.message);
  }
};

export const deleteSavedSearches = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/saved-searches/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteSavedFilters = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/saved-filters/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteFavorite = async (
  id: string,
  type: "family_office" | "family_office_contacts"
): Promise<boolean> => {
  const data = {
    itemType: type,
    itemIds: [id],
    favorited: false,
  };

  try {
    await apiClient.post("/favorites/toggle", data);

    return true;
  } catch (error) {
    return false;
  }
};

export const updateFavoritesData = async (data: UpdateFavorites) => {
  try {
    await apiClient.post("/favorites/toggle", data);
  } catch (error) {
    new Error(error.message);
  }
};

export const updateSavedSearchesData = async (
  searchQuery: string,
  tableName: "family_office" | "family_office_contacts"
) => {
  try {
    await apiClient.post("/saved-searches", {
      searchQuery,
      table_name: tableName,
    });
  } catch (error) {
    new Error(error.message);
  }
};

export const updateSavedFiltersData = async (
  filter: string,
  tableName: "family_office" | "family_office_contacts"
) => {
  try {
    await apiClient.post("/saved-filters", {
      filterText: filter,
      table_name: tableName,
    });
  } catch (error) {
    new Error(error.message);
  }
};
