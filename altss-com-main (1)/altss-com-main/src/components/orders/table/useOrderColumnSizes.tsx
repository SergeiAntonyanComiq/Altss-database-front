import { useState, useCallback } from "react";

// Define the column keys for the Orders table
export interface OrderColumnSizes {
  checkbox: number;
  profileName: number;
  type: number;
  status: number;
  orderDate: number;
  description: number;
}

export interface UseOrderColumnSizesOptions {
  initialSizes?: Partial<OrderColumnSizes>;
}

// Hook to manage column sizes for the Orders table
export function useOrderColumnSizes({ initialSizes = {} }: UseOrderColumnSizesOptions = {}) {
  const [columnSizes, setColumnSizes] = useState<OrderColumnSizes>({
    checkbox: initialSizes.checkbox ?? 5,       // Small width for checkbox
    profileName: initialSizes.profileName ?? 25, // Wider for name + heart icon
    type: initialSizes.type ?? 15,           // Medium width for type badge
    status: initialSizes.status ?? 10,         // Medium width for status text
    orderDate: initialSizes.orderDate ?? 10,    // Medium width for date
    description: initialSizes.description ?? 35, // Wider for description text
  });

  // Update column sizes when resizing
  const handleResize = useCallback((columnId: keyof OrderColumnSizes) => (size: number) => {
    setColumnSizes(prev => ({
      ...prev,
      [columnId]: size
    }));
  }, []);

  return { columnSizes, handleResize };
} 