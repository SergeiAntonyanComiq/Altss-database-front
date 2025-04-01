
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

/**
 * Creates default filters if they don't exist
 */
export const saveDefaultFilters = (): void => {
  const filters = getSavedFilters();
  
  // Only add default filters if no filters exist
  if (filters.length === 0) {
    // Add Family Office - Single filter
    const singleFamilyFilter: SavedFilter = {
      id: "default-single-family",
      name: "Family Office - Single",
      firmTypes: ["Family Office - Single"],
      createdAt: Date.now()
    };
    
    // Add Family Office - Multi filter
    const multiFamilyFilter: SavedFilter = {
      id: "default-multi-family",
      name: "Family Office - Multi",
      firmTypes: ["Family Office - Multi"],
      createdAt: Date.now() + 1 // +1 to ensure unique timestamps
    };
    
    filters.push(singleFamilyFilter, multiFamilyFilter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }
};

/**
 * Gets a saved filter by ID
 */
export const getSavedFilterById = (id: string): SavedFilter | null => {
  const filters = getSavedFilters();
  return filters.find(filter => filter.id === id) || null;
};
