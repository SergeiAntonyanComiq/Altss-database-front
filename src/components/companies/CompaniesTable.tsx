
import React from "react";
import { Heart, LayoutGrid } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CompanyType } from "@/types/company";

interface CompaniesTableProps {
  companies: CompanyType[];
  selectedCompanies: string[];
  toggleCompanySelection: (id: string) => void;
  toggleAllCompanies: () => void;
  handleViewCompany: (id: string) => void;
  toggleFavorite: (id: string, event: React.MouseEvent) => void;
  formatAum: (aumValue: number | string | undefined | null) => string;
  isCompanySelected: (id: string | undefined) => boolean;
  isLoading: boolean;
}

const CompaniesTable = ({
  companies,
  selectedCompanies,
  toggleCompanySelection,
  toggleAllCompanies,
  handleViewCompany,
  toggleFavorite,
  formatAum,
  isCompanySelected,
  isLoading
}: CompaniesTableProps) => {
  if (companies.length === 0 && !isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-500">No companies found for the current page</p>
      </div>
    );
  }

  return (
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesTable;
