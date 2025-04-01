
import { SavedFilterType } from "@/components/personal/filters/hooks/useFilterModal";
import { deleteSavedSearch } from "./savedSearchesService";

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

export const deleteSavedFilter = (id: string): boolean => {
  const filters = getSavedFilters();
  const updatedFilters = filters.filter(filter => filter.id !== id);
  
  if (updatedFilters.length === filters.length) {
    return false;
  }
  
  localStorage.setItem('saved_filters', JSON.stringify(updatedFilters));
  
  // Also try to delete from database if it exists there
  try {
    deleteSavedSearch(id);
  } catch (err) {
    console.error("Could not delete saved search from database:", err);
  }
  
  return true;
};
