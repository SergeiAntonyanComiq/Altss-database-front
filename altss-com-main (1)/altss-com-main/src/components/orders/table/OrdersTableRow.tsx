import React from "react";
import { Heart } from "lucide-react";
import { OrderType, OrderStatus } from "@/types/order";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge"; // Use Badge for Type
import { OrderColumnSizes } from "./useOrderColumnSizes";
import { cn } from "@/lib/utils"; // Utility for conditional classes

interface OrdersTableRowProps {
  order: OrderType;
  columnSizes: OrderColumnSizes;
  isSelected: boolean;
  onCheckboxChange: () => void;
  toggleFavorite: (id: string) => void;
  // Add onClick handlers if rows should be clickable
}

// Helper function to get status text color
const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "Ready":
      return "text-green-600"; // Or specific color from mockup: text-[#118D57]
    case "In progress":
      return "text-yellow-600"; // Or specific color from mockup: text-[#B78103]
    case "Error":
      return "text-red-600"; // Or specific color from mockup: text-[#B72136]
    default:
      return "text-gray-600";
  }
};

// Helper function to get description text color for errors
const getDescriptionColor = (status: OrderStatus): string => {
  return status === "Error" ? "text-red-600" : "text-gray-600"; // text-[#B72136] for error
};

const OrdersTableRow: React.FC<OrdersTableRowProps> = ({
  order,
  columnSizes,
  isSelected,
  onCheckboxChange,
  toggleFavorite,
}) => {
  return (
    <div className="flex min-h-[50px] w-full border-b border-[#DFE4EA] hover:bg-gray-50">
      {/* Checkbox cell */}
      <div 
        style={{width: `${columnSizes.checkbox}%`}} 
        className="flex items-center justify-center min-w-[40px]"
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
          <Checkbox
            id={`order-${order.id}`}
            checked={isSelected}
            onCheckedChange={onCheckboxChange}
            aria-label={`Select ${order.profileName}`}
            className="h-5 w-5 rounded-md border-[#C4CDD5]" 
          />
        </div>
      </div>
      
      {/* Profile Name cell */}
      <div 
        style={{width: `${columnSizes.profileName}%`}} 
        className="overflow-hidden text-sm text-gray-800 font-medium leading-tight"
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <div className="flex-1 cursor-pointer truncate text-sm">
            {order.profileName}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click if implemented
              toggleFavorite(order.id);
            }}
            className="ml-2 flex items-center justify-center flex-shrink-0"
          >
            <Heart 
              className={cn(
                "h-5 w-5 cursor-pointer",
                order.isFavorite ? "text-purple-500 fill-purple-500" : "text-gray-300"
              )} 
            />
          </button>
        </div>
      </div>
      
      {/* Type cell */}
      <div 
        style={{width: `${columnSizes.type}%`}} 
        className="overflow-hidden text-sm text-blue-700 font-medium leading-tight"
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <Badge 
            variant="secondary" 
            className="bg-[#EEF2F8] text-[#395BD4] rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap hover:bg-[#E2E8F0]"
          >
            {order.type}
          </Badge>
        </div>
      </div>
      
      {/* Status cell */}
      <div 
        style={{width: `${columnSizes.status}%`}} 
        className={cn(
          "overflow-hidden text-sm font-medium leading-tight",
          getStatusColor(order.status)
        )}
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <span className="truncate">{order.status}</span>
        </div>
      </div>
      
      {/* Order Date cell */}
      <div 
        style={{width: `${columnSizes.orderDate}%`}} 
        className="overflow-hidden text-sm text-gray-800 font-medium leading-tight"
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <span className="truncate">{order.orderDate}</span>
        </div>
      </div>
      
      {/* Description cell */}
      <div 
        style={{width: `${columnSizes.description}%`}} 
        className={cn(
          "overflow-hidden text-sm text-gray-800 font-medium leading-tight",
          getDescriptionColor(order.status)
        )}
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <span className="truncate">{order.description}</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersTableRow; 