
import React from "react";
import PersonsPagination from "../PersonsPagination";

interface PersonsListFooterProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
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
  return (
    <div className="flex justify-between items-center w-full mt-4">
      <PersonsPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
};

export default PersonsListFooter;
