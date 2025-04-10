export interface OrderColumnSizes {
  name: number;
  type: number;
  date: number;
  email: number;
  status: number;
  favorite: number;
}

export const useOrderColumnSizes = () => {
  const columnSizes: OrderColumnSizes = {
    name: 200,
    type: 120,
    date: 120,
    email: 200,
    status: 120,
    favorite: 80,
  };

  return columnSizes;
}; 