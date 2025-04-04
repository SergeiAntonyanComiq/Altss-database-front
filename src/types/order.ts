export type OrderStatus = "Ready" | "In progress" | "Error";

export interface OrderType {
  id: string;
  profileName: string;
  isFavorite: boolean;
  type: string; // e.g., Person, Incubator, Venture Studio, Startup, VC, Family Office
  status: OrderStatus;
  orderDate: string; // Assuming string format like 'DD.MM.YYYY'
  description: string;
} 