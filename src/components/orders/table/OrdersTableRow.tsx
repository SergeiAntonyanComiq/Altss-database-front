import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import { OrderType, OrderStatus } from "@/types/order";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { OrderColumnSizes } from "./useOrderColumnSizes";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { ResizablePanel } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useOrderColumnSizes } from "@/hooks/useOrderColumnSizes";

type BadgeVariant = 
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "type-personal"
  | "type-business"
  | "type-enterprise"
  | "status-pending"
  | "status-processing"
  | "status-completed"
  | "status-cancelled";

interface OrdersTableRowProps {
  order: OrderType;
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

export const OrdersTableRow = ({ order }: OrdersTableRowProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const columnSizes = useOrderColumnSizes();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getTypeVariant = (type: string): BadgeVariant => {
    switch (type.toLowerCase()) {
      case "personal":
        return "type-personal";
      case "business":
        return "type-business";
      case "enterprise":
        return "type-enterprise";
      default:
        return "default";
    }
  };

  const getStatusVariant = (status: string): BadgeVariant => {
    switch (status.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "default";
    }
  };

  return (
    <div className="group relative flex min-h-[60px] items-center border-b border-border bg-background hover:bg-muted/50">
      <ResizablePanel defaultSize={columnSizes.checkbox} minSize={15}>
        <div className="flex items-center gap-3 px-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={order.avatarUrl} alt={order.name} />
            <AvatarFallback>{getInitials(order.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{order.name}</span>
            <span className="text-sm text-muted-foreground">{order.email}</span>
          </div>
        </div>
      </ResizablePanel>

      <ResizablePanel defaultSize={columnSizes.type} minSize={15}>
        <div className="px-4">
          <Badge variant={getTypeVariant(order.type)}>
            {order.type}
          </Badge>
        </div>
      </ResizablePanel>

      <ResizablePanel defaultSize={columnSizes.status} minSize={20}>
        <div className="px-4">
          <Badge variant={getStatusVariant(order.status)}>
            {order.status}
          </Badge>
        </div>
      </ResizablePanel>

      <ResizablePanel defaultSize={columnSizes.orderDate} minSize={15}>
        <div className="px-4">
          <span className="text-sm text-gray-600">
            {formatDate(order.date)}
          </span>
        </div>
      </ResizablePanel>

      <ResizablePanel defaultSize={columnSizes.description} minSize={15}>
        <div className="px-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {order.description}
          </p>
        </div>
      </ResizablePanel>

      <ResizablePanel defaultSize={columnSizes.favorite} minSize={10}>
        <div className="flex items-center justify-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              isFavorite
                ? "text-gray-900"
                : "text-gray-400"
            )}
            onClick={toggleFavorite}
          >
            <Star
              className={cn(
                "h-5 w-5 cursor-pointer",
                isFavorite
                  ? "text-gray-900 fill-current"
                  : "text-gray-400 hover:text-gray-900"
              )}
            />
          </Button>
        </div>
      </ResizablePanel>
    </div>
  );
};

export default OrdersTableRow; 