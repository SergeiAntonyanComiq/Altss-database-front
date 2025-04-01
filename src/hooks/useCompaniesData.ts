
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CompanyType } from "@/types/company";

const API_BASE_URL = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu";

// Define the range of company IDs we'll use for pagination
const MIN_COMPANY_ID = 1;
const MAX_COMPANY_ID = 32646;
const TOTAL_COMPANIES = MAX_COMPANY_ID - MIN_COMPANY_ID + 1;

export function useCompaniesData(currentPage: number, itemsPerPage: number) {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, itemsPerPage]);

  const fetchCompanies = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate the start and end IDs for the current page
      const startId = MIN_COMPANY_ID + (currentPage - 1) * itemsPerPage;
      let endId = startId + itemsPerPage - 1;
      if (endId > MAX_COMPANY_ID) endId = MAX_COMPANY_ID;
      
      // Create an array of IDs for the current page
      const pageIds = Array.from({ length: endId - startId + 1 }, (_, i) => startId + i);
      
      // Fetch companies for these IDs
      const companyPromises = pageIds.map(id => 
        fetch(`${API_BASE_URL}/fund_managers/${id}`)
          .then(response => {
            if (!response.ok) {
              if (response.status === 404) {
                // Not found is expected for some IDs, return null
                return null;
              }
              throw new Error(`Failed to fetch company with ID ${id}`);
            }
            return response.json();
          })
          .catch(err => {
            console.warn(`Error fetching company ${id}:`, err);
            return null; // Skip failed requests
          })
      );
      
      const results = await Promise.all(companyPromises);
      
      // Filter out null results (404s)
      const fetchedCompanies = results
        .filter(company => company !== null)
        .map((company) => {
          return {
            ...company,
            // Make sure we have all required fields for the CompanyType
            id: String(company.id || ''),
            firm_name: company.firm_name || 'N/A',
            name: company.firm_name || 'N/A',
            type: company.firm_type || 'N/A',
            location: `${company.city || 'N/A'}, ${company.state_county || 'N/A'}`,
            employees: company.total_staff ? parseInt(company.total_staff) : 'N/A',
            revenue: `$${Math.floor(Math.random() * 70) + 5}M`, // Mock data as not in API
            status: Math.random() > 0.2 ? 'Active' : 'Inactive', // Mock data as not in API
            aum: company.total_assets_under_management_usd_mn || 
                 company.pe_portfolio_company_maximum_value_usd_mn || 
                 (Math.random() * 3000) + 100,
            foundedYear: company.year_est ? `${company.year_est}` : 'N/A',
            isFavorite: false // Default to not favorite
          };
        });

      // Calculate total pages based on total companies count
      setTotalPages(Math.ceil(TOTAL_COMPANIES / itemsPerPage));
      
      setCompanies(fetchedCompanies);
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
  };

  return { 
    companies, 
    isLoading, 
    error, 
    totalPages,
    TOTAL_COMPANIES
  };
}
