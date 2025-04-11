import React from "react";
import { OrderType } from "@/types/order";
import OrdersTableHeader from "./table/OrdersTableHeader"; // Placeholder
import OrdersTableRow from "./table/OrdersTableRow"; // Placeholder
// import EmptyState from "./table/EmptyState"; // Placeholder for empty state
import { useOrderColumnSizes } from "./table/useOrderColumnSizes"; // Use named import
import { ResizablePanelGroup } from "@/components/ui/resizable"; // Импортируем PanelGroup

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
      {/* Оборачиваем таблицу в ResizablePanelGroup */}
      <ResizablePanelGroup 
        direction="horizontal" 
        className="table-container w-full min-w-max" // Добавляем min-width
        // autoSaveId="orders-table-layout" // Опционально для сохранения раскладки
      >
        {/* Table Header */}
        {/* Header теперь не нужен внутри группы, так как строки сами панели */}
        {/* <OrdersTableHeader 
          allSelected={allCurrentPageItemsSelected} 
          handleSelectAll={handleSelectAll} 
          columnSizes={columnSizes}
          onResize={handleResize}
        /> */}
        
        {/* Table Rows - теперь строки являются панелями */}
        <div className="w-full">
          {orders.map((order) => (
            <OrdersTableRow 
              key={order.id} 
              order={order} 
              // columnSizes больше не нужен, так как размер определяется Panel
              // columnSizes={columnSizes} 
              // isSelected={isOrderSelected(order.id)} // Перенести логику выбора, если она нужна
              // onCheckboxChange={() => handleCheckboxChange(order.id)} // Перенести логику выбора
              toggleFavorite={toggleFavorite}
              // Add any other necessary props like onClick handlers
            />
          ))}
        </div>
      </ResizablePanelGroup> 
    </div>
  );
};

export default OrdersTable; 