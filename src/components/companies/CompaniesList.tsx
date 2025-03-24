import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Save, Heart, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LayoutGrid } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CompanyType } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu";

const CompaniesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const companyIds = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const companyPromises = companyIds.map(id => 
          fetch(`${API_BASE_URL}/fund_managers/${id}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch company with ID ${id}`);
              }
              return response.json();
            })
        );
        
        const results = await Promise.allSettled(companyPromises);
        
        const fetchedCompanies = results
          .filter(result => result.status === 'fulfilled')
          .map((result, index) => {
            const company = (result as PromiseFulfilledResult<any>).value;
            return {
              ...company,
              id: String(companyIds[index]),
              name: company.firm_name,
              type: company.firm_type || 'Family Office',
              location: `${company.city || ''}, ${company.state_county || ''}`,
              employees: Math.floor(Math.random() * 800) + 50,
              revenue: `$${Math.floor(Math.random() * 70) + 5}M`,
              status: Math.random() > 0.2 ? 'Active' : 'Inactive',
              aum: company.total_assets_under_management_usd_mn || 
                  company.pe_portfolio_company_maximum_value_usd_mn || 
                  (Math.random() * 3000) + 100,
              foundedYear: company.year_est ? `${company.year_est} y.` : '2000 y.',
              team: ["Jonny Smitter"],
              isFavorite: Math.random() > 0.7
            };
          });
        
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

    fetchCompanies();
  }, [toast]);

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

  const formatAum = (aum: number | string | undefined | null) => {
    if (aum === null || aum === undefined || isNaN(Number(aum))) {
      return 'N/A';
    }
    const numAum = typeof aum === 'string' ? parseFloat(aum) : aum;
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
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                <TableHead className="font-medium text-[#343C6A]">AUM, $mln.</TableHead>
                <TableHead className="font-medium text-[#343C6A]">Founded year</TableHead>
                <TableHead className="font-medium text-[#343C6A]">Known Team</TableHead>
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
                    {company.firm_name || company.name}
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
                      {company.firm_type || company.type || 'Family Office'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {company.aum !== undefined ? formatAum(company.aum) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {company.foundedYear || (company.year_est ? `${company.year_est} y.` : 'N/A')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {company.team && company.team.length > 0 ? (
                        <>
                          <Badge className="bg-[#EEF0F7] text-blue-600 hover:bg-[#EEF0F7] rounded-full font-medium mr-2">
                            {company.team[0]}
                          </Badge>
                          {company.team.length > 1 && (
                            <Badge className="bg-[#EEF0F7] text-blue-600 hover:bg-[#EEF0F7] rounded-full font-medium">
                              +{company.team.length - 1}
                            </Badge>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">No team data</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 flex justify-between items-center border-t border-gray-100">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}>
                  <ChevronsLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(Math.max(1, currentPage - 1)); }}>
                  <ChevronLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
              
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive onClick={(e) => { e.preventDefault(); setCurrentPage(2); }}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(3); }}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(4); }}>
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(5); }}>
                  5
                </PaginationLink>
              </PaginationItem>
              
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(12); }}>
                  12
                </PaginationLink>
              </PaginationItem>
              
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(Math.min(12, currentPage + 1)); }}>
                  <ChevronRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(12); }}>
                  <ChevronsRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">50 results per page</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
