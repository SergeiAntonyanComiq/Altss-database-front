import React from "react";
import CustomPagination from "../../ui/CustomPagination.tsx";

interface PersonsListFooterProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  onItemsPerPageChange: (perPage: number) => void;
  totalItems: number;
  disablePagination?: boolean;
}

const PersonsListFooter: React.FC<PersonsListFooterProps> = ({
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  disablePagination = false,
}) => {
  return (
    <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-8">
      <CustomPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        totalItems={totalItems}
        disabled={disablePagination}
      />
    </div>
  );
};

export default PersonsListFooter;
