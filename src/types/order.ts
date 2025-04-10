export type OrderStatus = "Ready" | "In progress" | "Error";

export interface OrderType {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  favorite: boolean;
  type: string; // e.g., Person, Incubator, Venture Studio, Startup, VC, Family Office
  status: OrderStatus;
  date: string; // Assuming string format like 'DD.MM.YYYY'
  description: string;
} 