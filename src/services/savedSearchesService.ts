
import { supabase } from "@/integrations/supabase/client";
import { SavedFilterType } from "@/components/personal/filters/hooks/useFilterModal";
import { useToast } from "@/components/ui/use-toast";
import { Json } from "@/integrations/supabase/types";

export interface SavedSearchType {
  id: string;
  name: string;
  filter_data: {
    firmTypes: string[];
    searchQuery?: string;
  };
  created_at: string;
}

/**
 * Saves a search filter to the database
 */
export const saveSearchToDatabase = async (
  name: string, 
  filterData: { 
    firmTypes: string[];
    searchQuery?: string;
  }
): Promise<SavedSearchType | null> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("No authenticated user found");
      return null;
    }
    
    const { data, error } = await supabase
      .from("saved_searches")
      .insert([
        {
          name,
          filter_data: filterData,
          user_id: user.id
        },
      ])
      .select()
      .single();
    
    if (error) {
      console.error("Error saving search:", error);
      return null;
    }
    
    // Cast the data to our expected type
    return {
      id: data.id,
      name: data.name,
      filter_data: data.filter_data as { firmTypes: string[], searchQuery?: string },
      created_at: data.created_at
    };
  } catch (err) {
    console.error("Exception saving search:", err);
    return null;
  }
};

/**
 * Gets all saved searches for the current user
 */
export const getSavedSearchesFromDatabase = async (): Promise<SavedSearchType[]> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("No authenticated user found");
      return [];
    }
    
    const { data, error } = await supabase
      .from("saved_searches")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching saved searches:", error);
      return [];
    }
    
    // Cast the data to our expected type
    return data.map(item => ({
      id: item.id,
      name: item.name,
      filter_data: item.filter_data as { firmTypes: string[], searchQuery?: string },
      created_at: item.created_at
    }));
  } catch (err) {
    console.error("Exception fetching saved searches:", err);
    return [];
  }
};

/**
 * Deletes a saved search by ID
 */
export const deleteSavedSearch = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("saved_searches")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Error deleting saved search:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Exception deleting saved search:", err);
    return false;
  }
};

// Converting between local storage and database formats
export const convertDbSavedSearchToLocalFormat = (dbSearch: SavedSearchType): SavedFilterType => {
  return {
    id: dbSearch.id,
    name: dbSearch.name,
    firmTypes: dbSearch.filter_data.firmTypes || [],
    createdAt: new Date(dbSearch.created_at).getTime()
  };
};

export const convertLocalSavedSearchesToDbFormat = (localSearch: SavedFilterType): Omit<SavedSearchType, 'id' | 'created_at'> => {
  return {
    name: localSearch.name,
    filter_data: {
      firmTypes: localSearch.firmTypes
    }
  };
};

// For backward compatibility with localStorage
export const getSavedFilters = (): SavedFilterType[] => {
  const savedFiltersJson = localStorage.getItem('saved_filters');
  return savedFiltersJson ? JSON.parse(savedFiltersJson) : [];
};

export const saveFilter = (name: string, firmTypes: string[]): SavedFilterType => {
  const filters = getSavedFilters();
  
  const newFilter: SavedFilterType = {
    id: Date.now().toString(),
    name,
    firmTypes,
    createdAt: Date.now()
  };
  
  filters.push(newFilter);
  localStorage.setItem('saved_filters', JSON.stringify(filters));
  
  // Also save to database if the user is logged in
  saveSearchToDatabase(name, { firmTypes });
  
  return newFilter;
};

export const updateSavedFilter = (id: string, name: string, firmTypes: string[]): SavedFilterType | null => {
  const filters = getSavedFilters();
  const filterIndex = filters.findIndex(filter => filter.id === id);
  
  if (filterIndex === -1) return null;
  
  const updatedFilter: SavedFilterType = {
    ...filters[filterIndex],
    name,
    firmTypes,
  };
  
  filters[filterIndex] = updatedFilter;
  localStorage.setItem('saved_filters', JSON.stringify(filters));
  
  return updatedFilter;
};

export const deleteSavedFilterLocal = (id: string): boolean => {
  const filters = getSavedFilters();
  const updatedFilters = filters.filter(filter => filter.id !== id);
  
  if (updatedFilters.length === filters.length) {
    return false;
  }
  
  localStorage.setItem('saved_filters', JSON.stringify(updatedFilters));
  return true;
};
