import React, { useState, useRef, useCallback } from "react";
import { TableCheckbox } from "@/components/ui/table-checkbox";

const defaultWidths: Record<string, number> = {
  name: 280,
  type: 200,
  background: 300,
  location: 300,
  website: 200,
  contact: 250,
  aum: 170,
  founded: 150,
  team: 150,
};

export interface Column {
  id: 'name' | 'type' | 'aum' | 'founded' | 'team' | 'background' | 'location' | 'website' | 'contact';
  width: number;
  minWidth: number;
}

interface CompaniesTableHeaderProps {
  allSelected: boolean;
  toggleAllCompanies: () => void;
  columns: Column[];
  onColumnResize: (columns: Column[]) => void;
}

const CompaniesTableHeader: React.FC<CompaniesTableHeaderProps> = ({ 
  allSelected, 
  toggleAllCompanies, 
  columns,
  onColumnResize
}) => {
  const [resizing, setResizing] = useState<string | null>(null);
  const initialX = useRef<number>(0);
  const initialWidth = useRef<number>(0);

  const startResizing = useCallback((e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    setResizing(columnId);
    initialX.current = e.clientX;
    const column = columns.find(col => col.id === columnId);
    if (column) {
      initialWidth.current = column.width;
    }
  }, [columns]);

  const stopResizing = useCallback(() => {
    setResizing(null);
  }, []);

  const resize = useCallback((e: React.MouseEvent) => {
    if (resizing) {
      const diff = e.clientX - initialX.current;
      const newColumns = columns.map(column => {
        if (column.id === resizing) {
          const newWidth = Math.max(column.minWidth, initialWidth.current + diff);
          return { ...column, width: newWidth };
        }
        return column;
      });
      onColumnResize(newColumns);
    }
  }, [resizing, columns, onColumnResize]);

  React.useEffect(() => {
    if (resizing) {
      document.addEventListener('mousemove', resize as any);
      document.addEventListener('mouseup', stopResizing);
      return () => {
        document.removeEventListener('mousemove', resize as any);
        document.removeEventListener('mouseup', stopResizing);
      };
    }
  }, [resizing, resize, stopResizing]);

  // Calculate total minimum width and ensure we have valid columns
  const totalMinWidth = (columns || []).reduce((sum, col) => sum + col.minWidth, 0) + 44; // Include checkbox column width

  // If no columns provided, don't render anything
  if (!columns || columns.length === 0) {
    return null;
  }

  const getColumnTitle = (id: string) => {
    switch (id) {
      case 'name': return 'Name';
      case 'type': return 'Type';
      case 'aum': return 'AUM';
      case 'founded': return 'Founded';
      case 'team': return 'Team';
      case 'background': return 'Background';
      case 'location': return 'Location';
      case 'website': return 'Website';
      case 'contact': return 'Contact';
      default: return '';
    }
  };

  return (
    <div 
      className="bg-gray-100 flex h-12 w-full select-none rounded-t-lg"
      style={{ minWidth: `${totalMinWidth}px` }}
      onMouseMove={resize}
    >
      <div 
        className="w-11 min-w-[44px] border-r border-[rgba(223,228,234,1)] flex items-center justify-center rounded-tl-lg"
      >
        <TableCheckbox
            id="selectAllCompanies"
            checked={allSelected}
            onCheckedChange={toggleAllCompanies}
            aria-label="Select all companies"
        />
      </div>
      
      {columns.map((column, index) => (
        <div 
          key={column.id}
          className={`relative ${index === columns.length - 1 ? '' : 'border-r border-[rgba(223,228,234,1)]'} px-4 py-3 text-[18px] text-[#637381] font-medium flex items-center ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
          style={{ width: column.width, minWidth: column.minWidth }}
        >
          {getColumnTitle(column.id)}
          
          <div
            className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-400 active:bg-blue-600"
            onMouseDown={(e) => startResizing(e, column.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default CompaniesTableHeader;
