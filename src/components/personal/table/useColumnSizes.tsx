
import { useState, useCallback } from "react";

export interface ColumnSizes {
  checkbox: number;
  fullName: number;
  shortBio: number;
  position: number;
  responsibilities: number;
  contacts: number;
  location: number;
}

export interface UseColumnSizesOptions {
  initialSizes?: Partial<ColumnSizes>;
}

export function useColumnSizes({ initialSizes = {} }: UseColumnSizesOptions = {}) {
  const [columnSizes, setColumnSizes] = useState<ColumnSizes>({
    checkbox: initialSizes.checkbox ?? 5,
    fullName: initialSizes.fullName ?? 20,
    shortBio: initialSizes.shortBio ?? 25,
    position: initialSizes.position ?? 15,
    responsibilities: initialSizes.responsibilities ?? 15,
    contacts: initialSizes.contacts ?? 10,
    location: initialSizes.location ?? 10
  });

  // Update column sizes when resizing
  const handleResize = useCallback((columnId: keyof ColumnSizes) => (size: number) => {
    setColumnSizes(prev => ({
      ...prev,
      [columnId]: size
    }));
  }, []);

  return { columnSizes, handleResize };
}
