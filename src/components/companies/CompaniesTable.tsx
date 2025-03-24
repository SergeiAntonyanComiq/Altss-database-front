
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Heart, Plus, Mail, Linkedin, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Company {
  id: number;
  name: string;
  type: string;
  industry: string;
  assetClass: string;
  location: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  favorite: boolean;
}

interface CompaniesTableProps {
  companies: Company[];
  selectedCompanies: number[];
  handleCheckboxChange: (companyId: number) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: number) => void;
}

const getAvatarFallback = (name: string) => {
  const nameParts = name.split(' ');
  return nameParts[0]?.charAt(0) + (nameParts[1]?.charAt(0) || '');
};

const getAssetClasses = (assetClass: string) => {
  return assetClass.split(',').map(item => item.trim());
};

const CompaniesTable = ({ 
  companies, 
  selectedCompanies, 
  handleCheckboxChange, 
  handleSelectAll, 
  toggleFavorite 
}: CompaniesTableProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-gray-200">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCompanies.length === companies.length && companies.length > 0}
                onCheckedChange={handleSelectAll}
                className="h-4 w-4"
              />
            </TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Asset Class</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead className="w-5">
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-2 rounded-full bg-blue-50">
                <Plus className="h-3 w-3 text-blue-600" />
                <span className="sr-only">Add column</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow 
              key={company.id} 
              className={`${selectedCompanies.includes(company.id) ? "bg-blue-50" : ""}`}
              data-state={selectedCompanies.includes(company.id) ? "selected" : undefined}
            >
              <TableCell>
                <Checkbox
                  checked={selectedCompanies.includes(company.id)}
                  onCheckedChange={() => handleCheckboxChange(company.id)}
                  className="h-4 w-4"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src="/lovable-uploads/44bd3280-5f80-43d1-b2cd-fd82e9d73c34.png" 
                      alt={company.name} 
                    />
                    <AvatarFallback className="text-xs bg-purple-100 text-purple-600">
                      {getAvatarFallback(company.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <Link 
                        to={`/companies/${company.id}`} 
                        className="font-medium text-gray-800 hover:text-[#9b87f5] hover:underline"
                      >
                        {company.name}
                      </Link>
                      <button 
                        onClick={() => toggleFavorite(company.id)}
                        className="focus:outline-none"
                      >
                        <Heart 
                          className={`h-4 w-4 cursor-pointer ${company.favorite ? 'text-[#9b87f5] fill-[#9b87f5]' : 'text-gray-300'}`} 
                        />
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground">{company.type}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{company.type}</span>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm text-gray-600 max-w-[200px] line-clamp-2">
                  {company.industry || "-"}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {getAssetClasses(company.assetClass).map((assetClass, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-[#F1F0FB] text-[#9b87f5] rounded-md text-xs border-[#E6E1FF]">
                      {assetClass}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  {company.location}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {company.contactEmail && (
                    <a href={`mailto:${company.contactEmail}`} className="text-gray-600 hover:text-[#9b87f5]">
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {company.contactPhone && (
                    <a href={`tel:${company.contactPhone}`} className="text-gray-600 hover:text-[#9b87f5]">
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#9b87f5]">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
