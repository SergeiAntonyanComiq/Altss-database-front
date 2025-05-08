export type OrderStatus = "Ready" | "In progress" | "Error";

export interface OrderType {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  favorite: boolean;
  type: string;
  status: OrderStatus;
  date: string;
  description: string;
  profileName?: string;
}
