
import { useState } from "react";

export type ColumnSizes = {
  checkbox: number;
  companyName: number;
  companyType: number;
  aum: number;
  foundedYear: number;
  knownTeam: number;
  actions: number;
};

export const useTableColumnSizes = () => {
  const [columnSizes, setColumnSizes] = useState<ColumnSizes>({
    checkbox: 5,
    companyName: 35,
    companyType: 20,
    aum: 15,
    foundedYear: 10,
    knownTeam: 10,
    actions: 5
  });

  const handleResize = (columnId: keyof ColumnSizes) => (size: number) => {
    setColumnSizes(prev => ({
      ...prev,
      [columnId]: size
    }));
  };

  return {
    columnSizes,
    handleResize
  };
};
