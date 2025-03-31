
import React from "react";
import { Heart, Check } from "lucide-react";
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
    <>
      {/* Table Header */}
      <div className="bg-gray-100 flex h-12 w-full overflow-hidden flex-wrap">
        <div className="min-h-[464px] overflow-hidden w-11 border-[#DFE4EA] border-r">
          <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
            <div 
              className="cursor-pointer"
              onClick={toggleAllCompanies}
            >
              {allSelected ? (
                <div className="bg-[#2665F0] border-[#3758F9] border flex min-h-5 w-5 flex-col items-center justify-center h-5 rounded-md">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-md border border-gray-300"></div>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden text-lg text-[#637381] font-medium leading-none flex-1 border-[#DFE4EA] border-r shadow-[4px_-1px_6px_rgba(0,0,0,0.25)]">
          <div className="self-stretch min-h-11 w-full gap-2.5 px-4">Company Name</div>
          <div className="border min-h-px w-full mt-1 border-[#DFE4EA]"></div>
        </div>
        
        <div className="overflow-hidden text-lg text-[#637381] font-medium leading-none flex-1 border-[#DFE4EA] border-r">
          <div className="self-stretch min-h-11 w-full gap-2.5 px-4">Company Type</div>
          <div className="border min-h-px w-full mt-1 border-[#DFE4EA]"></div>
        </div>
        
        <div className="overflow-hidden text-lg text-[#637381] font-medium leading-none w-[170px] border-[#DFE4EA] border-r">
          <div className="self-stretch min-h-11 w-full gap-2.5 px-4">AUM, $mln.</div>
          <div className="border min-h-px w-full mt-1 border-[#DFE4EA]"></div>
        </div>
        
        <div className="overflow-hidden text-lg text-[#637381] font-medium leading-none w-[170px] border-[#DFE4EA] border-r">
          <div className="self-stretch min-h-11 w-full gap-2.5 px-4">Founded year</div>
          <div className="border min-h-px w-full mt-1 border-[#DFE4EA]"></div>
        </div>
        
        <div className="overflow-hidden text-lg text-[#637381] font-medium leading-none flex-1 border-[#DFE4EA] border-r">
          <div className="self-stretch min-h-11 w-full gap-2.5 px-4">Known Team</div>
          <div className="border min-h-px w-full mt-1 border-[#DFE4EA]"></div>
        </div>
        
        <div className="overflow-hidden text-lg text-[#637381] font-medium leading-none w-11">
          <div className="self-stretch min-h-11 w-full gap-2.5 px-4">+</div>
          <div className="border min-h-px w-full mt-1 border-[#DFE4EA]"></div>
        </div>
      </div>
      
      {/* Table Rows */}
      {companies.map((company) => (
        <div key={company.id} className="flex min-h-[46px] w-full overflow-hidden flex-wrap mt-2">
          <div className="min-h-[46px] overflow-hidden w-11 border-[#DFE4EA] border-r">
            <div 
              className="flex min-h-11 w-full items-center gap-2.5 justify-center cursor-pointer"
              onClick={() => toggleCompanySelection(company.id || '')}
            >
              {isCompanySelected(company.id) ? (
                <div className="bg-[#2665F0] border-[#3758F9] border flex min-h-5 w-5 flex-col items-center justify-center h-5 rounded-md">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-md border border-gray-300"></div>
              )}
            </div>
          </div>
          
          <div className="overflow-hidden text-lg text-[#1F2A37] font-medium leading-none flex-1 shrink basis-[0%] border-[#DFE4EA] border-r shadow-[4px_-1px_6px_rgba(0,0,0,0.25)]">
            <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
              <div 
                className="self-stretch my-auto cursor-pointer"
                onClick={() => handleViewCompany(company.id || '')}
              >
                {company.firm_name}
              </div>
              <button
                onClick={(e) => toggleFavorite(company.id || '', e)}
                className="ml-2"
              >
                <Heart 
                  className={`h-5 w-5 cursor-pointer ${company.isFavorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                />
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden text-lg text-[#0145C7] font-medium leading-none flex-1 shrink basis-[0%] border-[#DFE4EA] border-r">
            <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
              <div className="self-stretch bg-[rgba(219,229,254,1)] gap-2 my-auto px-3.5 py-[5px] rounded-[30px]">
                {company.firm_type || company.type || 'N/A'}
              </div>
            </div>
          </div>
          
          <div className="overflow-hidden text-lg text-[#1F2A37] font-medium leading-none w-[170px] border-[#DFE4EA] border-r">
            <div className="self-stretch min-h-11 w-full gap-2.5 px-4">
              {formatAum(company.aum)}
            </div>
          </div>
          
          <div className="overflow-hidden text-lg text-[#1F2A37] font-medium leading-none w-[170px] border-[#DFE4EA] border-r">
            <div className="self-stretch min-h-11 w-full gap-2.5 px-4">
              {company.year_est ? `${company.year_est} y.` : 'N/A'}
            </div>
          </div>
          
          <div className="overflow-hidden text-lg text-[#007E60] font-medium leading-none flex-1 shrink basis-[0%] border-[#DFE4EA] border-r">
            <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
              {company.total_staff ? (
                <div className="self-stretch bg-[rgba(0,126,96,0.1)] gap-2 my-auto px-3.5 py-[5px] rounded-[30px]">
                  {company.total_staff}
                </div>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
          
          <div className="overflow-hidden w-11">
            <div className="flex min-h-11 w-full gap-2.5"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CompaniesTable;
