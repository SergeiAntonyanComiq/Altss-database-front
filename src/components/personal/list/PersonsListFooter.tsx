<<<<<<< HEAD
=======

>>>>>>> a90c02c6fb60eed6ce832988ccc4464c37ce0f3d
import React from "react";
import PersonsPagination from "../PersonsPagination";

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
  disablePagination = false
}) => {
  return (
<<<<<<< HEAD
    <div className="flex w-full gap-[40px_100px] justify-start flex-wrap mt-8">
=======
    <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-8">
>>>>>>> a90c02c6fb60eed6ce832988ccc4464c37ce0f3d
      <PersonsPagination 
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
