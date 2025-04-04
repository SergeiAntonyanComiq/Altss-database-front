import { OrderType } from "@/types/order";

export const mockOrders: OrderType[] = [
  {
    id: "1",
    profileName: "Jonny Smitty",
    isFavorite: false,
    type: "Person",
    status: "Ready",
    orderDate: "06.03.2025",
    description: "A generated description stating"
  },
  {
    id: "2",
    profileName: "Lorem Ipsum inc",
    isFavorite: true,
    type: "Incubator",
    status: "In progress",
    orderDate: "06.03.2025",
    description: "Consectetur adipiscing elit"
  },
  {
    id: "3",
    profileName: "Lorem Ipsum inc",
    isFavorite: true,
    type: "Venture Studio",
    status: "Error",
    orderDate: "06.03.2025",
    description: "Contact with your manager."
  },
  {
    id: "4",
    profileName: "Lorem Ipsum inc",
    isFavorite: false,
    type: "Startup",
    status: "Ready",
    orderDate: "06.03.2025",
    description: "Sed do eiusmod tempor incididunt"
  },
  {
    id: "5",
    profileName: "Lorem Ipsum inc",
    isFavorite: false,
    type: "VC",
    status: "Ready",
    orderDate: "06.03.2025",
    description: "Sed do eiusmod tempor incididunt"
  },
  {
    id: "6",
    profileName: "Lourence III Jr.",
    isFavorite: false,
    type: "Person",
    status: "Ready",
    orderDate: "06.03.2025",
    description: "Sed do eiusmod tempor incididunt"
  },
  {
    id: "7",
    profileName: "Lorem Ipsum inc",
    isFavorite: false,
    type: "Family Office",
    status: "Ready",
    orderDate: "06.03.2025",
    description: "Sed do eiusmod tempor incididunt"
  },
  {
    id: "8",
    profileName: "Lorem Ipsum inc",
    isFavorite: false,
    type: "Family Office",
    status: "Ready",
    orderDate: "06.03.2025",
    description: "Sed do eiusmod tempor incididunt"
  },
  {
    id: "9",
    profileName: "Lorem Ipsum inc",
    isFavorite: false,
    type: "Family Office",
    status: "Ready",
    orderDate: "06.03.2025",
    description: "Sed do eiusmod tempor incididunt"
  },
  // Add more mock data if needed to test pagination
  {
    id: "10",
    profileName: "Another Company",
    isFavorite: false,
    type: "Startup",
    status: "Ready",
    orderDate: "07.03.2025",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "11",
    profileName: "Yet Another Person",
    isFavorite: true,
    type: "Person",
    status: "In progress",
    orderDate: "07.03.2025",
    description: "Consectetur adipiscing elit"
  },
  {
    id: "12",
    profileName: "Investor Group",
    isFavorite: false,
    type: "VC",
    status: "Ready",
    orderDate: "08.03.2025",
    description: "Sed do eiusmod tempor incididunt"
  },
]; 