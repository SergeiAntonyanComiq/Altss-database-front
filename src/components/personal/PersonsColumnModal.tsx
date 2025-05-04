import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { usePersonColumnModal } from "./hooks/usePersonColumnModal";
import { Column } from "./table/PersonTableHeader";

interface PersonsColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
  onApplyColumns: (columns: Column[]) => void;
}

const PersonsColumnModal: React.FC<PersonsColumnModalProps> = ({
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
  } = usePersonColumnModal(columns);

  useEffect(() => {
    if (!visibleColumns.includes("name")) {
      toggleColumn("name");
    }
  }, [visibleColumns, toggleColumn]);

  const handleApply = () => {
    if (
      visibleColumns.length === 0 ||
      (visibleColumns.length === 1 && visibleColumns[0] === "name")
    ) {
      resetColumns();
      onApplyColumns(resetColumns());
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
    const defaultColumns = resetColumns();
    onApplyColumns(defaultColumns);
    onClose();
  };

  const handleCancel = () => {
    resetColumns();
    onClose();
  };

  const columnLabels: Record<string, string> = {
    name: "Full name",
    company: "Company",
    bio: "Bio",
    position: "Position",
    responsibilities: "Responsibilities",
    contacts: "Contacts",
    location: "Location",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="bg-white sm:max-w-[400px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Manage Columns
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-1 py-4">
          <div className="space-y-4">
            {availableColumns.map((column) => (
              <div key={column.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`column-${column.id}`}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={() =>
                    column.id !== "name" && toggleColumn(column.id)
                  }
                  disabled={column.id === "name"}
                  defaultChecked={column.id === "name"}
                />
                <label
                  htmlFor={`column-${column.id}`}
                  className={`text-sm font-medium leading-none ${
                    column.id === "name" ? "opacity-70 cursor-not-allowed" : ""
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
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={
                visibleColumns.length === 0 ||
                (visibleColumns.length === 1 && visibleColumns[0] === "name")
              }
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

export default PersonsColumnModal;
