import { useState, useEffect } from 'react';
import { Column } from '../table/PersonTableHeader'; // Assuming Column type is defined here

// Define all available columns for the Persons table
const allAvailableColumns: Column[] = [
  { id: 'name', width: 250, minWidth: 250 },
  { id: 'company', width: 200, minWidth: 180 },
  { id: 'bio', width: 280, minWidth: 250 },
  { id: 'position', width: 170, minWidth: 170 },
  { id: 'responsibilities', width: 250, minWidth: 250 },
  { id: 'contacts', width: 150, minWidth: 150 },
  { id: 'location', width: 170, minWidth: 170 },
];

// Define the columns that should be visible by default
const defaultVisibleColumns: Column[] = allAvailableColumns.filter(col =>
  ['name', 'company', 'position', 'location'].includes(col.id)
);

const STORAGE_KEY = 'persons-table-columns';

export const usePersistedPersonColumns = () => {
  // Initialize state from localStorage or default visible columns
  const [columns, setColumns] = useState<Column[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Column[];
        // Validate saved columns against all available columns and ensure 'name' is present
        const validSavedColumns = parsed.filter(savedCol =>
          allAvailableColumns.some(availCol => availCol.id === savedCol.id)
        );

        // Ensure 'name' column is always present
        if (!validSavedColumns.some(col => col.id === 'name')) {
          const nameColumn = allAvailableColumns.find(col => col.id === 'name');
          if (nameColumn) {
            // Add name column if missing, keeping others
             return [nameColumn, ...validSavedColumns.filter(col => col.id !== 'name')];
          } else {
             // Should not happen if allAvailableColumns is correct, fallback to default
             return defaultVisibleColumns;
          }
        }
        // Merge saved widths/minWidths with potentially updated defaults from allAvailableColumns
        return validSavedColumns.map(savedCol => {
            const defaultCol = allAvailableColumns.find(c => c.id === savedCol.id);
            return { ...defaultCol, ...savedCol }; // Prioritize saved values but use defaults if needed
        });
      } catch (e) {
        console.error('Failed to parse stored person columns:', e);
        return defaultVisibleColumns;
      }
    }
    return defaultVisibleColumns;
  });

  // Update localStorage when columns change
  useEffect(() => {
    try {
      // Only store the currently visible columns
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    } catch (e) {
      console.error('Failed to store person columns:', e);
    }
  }, [columns]);

  // Function to update the visible columns (e.g., from the modal)
  const updateVisibleColumns = (newVisibleColumns: Column[]) => {
    // Ensure 'name' column is always present
    if (!newVisibleColumns.some(col => col.id === 'name')) {
      const nameColumn = allAvailableColumns.find(col => col.id === 'name');
      if (nameColumn && !newVisibleColumns.find(c => c.id === 'name')) {
         setColumns([nameColumn, ...newVisibleColumns]);
      } else {
         // Fallback if name column somehow missing from allAvailable
         setColumns(defaultVisibleColumns);
      }
    } else {
      setColumns(newVisibleColumns);
    }
  };

  // Function to handle resizing, updates columns with new widths
  const handleColumnResize = (newColumns: Column[]) => {
    // Ensure 'name' column is always present
    if (!newColumns.some(col => col.id === 'name')) {
      const nameColumn = allAvailableColumns.find(col => col.id === 'name');
      if (nameColumn) {
        setColumns([nameColumn, ...newColumns.filter(col => col.id !== 'name')]);
      } else {
        setColumns(defaultVisibleColumns);
      }
    } else {
      setColumns(newColumns);
    }
  };


  const resetColumns = () => {
    setColumns(defaultVisibleColumns);
    localStorage.removeItem(STORAGE_KEY); // Clear storage on reset
  };

  return {
    visibleColumns: columns, // The columns currently set to be visible
    allAvailableColumns,    // All possible columns for the modal
    updateVisibleColumns,   // Function to set the visible columns
    handleColumnResize,     // Function to update a column's width after resize
    resetColumns            // Function to reset to default visible columns
  };
};
