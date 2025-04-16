import React, { useState, useRef, useCallback } from "react";
import { TableCheckbox } from "@/components/ui/table-checkbox";

export interface Column {
  id: string;
  width: number;
  minWidth: number;
}

interface PersonTableHeaderProps {
  allSelected: boolean;
  handleSelectAll: () => void;
  columns: Column[];
  onColumnResize: (columns: Column[]) => void;
}

const PersonTableHeader: React.FC<PersonTableHeaderProps> = ({ 
  allSelected, 
  handleSelectAll, 
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

  // Calculate total minimum width
  const totalMinWidth = columns.reduce((sum, col) => sum + col.minWidth, 0) + 44; // Include checkbox column width

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
            id="selectAll"
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            aria-label="Select all persons"
        />
      </div>
      
      {columns.map((column, index) => (
        <div 
          key={column.id}
          className={`relative ${index === columns.length - 1 ? '' : 'border-r border-[rgba(223,228,234,1)]'} px-4 py-3 text-[18px] text-[#637381] font-medium flex items-center ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
          style={{ width: column.width, minWidth: column.minWidth }}
        >
          {(() => {
            switch (column.id) {
              case 'name': return 'Full Name';
              case 'company': return 'Company';
              case 'bio': return 'Bio / About';
              case 'position': return 'Position';
              case 'responsibilities': return 'Areas of Responsibility';
              case 'contacts': return 'Contacts';
              case 'location': return 'Location';
              default: return column.id;
            }
          })()}
          
          <div
            className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-400 active:bg-blue-600"
            onMouseDown={(e) => startResizing(e, column.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default PersonTableHeader;
