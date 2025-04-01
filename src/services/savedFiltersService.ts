
interface SavedFilter {
  id: string;
  name: string;
  firmTypes: string[];
  createdAt: number;
}

const STORAGE_KEY = 'saved_filters';

/**
 * Gets all saved filters from localStorage
 */
export const getSavedFilters = (): SavedFilter[] => {
  const savedFiltersJson = localStorage.getItem(STORAGE_KEY);
  return savedFiltersJson ? JSON.parse(savedFiltersJson) : [];
};

/**
 * Saves a new filter to localStorage
 */
export const saveFilter = (name: string, firmTypes: string[]): SavedFilter => {
  const filters = getSavedFilters();
  
  const newFilter: SavedFilter = {
    id: Date.now().toString(),
    name,
    firmTypes,
    createdAt: Date.now()
  };
  
  filters.push(newFilter);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  
  return newFilter;
};

/**
 * Updates an existing saved filter
 */
export const updateSavedFilter = (id: string, name: string, firmTypes: string[]): SavedFilter | null => {
  const filters = getSavedFilters();
  const filterIndex = filters.findIndex(filter => filter.id === id);
  
  if (filterIndex === -1) return null;
  
  const updatedFilter: SavedFilter = {
    ...filters[filterIndex],
    name,
    firmTypes,
  };
  
  filters[filterIndex] = updatedFilter;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  
  return updatedFilter;
};

/**
 * Deletes a saved filter by ID
 */
export const deleteSavedFilter = (id: string): boolean => {
  const filters = getSavedFilters();
  const updatedFilters = filters.filter(filter => filter.id !== id);
  
  if (updatedFilters.length === filters.length) {
    return false;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFilters));
  return true;
};
