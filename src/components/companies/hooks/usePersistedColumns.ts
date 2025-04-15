import { useState, useEffect } from 'react';
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

const STORAGE_KEY = 'companies-table-columns';

export const usePersistedColumns = () => {
  // Initialize state from localStorage or default
  const [columns, setColumns] = useState<Column[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure at least name column is present
        if (parsed.length === 0 || !parsed.some((col: Column) => col.id === 'name')) {
          const nameColumn = defaultColumns.find(col => col.id === 'name');
          return nameColumn ? [nameColumn] : defaultColumns;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse stored columns:', e);
        return defaultColumns;
      }
    }
    return defaultColumns;
  });

  // Update localStorage when columns change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    } catch (e) {
      console.error('Failed to store columns:', e);
    }
  }, [columns]);

  const updateColumns = (newColumns: Column[]) => {
    // Ensure at least name column is present
    if (newColumns.length === 0 || !newColumns.some(col => col.id === 'name')) {
      const nameColumn = defaultColumns.find(col => col.id === 'name');
      setColumns(nameColumn ? [nameColumn] : defaultColumns);
    } else {
      setColumns(newColumns);
    }
  };

  const resetColumns = () => {
    setColumns(defaultColumns);
  };

  return {
    columns,
    updateColumns,
    resetColumns
  };
};
