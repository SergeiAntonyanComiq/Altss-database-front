import React, { useState, useMemo, useCallback } from "react";
import { OrderType } from "@/types/order";
import { mockOrders } from "@/data/mockOrders";
import OrdersSearchBar from "./OrdersSearchBar";
import OrdersTable from "./OrdersTable";
import PersonsPagination from "@/components/personal/PersonsPagination";

const OrdersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>(["1", "6"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [orders] = useState<OrderType[]>(mockOrders);

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orders;
    return orders.filter(
      (order) =>
        order.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [orders, searchQuery]);

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
  }, []);

  const handleCheckboxChange = useCallback((orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    const ids = paginatedOrders.map((order) => order.id);
    const allSelected = ids.every((id) => selectedOrders.includes(id));
    setSelectedOrders((prev) =>
      allSelected
        ? prev.filter((id) => !ids.includes(id))
        : [...new Set([...prev, ...ids])],
    );
  }, [paginatedOrders, selectedOrders]);

  const isOrderSelected = useCallback(
    (id: string | undefined) => {
      return id ? selectedOrders.includes(id) : false;
    },
    [selectedOrders],
  );

  const toggleFavorite = useCallback((id: string) => {
    console.log(`Toggle favorite for order ID: ${id}`);
  }, []);

  const allCurrentPageItemsSelected = useMemo(() => {
    const ids = paginatedOrders.map((order) => order.id);
    return ids.length > 0 && ids.every((id) => selectedOrders.includes(id));
  }, [paginatedOrders, selectedOrders]);

  return (
    <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Enrichment Orders
      </h1>

      <OrdersSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <OrdersTable
        orders={paginatedOrders}
        selectedOrders={selectedOrders}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        toggleFavorite={toggleFavorite}
        isOrderSelected={isOrderSelected}
        allCurrentPageItemsSelected={allCurrentPageItemsSelected}
      />

      <div className="mt-6">
        <PersonsPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={totalItems}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default OrdersList;
