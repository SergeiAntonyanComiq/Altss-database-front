import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog.tsx";

interface DeleteCellProps<T, KId extends keyof T> {
  id: T[KId];
  onDelete: (id: T[KId]) => Promise<void> | void;
  itemName?: string;
}

const DeleteCell = <T, KId extends keyof T>({
  id,
  onDelete,
  itemName = "Office",
}: DeleteCellProps<T, KId>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
      setIsOpen(false);
    } catch (e) {
      console.error("Delete failed", e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        className="text-red-600"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        disabled={isDeleting}
      >
        Delete
      </Button>

      <DeleteConfirmDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        itemName={itemName}
      />
    </>
  );
};

export function Delete<T, KId extends keyof T>(
  idKey: KId,
  onDelete: (id: T[KId]) => Promise<void> | void,
  header: string = "Delete",
  itemName: string = "Office"
): ColumnDef<T, unknown> {
  return {
    id: "delete",
    header,
    cell: ({ row }) => {
      const id = row.original[idKey];
      return <DeleteCell id={id} onDelete={onDelete} itemName={itemName} />;
    },
  };
}
