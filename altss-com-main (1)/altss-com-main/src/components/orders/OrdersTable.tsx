import React from "react";
import { OrderType } from "@/types/order";
import OrdersTableHeader from "./table/OrdersTableHeader"; // Placeholder
import OrdersTableRow from "./table/OrdersTableRow"; // Placeholder
// import EmptyState from "./table/EmptyState"; // Placeholder for empty state
import { useOrderColumnSizes } from "./table/useOrderColumnSizes"; // Use named import

interface OrdersTableProps {
  orders: OrderType[];
  selectedOrders: string[];
  handleCheckboxChange: (orderId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
  isOrderSelected: (id: string | undefined) => boolean;
  allCurrentPageItemsSelected: boolean; // For header checkbox state
  // Add isLoading prop if needed later for skeleton loaders
}

const OrdersTable = ({ 
  orders, 
  selectedOrders,
  handleCheckboxChange, 
  handleSelectAll, 
  toggleFavorite,
  isOrderSelected,
  allCurrentPageItemsSelected,
}: OrdersTableProps) => {
  const { columnSizes, handleResize } = useOrderColumnSizes(); // Using the hook

  // TODO: Implement EmptyState component later
  // if (orders.length === 0 /* && !isLoading */) {
  //   return <EmptyState />;
  // }

  return (
    <div className="bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm w-full mt-5">
      <div className="table-container w-full">
        {/* Table Header */}
        <OrdersTableHeader 
          allSelected={allCurrentPageItemsSelected} 
          handleSelectAll={handleSelectAll} 
          columnSizes={columnSizes}
          onResize={handleResize}
        />
        
        {/* Table Rows */}
        <div className="w-full">
          {orders.map((order) => (
            <OrdersTableRow 
              key={order.id} 
              order={order} 
              columnSizes={columnSizes}
              isSelected={isOrderSelected(order.id)}
              onCheckboxChange={() => handleCheckboxChange(order.id)}
              toggleFavorite={toggleFavorite}
              // Add any other necessary props like onClick handlers
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersTable; 