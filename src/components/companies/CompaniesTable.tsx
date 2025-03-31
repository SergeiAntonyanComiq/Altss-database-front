import React, { useState } from "react";
import { Heart, GripVertical } from "lucide-react";
import { CompanyType } from "@/types/company";
import { Checkbox } from "@/components/ui/checkbox";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

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
  
  const [columnSizes, setColumnSizes] = useState({
    checkbox: 5,
    companyName: 35,
    companyType: 20,
    aum: 15,
    foundedYear: 10,
    knownTeam: 10,
    actions: 5
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="bg-gray-100 flex h-14 w-full">
        <ResizablePanel defaultSize={columnSizes.checkbox} minSize={3} className="flex items-center justify-center min-w-[40px]">
          <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
            <Checkbox
              id="selectAll"
              checked={allSelected}
              onCheckedChange={toggleAllCompanies}
              aria-label="Select all companies"
              className="h-5 w-5 rounded-md"
            />
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        
        <ResizablePanel defaultSize={columnSizes.companyName} minSize={15} className="overflow-hidden text-sm text-gray-600 font-medium leading-none">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Company Name</div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        
        <ResizablePanel defaultSize={columnSizes.companyType} minSize={10} className="overflow-hidden text-sm text-gray-600 font-medium leading-none">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Company Type</div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        
        <ResizablePanel defaultSize={columnSizes.aum} minSize={10} className="overflow-hidden text-sm text-gray-600 font-medium leading-none">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">AUM, $mln.</div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        
        <ResizablePanel defaultSize={columnSizes.foundedYear} minSize={8} className="overflow-hidden text-sm text-gray-600 font-medium leading-none">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Founded year</div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        
        <ResizablePanel defaultSize={columnSizes.knownTeam} minSize={8} className="overflow-hidden text-sm text-gray-600 font-medium leading-none">
          <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Known Team</div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        
        <ResizablePanel defaultSize={columnSizes.actions} minSize={3} className="overflow-hidden text-sm text-gray-600 font-medium leading-none min-w-[40px]">
          <div className="flex items-center min-h-11 w-full gap-2.5 justify-center">+</div>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      <div className="divide-y divide-[#DFE4EA]">
        {companies.map((company, index) => (
          <div key={company.id} className="flex min-h-[50px] w-full overflow-hidden border-b border-[#DFE4EA]">
            <ResizablePanelGroup direction="horizontal" className="w-full">
              <ResizablePanel defaultSize={columnSizes.checkbox} minSize={3} className="flex items-center justify-center min-w-[40px]">
                <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
                  <Checkbox
                    id={`company-${company.id}`}
                    checked={isCompanySelected(company.id)}
                    onCheckedChange={() => toggleCompanySelection(company.id || '')}
                    aria-label={`Select ${company.firm_name}`}
                    className="h-5 w-5 rounded-md"
                  />
                </div>
              </ResizablePanel>
              
              <ResizablePanel defaultSize={columnSizes.companyName} minSize={15} className="overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <div 
                    className="flex-1 cursor-pointer truncate"
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
              </ResizablePanel>
              
              <ResizablePanel defaultSize={columnSizes.companyType} minSize={10} className="overflow-hidden text-base text-[rgba(1,69,199,1)] font-medium leading-tight">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <div className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center overflow-hidden">
                    <span className="truncate block w-full text-sm">{company.firm_type || company.type || 'N/A'}</span>
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizablePanel defaultSize={columnSizes.aum} minSize={10} className="overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  {formatAum(company.aum)}
                </div>
              </ResizablePanel>
              
              <ResizablePanel defaultSize={columnSizes.foundedYear} minSize={8} className="overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  {company.year_est ? `${company.year_est} y.` : 'N/A'}
                </div>
              </ResizablePanel>
              
              <ResizablePanel defaultSize={columnSizes.knownTeam} minSize={8} className="overflow-hidden text-base text-[rgba(0,126,96,1)] font-medium leading-tight">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  {company.total_staff ? (
                    <div className="bg-[rgba(0,126,96,0.1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center overflow-hidden">
                      <span className="truncate block w-full text-sm">{company.total_staff}</span>
                    </div>
                  ) : (
                    <span className="flex items-center">N/A</span>
                  )}
                </div>
              </ResizablePanel>
              
              <ResizablePanel defaultSize={columnSizes.actions} minSize={3} className="overflow-hidden min-w-[40px] flex items-center justify-center">
                <div className="flex min-h-11 w-full items-center gap-2.5 justify-center"></div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesTable;
