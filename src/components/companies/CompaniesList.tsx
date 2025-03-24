
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Save, Heart, LayoutGrid } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import PersonsPagination from "@/components/personal/PersonsPagination";
import { CompanyType } from "@/types/company";

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
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Companies</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-4 p-4">
            <div className="relative flex-1">
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F6F6F7] hover:bg-[#F6F6F7]">
                  <TableHead className="w-12"><Skeleton className="h-4 w-4 mx-auto" /></TableHead>
                  <TableHead className="font-medium text-[#343C6A]">Company Name</TableHead>
                  <TableHead className="font-medium text-[#343C6A]">Company Type</TableHead>
                  <TableHead className="font-medium text-[#343C6A]">AUM, $mln.</TableHead>
                  <TableHead className="font-medium text-[#343C6A]">Founded year</TableHead>
                  <TableHead className="font-medium text-[#343C6A]">Known Team</TableHead>
                  <TableHead className="w-12"><Skeleton className="h-4 w-4 mx-auto" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 9 }).map((_, index) => (
                  <TableRow key={index} className="border-t border-gray-100">
                    <TableCell className="p-3"><Skeleton className="h-4 w-4" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Companies</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
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
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex items-center gap-4 p-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search the company"
              className="pl-10 w-full border-gray-200 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <Button variant="outline" className="gap-2 text-gray-500 border-gray-200">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <Button variant="outline" className="gap-2 text-gray-500 border-gray-200">
            <Save className="h-4 w-4" />
            Save this Search
          </Button>
          
          <Button variant="outline" className="gap-2 text-gray-500 border-gray-200">
            <Heart className="h-4 w-4" />
            Add to Favorites
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F6F6F7] hover:bg-[#F6F6F7]">
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedCompanies.length === companies.length && companies.length > 0} 
                    onCheckedChange={toggleAllCompanies}
                  />
                </TableHead>
                <TableHead className="font-medium text-[#343C6A]">Company Name</TableHead>
                <TableHead className="font-medium text-[#343C6A]">Company Type</TableHead>
                <TableHead className="font-medium text-[#343C6A]">Location</TableHead>
                <TableHead className="font-medium text-[#343C6A]">AUM, $mln.</TableHead>
                <TableHead className="font-medium text-[#343C6A]">Founded year</TableHead>
                <TableHead className="font-medium text-[#343C6A]">Staff Count</TableHead>
                <TableHead className="w-12">
                  <LayoutGrid className="h-4 w-4 mx-auto text-gray-500" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow 
                  key={company.id} 
                  className="border-t border-gray-100 cursor-pointer hover:bg-blue-50"
                  onClick={() => handleViewCompany(company.id || '')}
                >
                  <TableCell className="p-3">
                    <Checkbox 
                      checked={isCompanySelected(company.id)}
                      onCheckedChange={() => toggleCompanySelection(company.id || '')}
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-[#343C6A] flex items-center">
                    {company.firm_name}
                    <button 
                      className="ml-2"
                      onClick={(e) => toggleFavorite(company.id || '', e)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${company.isFavorite ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`} 
                      />
                    </button>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[#EEF0F7] text-[#343C6A] hover:bg-[#EEF0F7] rounded-full font-medium">
                      {company.firm_type || company.type || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {company.city ? `${company.city}, ${company.country || company.state_county || ''}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {formatAum(company.aum)}
                  </TableCell>
                  <TableCell>
                    {company.year_est || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {company.total_staff || 'N/A'}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              
              {companies.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No companies found for the current page
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <PersonsPagination 
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
