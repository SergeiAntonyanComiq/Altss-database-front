import React, { useState, useRef, useCallback, useEffect } from "react";
import { TableCheckbox } from "@/components/ui/table-checkbox";
import { cn } from "@/lib/utils.ts";
import { columnTitleMap } from "@/components/companies/constants.ts";

export interface Column {
  id:
    | "name"
    | "type"
    | "aum"
    | "founded"
    | "team"
    | "background"
    | "location"
    | "website"
    | "contact";
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
  onColumnResize,
}) => {
  const [resizing, setResizing] = useState<string | null>(null);
  const initialX = useRef<number>(0);
  const initialWidth = useRef<number>(0);

  const startResizing = useCallback(
    (e: React.MouseEvent, columnId: string) => {
      e.preventDefault();
      setResizing(columnId);
      initialX.current = e.clientX;
      const column = columns.find((col) => col.id === columnId);
      if (column) {
        initialWidth.current = column.width;
      }
    },
    [columns],
  );

  const stopResizing = useCallback(() => {
    setResizing(null);
  }, []);

  const handleResize = useCallback(
    (e: MouseEvent) => {
      if (resizing) {
        const diff = e.clientX - initialX.current;
        const newColumns = columns.map((column) => {
          if (column.id === resizing) {
            const newWidth = Math.max(
              column.minWidth,
              initialWidth.current + diff,
            );
            return { ...column, width: newWidth };
          }
          return column;
        });
        onColumnResize(newColumns);
      }
    },
    [resizing, columns, onColumnResize],
  );

  const resize = useCallback(
    (e: React.MouseEvent) => {
      handleResize(e.nativeEvent);
    },
    [handleResize],
  );

  useEffect(() => {
    if (resizing) {
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", stopResizing);
      return () => {
        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", stopResizing);
      };
    }
  }, [resizing, handleResize, stopResizing]);

  const totalMinWidth =
    (columns || []).reduce((sum, col) => sum + col.minWidth, 0) + 44;

  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-gray-100 flex h-[44px] w-full select-none rounded-t-lg",
      )}
      style={{ minWidth: `${totalMinWidth}px` }}
      onMouseMove={resize}
    >
      <div className="w-11 min-w-[44px] border-r border-[rgba(223,228,234,1)] flex items-center justify-center rounded-tl-lg bg-gray-100 z-10 sticky left-0">
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
          className={cn(
            `relative px-4 py-3 text-[18px] text-[#637381] font-medium flex items-center`,
            index === columns.length - 1
              ? "rounded-tr-lg"
              : "border-r border-[rgba(223,228,234,1)]",
            index === 0 ? "shadow-[6px_0px_8px_-4px_rgba(0,0,0,0.1)]" : "",
          )}
          style={{
            width: column.width,
            minWidth: column.minWidth,
            ...(index === 0
              ? {
                  position: "sticky",
                  left: 44,
                  zIndex: 10,
                  background: "#f3f4f6",
                }
              : {}),
          }}
        >
          {columnTitleMap[column.id]}
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
