import { useState, useCallback } from 'react';
import { Column } from '../table-parts/CompaniesTableHeader';

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

export const useColumnModal = (initialColumns: Column[]) => {
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
    setColumns(defaultColumns);
    setVisibleColumns(defaultColumns.map(col => col.id));
    return defaultColumns; // Return default columns for immediate application
  }, []);

  const applyColumnChanges = useCallback(() => {
    // Keep original column order by filtering based on visibleColumns
    const newColumns = defaultColumns.filter(col => visibleColumns.includes(col.id));
    
    // Ensure at least one column (name) is always visible
    if (newColumns.length === 0 || !newColumns.some(col => col.id === 'name')) {
      const nameColumn = defaultColumns.find(col => col.id === 'name');
      if (nameColumn) {
        newColumns.unshift(nameColumn); // Add name column at the start
      }
    }
    
    return newColumns;
  }, [visibleColumns]);

  return {
    columns,
    visibleColumns,
    toggleColumn,
    resetColumns,
    applyColumnChanges,
  };
};
