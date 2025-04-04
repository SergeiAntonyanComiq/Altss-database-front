import React, { useState, useMemo, useCallback } from "react";
import { OrderType } from "@/types/order";
import { mockOrders } from "@/data/mockOrders";
import OrdersSearchBar from "./OrdersSearchBar";
import OrdersTable from "./OrdersTable";
import PersonsPagination from "@/components/personal/PersonsPagination"; // Reusing PersonsPagination

const OrdersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>(["1", "6"]); // Initial selection based on mockup
  const [currentPage, setCurrentPage] = useState(1); // Initial page based on mockup
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page, adjust if needed
  const [orders] = useState<OrderType[]>(mockOrders); // Using mock data

  // --- State Management Hooks (Similar to PersonsList2) ---

  // Filter orders based on search query (simple implementation)
  const filteredOrders = useMemo(() => {
    if (!searchQuery) {
      return orders;
    }
    return orders.filter(order => 
      order.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  // Calculate pagination details
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage, itemsPerPage]);

  // Handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1); // Reset to first page
  }, []);

  const handleCheckboxChange = useCallback((orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    // Select all on the current page or clear selection if all are selected
    const currentPageIds = paginatedOrders.map(order => order.id);
    const allCurrentPageSelected = currentPageIds.every(id => selectedOrders.includes(id));

    if (allCurrentPageSelected && currentPageIds.length > 0) {
      // Deselect all on the current page
      setSelectedOrders(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      // Select all on the current page (add without duplicates)
      setSelectedOrders(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  }, [paginatedOrders, selectedOrders]);
  
  const isOrderSelected = useCallback((id: string | undefined) => {
      return id ? selectedOrders.includes(id) : false;
  }, [selectedOrders]);

  const toggleFavorite = useCallback((id: string) => {
    // Placeholder for favorite functionality
    console.log(`Toggle favorite for order with ID: ${id}`);
    // In a real app, update state:
    // setOrders(prevOrders => 
    //   prevOrders.map(order => 
    //     order.id === id ? { ...order, isFavorite: !order.isFavorite } : order
    //   )
    // );
  }, []);
  
  // Check if all items on the current page are selected for the header checkbox
  const allCurrentPageItemsSelected = useMemo(() => {
      const currentPageIds = paginatedOrders.map(order => order.id);
      return currentPageIds.length > 0 && currentPageIds.every(id => selectedOrders.includes(id));
  }, [paginatedOrders, selectedOrders]);

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Enrichment Orders</h1>
      
      <OrdersSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <OrdersTable 
        orders={paginatedOrders}
        selectedOrders={selectedOrders} // Pass selected orders state
        handleCheckboxChange={handleCheckboxChange} // Pass checkbox handler
        handleSelectAll={handleSelectAll} // Pass select all handler
        toggleFavorite={toggleFavorite} // Pass favorite handler
        isOrderSelected={isOrderSelected} // Pass selection check function
        allCurrentPageItemsSelected={allCurrentPageItemsSelected} // Pass select all state for header
      />
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <PersonsPagination 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={totalItems} 
        />
      </div>
    </div>
  );
};

export default OrdersList; 