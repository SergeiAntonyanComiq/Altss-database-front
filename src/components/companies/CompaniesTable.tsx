
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
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-200">
              <TableHead className="w-12 p-0 pl-3">
                <div className="flex items-center justify-center">
                  <Checkbox 
                    checked={selectedCompanies.length === companies.length && companies.length > 0} 
                    onCheckedChange={toggleAllCompanies}
                  />
                </div>
              </TableHead>
              <TableHead className="font-medium">Company Name</TableHead>
              <TableHead className="font-medium">Company Type</TableHead>
              <TableHead className="font-medium">Location</TableHead>
              <TableHead className="font-medium">AUM, $mln.</TableHead>
              <TableHead className="font-medium">Founded year</TableHead>
              <TableHead className="font-medium">Staff Count</TableHead>
              <TableHead className="w-12">
                <LayoutGrid className="h-4 w-4 mx-auto text-gray-500" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow 
                key={company.id} 
                className={`${selectedCompanies.includes(company.id || '') ? "bg-blue-50" : ""}`}
                data-state={selectedCompanies.includes(company.id || '') ? "selected" : undefined}
                onClick={() => toggleCompanySelection(company.id || '')}
              >
                <TableCell className="align-middle w-12 p-0 pl-3">
                  <div className="flex items-center justify-center">
                    <Checkbox 
                      checked={isCompanySelected(company.id)}
                      onCheckedChange={() => toggleCompanySelection(company.id || '')}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  <div className="flex items-center">
                    <span 
                      className="cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCompany(company.id || '');
                      }}
                    >
                      {company.firm_name}
                    </span>
                    <button 
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(company.id || '', e);
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 cursor-pointer ${company.isFavorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                      />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 rounded-md text-xs border-blue-100 font-normal px-2 py-1">
                    {company.firm_type || company.type || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {company.city ? `${company.city}, ${company.country || company.state_county || ''}` : 'N/A'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {formatAum(company.aum)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {company.year_est || 'N/A'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {company.total_staff || 'N/A'}
                  </span>
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
