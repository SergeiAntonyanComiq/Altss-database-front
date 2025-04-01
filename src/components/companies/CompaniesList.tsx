
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import PersonsPagination from "@/components/personal/PersonsPagination";
import { CompanyType } from "@/types/company";
import CompaniesSearchBar from "./CompaniesSearchBar";
import CompaniesTable from "./CompaniesTable";
import CompaniesTableSkeleton from "./CompaniesTableSkeleton";

const API_BASE_URL = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu";

interface CompaniesListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

const CompaniesList = ({ 
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: CompaniesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define the range of company IDs we'll use for pagination
  const MIN_COMPANY_ID = 1;
  const MAX_COMPANY_ID = 32646;
  const TOTAL_COMPANIES = MAX_COMPANY_ID - MIN_COMPANY_ID + 1;

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

  const handleViewCompany = (id: string) => {
    navigate(`/company/${id}`);
  };

  const toggleCompanySelection = (id: string) => {
    setSelectedCompanies(prev => 
      prev.includes(id)
        ? prev.filter(companyId => companyId !== id)
        : [...prev, id]
    );
  };

  const toggleAllCompanies = () => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(companies.map(company => company.id || ''));
    }
  };

  const isCompanySelected = (id: string | undefined) => id ? selectedCompanies.includes(id) : false;

  const toggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setCompanies(prev => prev.map(company => 
      company.id === id ? { ...company, isFavorite: !company.isFavorite } : company
    ));
  };

  const formatAum = (aumValue: number | string | undefined | null) => {
    if (aumValue === null || aumValue === undefined) {
      return 'N/A';
    }
    
    // Convert string to number if needed
    let numAum: number;
    if (typeof aumValue === 'string') {
      numAum = parseFloat(aumValue);
      if (isNaN(numAum)) {
        return 'N/A';
      }
    } else {
      numAum = aumValue;
    }
    
    if (numAum >= 1000) {
      return `${(numAum / 1000).toFixed(1)}B`;
    }
    return `${numAum.toFixed(1)}M`;
  };

  if (isLoading) {
    return (
      <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
        <h1 className="text-[#111928] text-2xl font-semibold leading-none">Companies</h1>
        <div className="flex gap-4 items-center mt-10">
          {/* Loading state for search bar */}
          <div className="w-full h-11 bg-gray-100 animate-pulse rounded-full"></div>
        </div>
        <CompaniesTableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
        <h1 className="text-[#111928] text-2xl font-semibold leading-none">Companies</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-10">
          <p className="text-red-500">{error}</p>
          <Button 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">Companies</h1>
      
      <CompaniesSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="w-full mt-8">
        <CompaniesTable 
          companies={companies}
          selectedCompanies={selectedCompanies}
          toggleCompanySelection={toggleCompanySelection}
          toggleAllCompanies={toggleAllCompanies}
          handleViewCompany={handleViewCompany}
          toggleFavorite={toggleFavorite}
          formatAum={formatAum}
          isCompanySelected={isCompanySelected}
          isLoading={isLoading}
        />
      </div>
      
      <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-[122px] max-md:mt-10">
        <PersonsPagination 
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          totalItems={TOTAL_COMPANIES} // Add the totalItems prop
        />
      </div>
    </div>
  );
};

export default CompaniesList;
