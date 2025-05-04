import { useState, useEffect } from "react";
import { Column } from "../table-parts/CompaniesTableHeader";

const defaultColumns: Column[] = [
  { id: "name", width: 236, minWidth: 236 },
  { id: "type", width: 236, minWidth: 236 },
  { id: "aum", width: 170, minWidth: 170 },
  { id: "founded", width: 170, minWidth: 170 },
  { id: "team", width: 236, minWidth: 236 },
  { id: "background", width: 300, minWidth: 300 },
  { id: "location", width: 300, minWidth: 300 },
  { id: "website", width: 230, minWidth: 230 },
  { id: "contact", width: 250, minWidth: 250 },
];

const STORAGE_KEY = "companies-table-columns";

export const usePersistedColumns = () => {
  const [columns, setColumns] = useState<Column[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        parsed?.length === 0 ||
        !parsed?.some((col: Column) => col.id === "name")
      ) {
        const nameColumn = defaultColumns?.find((col) => col.id === "name");
        return nameColumn ? [nameColumn] : defaultColumns;
      }
      return parsed;
    }
    return defaultColumns;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const updateColumns = (newColumns: Column[]) => {
    if (
      newColumns.length === 0 ||
      !newColumns.some((col) => col.id === "name")
    ) {
      const nameColumn = defaultColumns.find((col) => col.id === "name");
      setColumns(nameColumn ? [nameColumn] : defaultColumns);
    } else {
      setColumns(newColumns);
    }
  };

  const resetColumns = () => {
    setColumns(defaultColumns);
  };

  return { columns, updateColumns, resetColumns };
};
