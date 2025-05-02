import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useColumnModal } from "./hooks/useColumnModal";
import { Column } from "./table-parts/CompaniesTableHeader";

const defaultColumns: Column[] = [
  { id: 'name', width: 280, minWidth: 280 },
  { id: 'type', width: 200, minWidth: 200 },
  { id: 'background', width: 300, minWidth: 300 },
  { id: 'location', width: 300, minWidth: 300 },
  { id: 'website', width: 200, minWidth: 200 },
  { id: 'contact', width: 250, minWidth: 250 },
  { id: 'aum', width: 170, minWidth: 170 },
  { id: 'founded', width: 150, minWidth: 150 },
  { id: 'team', width: 150, minWidth: 150 },
];

interface CompaniesColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
  onApplyColumns: (columns: Column[]) => void;
}

const CompaniesColumnModal: React.FC<CompaniesColumnModalProps> = ({
  isOpen,
  onClose,
  columns,
  onApplyColumns,
}) => {
  const {
    columns: availableColumns,
    visibleColumns,
    toggleColumn,
    resetColumns,
    applyColumnChanges,
  } = useColumnModal(columns);

  // Ensure name column is always visible
  useEffect(() => {
    if (!visibleColumns.includes('name')) {
      toggleColumn('name');
    }
  }, [visibleColumns, toggleColumn]);

  const handleApply = () => {
    // Ensure at least one column is selected
    if (visibleColumns.length === 0 || (visibleColumns.length === 1 && visibleColumns[0] === 'name')) {
      resetColumns();
      onApplyColumns(defaultColumns); // Apply default columns immediately
      onClose();
      return;
    }
    
    const newColumns = applyColumnChanges();
    if (newColumns.length > 0) {
      onApplyColumns(newColumns);
      onClose();
    }
  };

  const handleReset = () => {
    resetColumns();
    onApplyColumns(defaultColumns); // Apply default columns immediately
    onClose();
  };

  const handleCancel = () => {
    resetColumns();
    onApplyColumns(defaultColumns); // Apply default columns immediately
    onClose();
  };

  const columnLabels: Record<string, string> = {
    name: 'Name',
    type: 'Type',
    background: 'Background',
    location: 'Location',
    website: 'Website',
    contact: 'Contact',
    aum: 'AUM',
    founded: 'Founded',
    team: 'Team',
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[400px] max-h-[85vh] overflow-hidden flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Manage Columns</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-1 py-4">
          <div className="space-y-4">
            {availableColumns.map((column) => (
              <div key={column.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`column-${column.id}`}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={() => column.id !== 'name' && toggleColumn(column.id)}
                  disabled={column.id === 'name'}
                  defaultChecked={column.id === 'name'}
                />
                <label 
                  htmlFor={`column-${column.id}`}
                  className={`text-sm font-medium leading-none ${
                    column.id === 'name' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {columnLabels[column.id] || column.id}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="pt-4 sm:justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button 
              onClick={handleApply}
              disabled={visibleColumns.length === 0 || (visibleColumns.length === 1 && visibleColumns[0] === 'name')}
            >
              Apply
              <Badge variant="secondary" className="ml-2 bg-white text-primary">
                {visibleColumns.length}
              </Badge>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompaniesColumnModal;
