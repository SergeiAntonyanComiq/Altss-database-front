
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Save, Heart, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LayoutGrid } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CompanyType } from "@/types/company";

// Mock data for companies
const mockCompanies: CompanyType[] = [
  { 
    id: "1", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "San Francisco, CA",
    employees: 250,
    revenue: "$25M",
    status: "Active",
    aum: 567.8,
    foundedYear: "1990 y.",
    team: ["Jonny Smitter"],
    isFavorite: false
  },
  { 
    id: "2", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "Boston, MA",
    employees: 120,
    revenue: "$12M",
    status: "Active",
    aum: 999.34,
    foundedYear: "1978 y.",
    team: ["Jonny Smitter"],
    isFavorite: true
  },
  { 
    id: "3", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "Chicago, IL",
    employees: 500,
    revenue: "$40M",
    status: "Inactive",
    aum: 999.34,
    foundedYear: "2000 y.",
    team: ["Jonny Smitter"],
    isFavorite: true
  },
  { 
    id: "4", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "New York, NY",
    employees: 340,
    revenue: "$32M",
    status: "Active",
    aum: 999.34,
    foundedYear: "2002 y.",
    team: ["Jonny Smitter"],
    isFavorite: false
  },
  { 
    id: "5", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "Detroit, MI",
    employees: 780,
    revenue: "$65M",
    status: "Active",
    aum: 999.34,
    foundedYear: "2002 y.",
    team: ["Jonny Smitter"],
    isFavorite: false
  },
  { 
    id: "6", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "Seattle, WA",
    employees: 95,
    revenue: "$8M",
    status: "Active",
    aum: 1.0,
    foundedYear: "2002 y.",
    team: ["Jonny Smitter"],
    isFavorite: false
  },
  { 
    id: "7", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "Austin, TX",
    employees: 420,
    revenue: "$37M",
    status: "Active",
    aum: 567.8,
    foundedYear: "2002 y.",
    team: ["Jonny Smitter"],
    isFavorite: false
  },
  { 
    id: "8", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "Denver, CO",
    employees: 180,
    revenue: "$18M",
    status: "Active",
    aum: 567.8,
    foundedYear: "2002 y.",
    team: ["Jonny Smitter"],
    isFavorite: false
  },
  { 
    id: "9", 
    name: "Lorem Ipsum Inc", 
    type: "Family Office",
    location: "Portland, OR",
    employees: 320,
    revenue: "$29M",
    status: "Active",
    aum: 3452362.4,
    foundedYear: "2002 y.",
    team: ["Jonny Smitter"],
    isFavorite: false
  }
];

const CompaniesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(2);
  const navigate = useNavigate();

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
    if (selectedCompanies.length === mockCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(mockCompanies.map(company => company.id));
    }
  };

  const isCompanySelected = (id: string) => selectedCompanies.includes(id);

  const toggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, this would update the favorites in the backend
    console.log(`Toggle favorite for company ${id}`);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
      </div>
      
      <div className="bg-white rounded-lg mb-6">
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
      
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F6F6F7] hover:bg-[#F6F6F7]">
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedCompanies.length === mockCompanies.length && mockCompanies.length > 0} 
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
              {mockCompanies.map((company) => (
                <TableRow 
                  key={company.id} 
                  className="border-t border-gray-100 cursor-pointer hover:bg-blue-50"
                  onClick={() => handleViewCompany(company.id)}
                >
                  <TableCell className="p-3">
                    <Checkbox 
                      checked={isCompanySelected(company.id)}
                      onCheckedChange={() => toggleCompanySelection(company.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-[#343C6A] flex items-center">
                    {company.name}
                    <button 
                      className="ml-2"
                      onClick={(e) => toggleFavorite(company.id, e)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${company.isFavorite ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`} 
                      />
                    </button>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-[#EEF0F7] text-[#343C6A] rounded-full text-sm">
                      {company.type}
                    </span>
                  </TableCell>
                  <TableCell>{company.aum}</TableCell>
                  <TableCell>{company.foundedYear}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="px-3 py-1 bg-[#EEF0F7] text-blue-600 rounded-full text-sm mr-2">
                        {company.team && company.team[0]}
                      </span>
                      {company.team && company.team.length > 1 && (
                        <span className="px-3 py-1 bg-[#EEF0F7] text-blue-600 rounded-full text-sm">
                          +{company.team.length - 1}
                        </span>
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
