
import React from "react";
import { Heart } from "lucide-react";
import { CompanyType } from "@/types/company";
import { Checkbox } from "@/components/ui/checkbox";

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
      <div className="bg-white rounded-lg p-6 text-center">
        <p className="text-gray-500">No companies found for the current page</p>
      </div>
    );
  }

  const allSelected = selectedCompanies.length === companies.length && companies.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-100 flex h-12 w-full overflow-hidden flex-wrap">
        <div className="min-h-[46px] overflow-hidden w-11 border-[rgba(223,228,234,1)] border-r">
          <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
            <Checkbox
              id="selectAll"
              checked={allSelected}
              onCheckedChange={toggleAllCompanies}
              aria-label="Select all companies"
              className="h-5 w-5 rounded-md"
            />
          </div>
        </div>
        
        <div className="overflow-hidden text-sm text-gray-600 font-medium leading-none flex-[10_10_0%] border-[rgba(223,228,234,1)] border-r shadow-[4px_-1px_6px_rgba(0,0,0,0.25)]">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Company Name</div>
          <div className="border min-h-px w-full border-[rgba(223,228,234,1)] border-solid"></div>
        </div>
        
        <div className="overflow-hidden text-sm text-gray-600 font-medium leading-none w-[300px] border-[rgba(223,228,234,1)] border-r">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Company Type</div>
          <div className="border min-h-px w-full border-[rgba(223,228,234,1)] border-solid"></div>
        </div>
        
        <div className="overflow-hidden text-sm text-gray-600 font-medium leading-none w-[200px] border-[rgba(223,228,234,1)] border-r">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">AUM, $mln.</div>
          <div className="border min-h-px w-full border-[rgba(223,228,234,1)] border-solid"></div>
        </div>
        
        <div className="overflow-hidden text-sm text-gray-600 font-medium leading-none w-[170px] border-[rgba(223,228,234,1)] border-r">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Founded year</div>
          <div className="border min-h-px w-full border-[rgba(223,228,234,1)] border-solid"></div>
        </div>
        
        <div className="overflow-hidden text-sm text-gray-600 font-medium leading-none w-[180px] border-[rgba(223,228,234,1)] border-r">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Known Team</div>
          <div className="border min-h-px w-full border-[rgba(223,228,234,1)] border-solid"></div>
        </div>
        
        <div className="overflow-hidden text-sm text-gray-600 font-medium leading-none w-11">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">+</div>
          <div className="border min-h-px w-full border-[rgba(223,228,234,1)] border-solid"></div>
        </div>
      </div>
      
      {/* Table Rows */}
      <div className="divide-y divide-[#DFE4EA]">
        {companies.map((company, index) => (
          <div key={company.id} className="flex min-h-[46px] w-full overflow-hidden flex-wrap border-b border-[#DFE4EA]">
            <div className="min-h-[46px] overflow-hidden w-11 border-[rgba(223,228,234,1)] border-r flex items-center">
              <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
                <Checkbox
                  id={`company-${company.id}`}
                  checked={isCompanySelected(company.id)}
                  onCheckedChange={() => toggleCompanySelection(company.id || '')}
                  aria-label={`Select ${company.firm_name}`}
                  className="h-5 w-5 rounded-md"
                />
              </div>
            </div>
            
            <div className="shadow-[4px_-1px_6px_rgba(0,0,0,0.25)] overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight flex-[10_10_0%] shrink basis-[0%] border-[rgba(223,228,234,1)] border-r flex items-center">
              <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                <div 
                  className="flex-1 flex items-center cursor-pointer whitespace-nowrap overflow-visible"
                  onClick={() => handleViewCompany(company.id || '')}
                >
                  {company.firm_name}
                </div>
                <button
                  onClick={(e) => toggleFavorite(company.id || '', e)}
                  className="ml-2 flex items-center justify-center flex-shrink-0"
                >
                  <Heart 
                    className={`h-5 w-5 cursor-pointer ${company.isFavorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                  />
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden text-base text-[rgba(1,69,199,1)] font-medium leading-tight w-[300px] border-[rgba(223,228,234,1)] border-r flex items-center">
              <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                <div className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center max-w-[280px] overflow-hidden">
                  <span className="truncate block w-full text-sm">{company.firm_type || company.type || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight w-[200px] border-[rgba(223,228,234,1)] border-r flex items-center">
              <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                {formatAum(company.aum)}
              </div>
            </div>
            
            <div className="overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight w-[170px] border-[rgba(223,228,234,1)] border-r flex items-center">
              <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                {company.year_est ? `${company.year_est} y.` : 'N/A'}
              </div>
            </div>
            
            <div className="overflow-hidden text-base text-[rgba(0,126,96,1)] font-medium leading-tight w-[180px] border-[rgba(223,228,234,1)] border-r flex items-center">
              <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                {company.total_staff ? (
                  <div className="bg-[rgba(0,126,96,0.1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center max-w-[160px] overflow-hidden">
                    <span className="truncate block w-full text-sm">{company.total_staff}</span>
                  </div>
                ) : (
                  <span className="flex items-center">N/A</span>
                )}
              </div>
            </div>
            
            <div className="overflow-hidden w-11 flex items-center">
              <div className="flex min-h-11 w-full items-center gap-2.5"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesTable;
