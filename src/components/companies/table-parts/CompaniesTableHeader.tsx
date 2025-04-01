
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface CompaniesTableHeaderProps {
  allSelected: boolean;
  toggleAllCompanies: () => void;
  columnSizes: {
    checkbox: number;
    companyName: number;
    companyType: number;
    aum: number;
    foundedYear: number;
    knownTeam: number;
    actions: number;
  };
  handleResize: (columnId: string) => (size: number) => void;
}

const CompaniesTableHeader = ({
  allSelected,
  toggleAllCompanies,
  columnSizes,
  handleResize
}: CompaniesTableHeaderProps) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="bg-gray-100 flex h-14 w-full">
      <ResizablePanel 
        defaultSize={columnSizes.checkbox} 
        minSize={3} 
        onResize={handleResize('checkbox')}
        className="flex items-center justify-center min-w-[40px]"
      >
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
      
      <ResizablePanel 
        defaultSize={columnSizes.companyName} 
        minSize={15} 
        onResize={handleResize('companyName')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Company Name</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.companyType} 
        minSize={10} 
        onResize={handleResize('companyType')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Company Type</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.aum} 
        minSize={10} 
        onResize={handleResize('aum')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">AUM, $mln.</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.foundedYear} 
        minSize={8} 
        onResize={handleResize('foundedYear')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Founded year</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.knownTeam} 
        minSize={8} 
        onResize={handleResize('knownTeam')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Known Team</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.actions} 
        minSize={3} 
        onResize={handleResize('actions')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none min-w-[40px]"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 justify-center">+</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CompaniesTableHeader;
