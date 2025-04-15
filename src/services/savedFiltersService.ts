import { supabase } from "@/integrations/supabase/client";

interface SavedFilter {
  id: string;
  name: string;
  firmTypes: string[];
  companyName?: string;
  position?: string;
  location?: string;
  responsibilities?: string;
  bio?: string;
  createdAt: number;
  description?: string;
}

// Export SavedFilter as SavedSearchType for compatibility
export type SavedSearchType = SavedFilter;

export interface FavoritePersonType {
  id: string;
  name: string;
  position?: string;
  company?: string;
  addedAt: number;
}

export interface FavoriteCompanyType {
  id: string;
  name: string;
  type?: string;
  aum?: string;
  addedAt: number;
}

// Fallback to localStorage for offline or error cases
const STORAGE_KEY = 'saved_filters';
const FAVORITES_PERSONS_KEY = 'favorites_persons';
const FAVORITES_COMPANIES_KEY = 'favorites_companies';

// Helper function to get current user ID
const getUserId = async (): Promise<string | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || null;
};

/**
 * Gets all saved filters from Supabase, falls back to localStorage if offline
 */
export const getSavedFilters = async (): Promise<SavedFilter[]> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('saved_filters')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(filter => ({
      id: filter.id,
      name: filter.name,
      firmTypes: filter.firm_types || [],
      companyName: filter.company_name,
      position: filter.position,
      location: filter.location,
      responsibilities: filter.responsibilities,
      bio: filter.bio,
      createdAt: new Date(filter.created_at).getTime()
    }));
  } catch (error) {
    console.error("Error fetching filters from Supabase:", error);
    
    // Fallback to localStorage
  const savedFiltersJson = localStorage.getItem(STORAGE_KEY);
  return savedFiltersJson ? JSON.parse(savedFiltersJson) : [];
  }
};

/**
 * Saves a new filter to Supabase
 */
export const saveFilter = async (
  name: string, 
  firmTypes: string[], 
  companyName?: string,
  position?: string,
  location?: string,
  responsibilities?: string,
  bio?: string
): Promise<SavedFilter> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const newFilter = {
      name,
      firm_types: Array.isArray(firmTypes) ? firmTypes : [],
      company_name: companyName,
      position,
      location,
      responsibilities,
      bio,
      user_id: userId,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('saved_filters')
      .insert(newFilter)
      .select('id, created_at')
      .single();

    if (error) throw error;

    // Return the created filter with its ID
    const createdFilter: SavedFilter = {
      id: data.id,
      name,
      firmTypes,
      companyName,
      position,
      location,
      responsibilities,
      bio,
      createdAt: new Date(data.created_at).getTime()
    };

    // Also save to localStorage as backup
    const filters = await getSavedFilters();
    filters.push(createdFilter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));

    return createdFilter;
  } catch (error) {
    console.error("Error saving filter to Supabase:", error);
    
    // Fallback to localStorage-only operation
    const filters = await getSavedFilters();
  const newFilter: SavedFilter = {
    id: Date.now().toString(),
    name,
    firmTypes,
    companyName,
      position,
      location,
      responsibilities,
      bio,
    createdAt: Date.now()
  };
  
  filters.push(newFilter);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  
  return newFilter;
  }
};

/**
 * Updates an existing saved filter
 */
export const updateSavedFilter = async (
  id: string, 
  name: string, 
  firmTypes: string[],
  companyName?: string,
  position?: string,
  location?: string,
  responsibilities?: string,
  bio?: string
): Promise<SavedFilter | null> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('saved_filters')
      .update({
        name,
        firm_types: Array.isArray(firmTypes) ? firmTypes : [],
        company_name: companyName,
        position,
        location,
        responsibilities,
        bio,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    // Return the updated filter
    const updatedFilter: SavedFilter = {
      id,
      name,
      firmTypes,
      companyName,
      position,
      location,
      responsibilities,
      bio,
      createdAt: Date.now() // We don't have the original creation time, using update time
    };

    // Update localStorage backup
    const filters = await getSavedFilters();
    const updatedFilters = filters.map(filter => 
      filter.id === id ? updatedFilter : filter
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFilters));

    return updatedFilter;
  } catch (error) {
    console.error("Error updating filter in Supabase:", error);
    
    // Fallback to localStorage-only operation
    const filters = await getSavedFilters();
  const filterIndex = filters.findIndex(filter => filter.id === id);
  
  if (filterIndex === -1) return null;
  
  const updatedFilter: SavedFilter = {
    ...filters[filterIndex],
    name,
    firmTypes,
      companyName,
      position,
      location,
      responsibilities,
      bio
  };
  
  filters[filterIndex] = updatedFilter;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  
  return updatedFilter;
  }
};

/**
 * Deletes a saved filter by ID
 */
export const deleteSavedFilter = async (id: string): Promise<boolean> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('saved_filters')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    // Update localStorage backup
    const filters = await getSavedFilters();
    const updatedFilters = filters.filter(filter => filter.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFilters));

    return true;
  } catch (error) {
    console.error("Error deleting filter from Supabase:", error);
    
    // Fallback to localStorage-only operation
    const filters = await getSavedFilters();
  const updatedFilters = filters.filter(filter => filter.id !== id);
  
  if (updatedFilters.length === filters.length) {
    return false;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFilters));
  return true;
  }
};

/**
 * Creates default filters if they don't exist
 */
export const saveDefaultFilters = (): void => {
  const filters = getSavedFilters();
  
  // Only add default filters if no filters exist
  if (filters.length === 0) {
    // Default filters are no longer needed
    // We previously had default "Family Office - Single" and "Family Office - Multi" filters
    // But according to requirements, we should remove them
  }
};

/**
 * Gets a saved filter by ID
 */
export const getSavedFilterById = async (id: string): Promise<SavedFilter | null> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('saved_filters')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      firmTypes: data.firm_types || [],
      companyName: data.company_name,
      position: data.position,
      location: data.location,
      responsibilities: data.responsibilities,
      bio: data.bio,
      createdAt: new Date(data.created_at).getTime()
    };
  } catch (error) {
    console.error("Error fetching filter from Supabase:", error);
    
    // Fallback to localStorage
    const filters = await getSavedFilters();
  return filters.find(filter => filter.id === id) || null;
  }
};

// ---- Favorites Management ----

/**
 * Gets all favorite persons from Supabase
 */
export const getFavoritePersons = async (): Promise<FavoritePersonType[]> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('favorite_persons')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    if (error) throw error;

    return data.map(favorite => ({
      id: favorite.contact_id,
      name: favorite.name,
      position: favorite.position,
      company: favorite.company,
      addedAt: new Date(favorite.added_at).getTime()
    }));
  } catch (error) {
    console.error("Error fetching favorites from Supabase:", error);
    
    // Fallback to localStorage
    const favoritesJson = localStorage.getItem(FAVORITES_PERSONS_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }
};

/**
 * Adds a person to favorites in Supabase
 */
export const addPersonToFavorites = async (
  id: string,
  name: string,
  position?: string,
  company?: string
): Promise<FavoritePersonType> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if already in favorites without using .single()
    const { data: existingDataArray, error: checkError } = await supabase
      .from('favorite_persons')
      .select('*')
      .eq('user_id', userId)
      .eq('contact_id', id)
      .limit(1); // Limit to 1 result, just checking for existence

    if (checkError) {
      throw checkError;
    }

    // Check if the array has any data
    if (existingDataArray && existingDataArray.length > 0) {
      const existingData = existingDataArray[0]; // Get the first (and only) item
      console.log("Person already in favorites:", id);
      return {
        id,
        name: existingData.name,
        position: existingData.position,
        company: existingData.company,
        addedAt: new Date(existingData.added_at).getTime()
      };
    }

    // Not in favorites, add it
    console.log("Adding person to favorites:", id);
    const newFavorite = {
      user_id: userId,
      contact_id: id,
      name,
      position,
      company,
      added_at: new Date().toISOString()
    };

    const { error: insertError } = await supabase
      .from('favorite_persons')
      .insert(newFavorite);

    if (insertError) throw insertError;

    // Return the created favorite
    const createdFavorite: FavoritePersonType = {
      id,
      name,
      position,
      company,
      addedAt: Date.now()
    };

    // Also update localStorage as backup
    const favorites = await getFavoritePersons();
    favorites.push(createdFavorite);
    localStorage.setItem(FAVORITES_PERSONS_KEY, JSON.stringify(favorites));

    return createdFavorite;
  } catch (error) {
    console.error("Error adding favorite to Supabase:", error);
    
    // Fallback to localStorage-only operation
    const favorites = await getFavoritePersons();
    
    // Check if person is already in favorites in localStorage
    if (favorites.some(fav => fav.id === id)) {
      return favorites.find(fav => fav.id === id)!;
    }
    
    const newFavorite: FavoritePersonType = {
      id,
      name,
      position,
      company,
      addedAt: Date.now()
    };
    
    favorites.push(newFavorite);
    localStorage.setItem(FAVORITES_PERSONS_KEY, JSON.stringify(favorites));
    
    return newFavorite;
  }
};

/**
 * Removes a person from favorites in Supabase
 */
export const removePersonFromFavorites = async (id: string): Promise<boolean> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('favorite_persons')
      .delete()
      .eq('user_id', userId)
      .eq('contact_id', id);

    if (error) throw error;

    // Update localStorage backup
    const favorites = await getFavoritePersons();
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem(FAVORITES_PERSONS_KEY, JSON.stringify(updatedFavorites));

    return true;
  } catch (error) {
    console.error("Error removing favorite from Supabase:", error);
    
    // Fallback to localStorage-only operation
    const favorites = await getFavoritePersons();
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    
    if (updatedFavorites.length === favorites.length) {
      return false;
    }
    
    localStorage.setItem(FAVORITES_PERSONS_KEY, JSON.stringify(updatedFavorites));
    return true;
  }
};

/**
 * Checks if a person is in favorites by querying Supabase
 */
export const isPersonInFavorites = async (id: string): Promise<boolean> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('favorite_persons')
      .select('contact_id')
      .eq('user_id', userId)
      .eq('contact_id', id);

    if (error) throw error;

    return data.length > 0;
  } catch (error) {
    console.error("Error checking favorites in Supabase:", error);
    
    // Fallback to localStorage
    const favorites = await getFavoritePersons();
    return favorites.some(fav => fav.id === id);
  }
};

/**
 * Gets all favorite companies from Supabase
 */
export const getFavoriteCompanies = async (): Promise<FavoriteCompanyType[]> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('favorite_companies')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    if (error) throw error;

    return data.map(favorite => ({
      id: favorite.company_id,
      name: favorite.name,
      type: favorite.type,
      aum: favorite.aum,
      addedAt: new Date(favorite.added_at).getTime()
    }));
  } catch (error) {
    console.error("Error fetching company favorites from Supabase:", error);
    
    // Fallback to localStorage
    const favoritesJson = localStorage.getItem(FAVORITES_COMPANIES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }
};

/**
 * Adds a company to favorites in Supabase
 */
export const addCompanyToFavorites = async (
  id: string,
  name: string,
  type?: string,
  aum?: string
): Promise<FavoriteCompanyType> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if already in favorites
    const { data: existingDataArray, error: checkError } = await supabase
      .from('favorite_companies')
      .select('*')
      .eq('user_id', userId)
      .eq('company_id', id)
      .limit(1);

    if (checkError) {
      throw checkError;
    }

    if (existingDataArray && existingDataArray.length > 0) {
      const existingData = existingDataArray[0];
      console.log("Company already in favorites:", id);
      return {
        id,
        name: existingData.name,
        type: existingData.type,
        aum: existingData.aum,
        addedAt: new Date(existingData.added_at).getTime()
      };
    }

    // Not in favorites, add it
    console.log("Adding company to favorites:", id);
    const newFavorite = {
      user_id: userId,
      company_id: id,
      name,
      type,
      aum,
      added_at: new Date().toISOString()
    };

    const { error: insertError } = await supabase
      .from('favorite_companies')
      .insert(newFavorite);

    if (insertError) throw insertError;

    // Return the created favorite
    const createdFavorite: FavoriteCompanyType = {
      id,
      name,
      type,
      aum,
      addedAt: Date.now()
    };

    // Also update localStorage as backup
    const favorites = await getFavoriteCompanies();
    favorites.push(createdFavorite);
    localStorage.setItem(FAVORITES_COMPANIES_KEY, JSON.stringify(favorites));

    return createdFavorite;
  } catch (error) {
    console.error("Error adding company favorite to Supabase:", error);
    
    // Fallback to localStorage-only operation
    const favorites = await getFavoriteCompanies();
    
    // Check if company is already in favorites in localStorage
    if (favorites.some(fav => fav.id === id)) {
      return favorites.find(fav => fav.id === id)!;
    }
    
    const newFavorite: FavoriteCompanyType = {
      id,
      name,
      type,
      aum,
      addedAt: Date.now()
    };
    
    favorites.push(newFavorite);
    localStorage.setItem(FAVORITES_COMPANIES_KEY, JSON.stringify(favorites));
    
    return newFavorite;
  }
};

/**
 * Removes a company from favorites in Supabase
 */
export const removeCompanyFromFavorites = async (id: string): Promise<boolean> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('favorite_companies')
      .delete()
      .eq('user_id', userId)
      .eq('company_id', id);

    if (error) throw error;

    // Update localStorage backup
    const favorites = await getFavoriteCompanies();
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem(FAVORITES_COMPANIES_KEY, JSON.stringify(updatedFavorites));

    return true;
  } catch (error) {
    console.error("Error removing company favorite from Supabase:", error);
    
    // Fallback to localStorage-only operation
    const favorites = await getFavoriteCompanies();
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    
    if (updatedFavorites.length === favorites.length) {
      return false;
    }
    
    localStorage.setItem(FAVORITES_COMPANIES_KEY, JSON.stringify(updatedFavorites));
    return true;
  }
};

/**
 * Checks if a company is in favorites by querying Supabase
 */
export const isCompanyInFavorites = async (id: string): Promise<boolean> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('favorite_companies')
      .select('company_id')
      .eq('user_id', userId)
      .eq('company_id', id);

    if (error) throw error;

    return data.length > 0;
  } catch (error) {
    console.error("Error checking company favorites in Supabase:", error);
    
    // Fallback to localStorage
    const favorites = await getFavoriteCompanies();
    return favorites.some(fav => fav.id === id);
  }
};

// Sync localStorage with Supabase on startup
export const syncWithSupabase = async (): Promise<void> => {
  try {
    const userId = await getUserId();
    if (!userId) return; // Not logged in
    
    // Sync saved filters
    const localFilters = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const remoteFilters = await getSavedFilters();
    
    // Merge filters that exist locally but not in Supabase
    for (const localFilter of localFilters) {
      if (!remoteFilters.some(rf => rf.id === localFilter.id)) {
        await saveFilter(
          localFilter.name,
          localFilter.firmTypes,
          localFilter.companyName,
          localFilter.position,
          localFilter.location,
          localFilter.responsibilities,
          localFilter.bio
        );
      }
    }
    
    // Sync favorites
    const localFavorites = JSON.parse(localStorage.getItem(FAVORITES_PERSONS_KEY) || '[]');
    const remoteFavorites = await getFavoritePersons();
    
    // Merge favorites that exist locally but not in Supabase
    for (const localFav of localFavorites) {
      if (!remoteFavorites.some(rf => rf.id === localFav.id)) {
        await addPersonToFavorites(
          localFav.id,
          localFav.name,
          localFav.position,
          localFav.company
        );
      }
    }
  } catch (error) {
    console.error("Error syncing with Supabase:", error);
  }
    
    // Sync company favorites
    const localCompanyFavorites = JSON.parse(localStorage.getItem(FAVORITES_COMPANIES_KEY) || '[]');
    const remoteCompanyFavorites = await getFavoriteCompanies();
    
    // Merge company favorites that exist locally but not in Supabase
    for (const localFav of localCompanyFavorites) {
      if (!remoteCompanyFavorites.some(rf => rf.id === localFav.id)) {
        await addCompanyToFavorites(
          localFav.id,
          localFav.name,
          localFav.type,
          localFav.aum
        );
      }
    }
};
