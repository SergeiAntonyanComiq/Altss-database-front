
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CompanyType } from "@/types/company";

const API_BASE_URL = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu";

// Define the range of company IDs we'll use for pagination
const MIN_COMPANY_ID = 1;
const MAX_COMPANY_ID = 32646;
const TOTAL_COMPANIES = MAX_COMPANY_ID - MIN_COMPANY_ID + 1;

// Define the range for the enriched data
const ENRICHED_MIN_ID = 1;
const ENRICHED_MAX_ID = 60;

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
      let allCompanies: CompanyType[] = [];
      
      // First fetch from the enriched endpoint for IDs 1-60
      if (currentPage === 1) {
        // On first page, include enriched data
        const startEnrichedId = ENRICHED_MIN_ID;
        const endEnrichedId = Math.min(
          ENRICHED_MAX_ID,
          startEnrichedId + itemsPerPage - 1
        );
        
        // Create an array of IDs for the enriched data
        const enrichedIds = Array.from(
          { length: endEnrichedId - startEnrichedId + 1 }, 
          (_, i) => startEnrichedId + i
        );
        
        // Fetch enriched companies data
        const enrichedPromises = enrichedIds.map(id =>
          fetch(`${API_BASE_URL}/enrich_final/${id}`)
            .then(response => {
              if (!response.ok) {
                if (response.status === 404) {
                  return null;
                }
                throw new Error(`Failed to fetch enriched company with ID ${id}`);
              }
              return response.json();
            })
            .catch(err => {
              console.warn(`Error fetching enriched company ${id}:`, err);
              return null;
            })
        );
        
        const enrichedResults = await Promise.all(enrichedPromises);
        
        // Filter out null results and normalize data
        const enrichedCompanies = enrichedResults
          .filter(company => company !== null)
          .map((company) => {
            return normalizeCompanyData(company);
          });
          
        allCompanies = [...enrichedCompanies];
        
        // If we need more data to fill the page, fetch from the regular endpoint
        const remainingItems = itemsPerPage - allCompanies.length;
        
        if (remainingItems > 0) {
          const regularCompanies = await fetchRegularCompanies(
            MIN_COMPANY_ID + ENRICHED_MAX_ID, 
            remainingItems
          );
          allCompanies = [...allCompanies, ...regularCompanies];
        }
      } else {
        // For subsequent pages, calculate the start ID after the enriched data
        const startId = MIN_COMPANY_ID + ENRICHED_MAX_ID + (currentPage - 2) * itemsPerPage;
        const endId = startId + itemsPerPage - 1;
        
        allCompanies = await fetchRegularCompanies(startId, itemsPerPage);
      }

      // Calculate total pages - need to account for enriched data in calculation
      setTotalPages(Math.ceil((TOTAL_COMPANIES) / itemsPerPage));
      
      setCompanies(allCompanies);
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

  // Helper function to fetch from regular endpoint
  const fetchRegularCompanies = async (startId: number, count: number): Promise<CompanyType[]> => {
    let endId = startId + count - 1;
    if (endId > MAX_COMPANY_ID) endId = MAX_COMPANY_ID;
    
    // Create an array of IDs for the regular data
    const pageIds = Array.from({ length: endId - startId + 1 }, (_, i) => startId + i);
    
    const companyPromises = pageIds.map(id => 
      fetch(`${API_BASE_URL}/fund_managers/${id}`)
        .then(response => {
          if (!response.ok) {
            if (response.status === 404) {
              return null;
            }
            throw new Error(`Failed to fetch company with ID ${id}`);
          }
          return response.json();
        })
        .catch(err => {
          console.warn(`Error fetching company ${id}:`, err);
          return null;
        })
    );
    
    const results = await Promise.all(companyPromises);
    
    // Filter out null results and normalize data
    return results
      .filter(company => company !== null)
      .map((company) => {
        return normalizeCompanyData(company);
      });
  };

  // Helper function to normalize company data across both endpoints
  const normalizeCompanyData = (company: any): CompanyType => {
    // For enriched endpoint, use firm_id if available
    // For regular endpoint, use id as the firm_id
    const firmId = company.firm_id || company.id;
    
    return {
      ...company,
      id: String(company.id || ''), // Keep original ID for UI operations
      firm_id: firmId,    // Explicitly set firm_id for API calls and navigation
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
  };

  return { 
    companies, 
    isLoading, 
    error, 
    totalPages,
    TOTAL_COMPANIES
  };
}
