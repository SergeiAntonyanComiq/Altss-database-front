
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface PersonTableHeaderProps {
  allSelected: boolean;
  handleSelectAll: () => void;
  columnSizes: {
    checkbox: number;
    fullName: number;
    shortBio: number;
    position: number;
    responsibilities: number;
    contacts: number;
    location: number;
  };
  onResize: (columnId: string) => (size: number) => void;
}

const PersonTableHeader: React.FC<PersonTableHeaderProps> = ({ 
  allSelected, 
  handleSelectAll, 
  columnSizes,
  onResize
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="bg-gray-100 flex h-14 w-full">
      <ResizablePanel 
        defaultSize={columnSizes.checkbox} 
        minSize={3} 
        onResize={onResize('checkbox')}
        className="flex items-center justify-center min-w-[40px]"
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
          <Checkbox
            id="selectAll"
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            aria-label="Select all persons"
            className="h-5 w-5 rounded-md"
          />
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.fullName} 
        minSize={15} 
        onResize={onResize('fullName')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Full Name</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.shortBio} 
        minSize={15} 
        onResize={onResize('shortBio')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Bio / About</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.position} 
        minSize={10} 
        onResize={onResize('position')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Position</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.responsibilities} 
        minSize={10} 
        onResize={onResize('responsibilities')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Areas of Responsibility</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.contacts} 
        minSize={8} 
        onResize={onResize('contacts')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Contacts</div>
      </ResizablePanel>
      
      <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      <ResizablePanel 
        defaultSize={columnSizes.location} 
        minSize={8} 
        onResize={onResize('location')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Location</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PersonTableHeader;
