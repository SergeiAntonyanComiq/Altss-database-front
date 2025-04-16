import { useState, useCallback } from 'react';
import { Column } from '../table/PersonTableHeader';

// Define all available columns
const allColumns: Column[] = [
  { id: 'name', width: 250, minWidth: 250 },
  { id: 'company', width: 200, minWidth: 180 },
  { id: 'bio', width: 280, minWidth: 250 },
  { id: 'position', width: 170, minWidth: 170 },
  { id: 'responsibilities', width: 250, minWidth: 250 },
  { id: 'contacts', width: 150, minWidth: 150 },
  { id: 'location', width: 170, minWidth: 170 },
];

// Define default visible columns
const defaultVisibleColumns: Column[] = allColumns.filter(col =>
  ['name', 'company', 'position', 'location'].includes(col.id)
);

export const usePersonColumnModal = (initialColumns: Column[]) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    initialColumns.map(col => col.id)
  );

  const toggleColumn = useCallback((columnId: string) => {
    setVisibleColumns(current => {
      if (current.includes(columnId)) {
        return current.filter(id => id !== columnId);
      } else {
        return [...current, columnId];
      }
    });
  }, []);

  const resetColumns = useCallback(() => {
    // Reset both the columns and visible columns to default state
    setColumns(defaultVisibleColumns);
    setVisibleColumns(defaultVisibleColumns.map(col => col.id));
    return defaultVisibleColumns; // Return default columns for immediate application
  }, []);

  const applyColumnChanges = useCallback(() => {
    // Keep original column order by filtering based on visibleColumns
    const newColumns = allColumns.filter(col => visibleColumns.includes(col.id));
    
    // Ensure at least one column (name) is always visible
    if (newColumns.length === 0 || !newColumns.some(col => col.id === 'name')) {
      const nameColumn = allColumns.find(col => col.id === 'name');
      if (nameColumn) {
        newColumns.unshift(nameColumn); // Add name column at the start
      }
    }
    
    return newColumns;
  }, [visibleColumns]);

  return {
    columns: allColumns,         // All available columns for the modal
    visibleColumns,             // Currently selected column IDs
    toggleColumn,               // Function to toggle column visibility
    resetColumns,               // Function to reset to default visible columns
    applyColumnChanges,         // Function to apply changes and get new column array
  };
};
