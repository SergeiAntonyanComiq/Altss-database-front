import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, ArrowUpDown } from "lucide-react"; // Added ArrowUpDown for sorting icons
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { OrderColumnSizes } from "./useOrderColumnSizes"; // Import the specific type

interface OrdersTableHeaderProps {
  allSelected: boolean;
  handleSelectAll: () => void;
  columnSizes: OrderColumnSizes; // Use the specific type
  onResize: (columnId: keyof OrderColumnSizes) => (size: number) => void; // Use keyof specific type
  // TODO: Add props for sorting state and handlers later
  // onSort: (columnId: keyof OrderColumnSizes) => void;
  // sortConfig: { key: keyof OrderColumnSizes | null, direction: 'ascending' | 'descending' } | null;
}

const OrdersTableHeader: React.FC<OrdersTableHeaderProps> = ({ 
  allSelected, 
  handleSelectAll, 
  columnSizes,
  onResize
  // onSort, // Destructure sort props when added
  // sortConfig
}) => {
  // Placeholder function for sort clicks
  const handleSortClick = (columnId: keyof OrderColumnSizes) => {
    console.log(`Sort clicked for column: ${columnId}`);
    // Call onSort(columnId) when implemented
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="bg-gray-100 flex h-14 w-full">
      {/* Checkbox Panel */}
      <ResizablePanel 
        defaultSize={columnSizes.checkbox} 
        minSize={3} 
        maxSize={10}
        onResize={onResize('checkbox')}
        className="flex items-center justify-center min-w-[40px]"
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
          <Checkbox
            id="selectAllOrders"
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            aria-label="Select all orders"
            className="h-5 w-5 rounded-md border-gray-300"
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-[#DFE4EA] hover:bg-gray-300 transition-colors">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>
      
      {/* Profile Name Panel */}
      <ResizablePanel 
        defaultSize={columnSizes.profileName} 
        minSize={15} 
        onResize={onResize('profileName')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4 cursor-pointer hover:text-gray-900" onClick={() => handleSortClick('profileName')}>
          <span className="font-semibold">Profile name</span>
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-[#DFE4EA] hover:bg-gray-300 transition-colors">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>

      {/* Type Panel */}
      <ResizablePanel 
        defaultSize={columnSizes.type} 
        minSize={10} 
        onResize={onResize('type')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4 cursor-pointer hover:text-gray-900" onClick={() => handleSortClick('type')}>
          <span className="font-semibold">Type</span>
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-[#DFE4EA] hover:bg-gray-300 transition-colors">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>

      {/* Status Panel */}
      <ResizablePanel 
        defaultSize={columnSizes.status} 
        minSize={8} 
        onResize={onResize('status')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4 cursor-pointer hover:text-gray-900" onClick={() => handleSortClick('status')}>
          <span className="font-semibold">Status</span>
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-[#DFE4EA] hover:bg-gray-300 transition-colors">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>

      {/* Order Date Panel */}
      <ResizablePanel 
        defaultSize={columnSizes.orderDate} 
        minSize={8} 
        onResize={onResize('orderDate')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4 cursor-pointer hover:text-gray-900" onClick={() => handleSortClick('orderDate')}>
          <span className="font-semibold">Order Data</span>
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-[#DFE4EA] hover:bg-gray-300 transition-colors">
        <GripVertical className="h-4 w-4" />
      </ResizableHandle>

      {/* Description Panel */}
      <ResizablePanel 
        defaultSize={columnSizes.description} 
        minSize={20} 
        onResize={onResize('description')}
        className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
      >
        <div className="flex items-center min-h-11 w-full gap-2.5 px-4">
          <span className="font-semibold">Description of Request</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default OrdersTableHeader; 