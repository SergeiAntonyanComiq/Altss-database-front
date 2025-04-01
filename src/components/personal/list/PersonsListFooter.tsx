
import React from "react";
import PersonsPagination from "../PersonsPagination";

interface PersonsListFooterProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;  // Making totalPages optional
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (perPage: number) => void;
}

const PersonsListFooter: React.FC<PersonsListFooterProps> = ({
  currentPage,
  onPageChange,
  totalPages,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange
}) => {
  // Calculate totalPages if not provided
  const calculatedTotalPages = totalPages || Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="flex justify-between items-center w-full mt-4">
      <PersonsPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={calculatedTotalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
};

export default PersonsListFooter;
