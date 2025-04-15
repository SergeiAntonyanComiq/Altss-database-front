import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CompanyType } from "@/types/company";
import { 
  fetchFilteredFundManagers, 
  fetchFundManagersCount 
} from "@/services/fundManagersService";
import { getFavoriteCompanies } from "@/services/savedFiltersService";

export function useCompaniesData(currentPage: number, itemsPerPage: number) {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { toast } = useToast();

  const fetchCompaniesData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      
      const response = await fetchFilteredFundManagers({
        limit: itemsPerPage,
        offset: offset,
        sortBy: "firm_name"
      });
      
      console.log(`Fetched ${response.data.length} companies for page ${currentPage}`);
      
      // Fetch favorite companies
      const favorites = await getFavoriteCompanies();
      const favoriteIds = new Set(favorites.map(f => f.id));

      // Mark companies as favorites if they're in the favorites list
      const companiesWithFavorites = response.data.map(company => ({
        ...company,
        isFavorite: favoriteIds.has(company.id || '')
      }));

      setCompanies(companiesWithFavorites);
      setTotalItems(response.total);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("Failed to load companies. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load companies. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, toast]);

  useEffect(() => {
    fetchCompaniesData();
  }, [fetchCompaniesData]);

  // Fetch total count once on component mount
  useEffect(() => {
    fetchTotalCount();
  }, []);

  const fetchTotalCount = async () => {
    try {
      const total = await fetchFundManagersCount();
      setTotalItems(total);
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (err) {
      console.error("Error fetching total companies count:", err);
      toast({
        title: "Error",
        description: "Could not fetch total companies count. Pagination may be inaccurate.",
        variant: "destructive",
      });
    }
  };


  return { 
    companies, 
    isLoading, 
    error, 
    totalPages,
    totalItems
  };
}
