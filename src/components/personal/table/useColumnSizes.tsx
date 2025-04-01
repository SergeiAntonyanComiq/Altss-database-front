
import { useState } from "react";

export interface ColumnSizes {
  checkbox: number;
  fullName: number;
  shortBio: number;
  position: number;
  responsibilities: number;
  contacts: number;
  location: number;
}

export function useColumnSizes() {
  const [columnSizes, setColumnSizes] = useState<ColumnSizes>({
    checkbox: 5,
    fullName: 20,
    shortBio: 25,
    position: 15,
    responsibilities: 15,
    contacts: 10,
    location: 10
  });

  // Update column sizes when resizing
  const handleResize = (columnId: string) => (size: number) => {
    setColumnSizes(prev => ({
      ...prev,
      [columnId]: size
    }));
  };

  return { columnSizes, handleResize };
}
