import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

interface CustomPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  onItemsPerPageChange?: (perPage: number) => void;
  disabled?: boolean;
  showPerPage?: boolean;
}

const generatePaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1
) => {
  const totalPageNumbers = siblingCount + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", lastPageIndex];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - i
    ).reverse();
    return [firstPageIndex, "...", ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

const CustomPagination = ({
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  showPerPage = true,
  disabled = false,
}: CustomPaginationProps) => {
  const paginationItems = generatePaginationItems(currentPage, totalPages);

  const handlePageSelect = (page: number | string) => {
    if (
      typeof page === "number" &&
      !disabled &&
      page >= 1 &&
      page <= totalPages
    ) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageSelect = (value: string) => {
    if (!disabled) {
      onItemsPerPageChange(Number(value));
    }
  };

  return (
    <div className="flex items-center justify-between w-full mt-6">
      <div className="items-stretch bg-white flex min-w-60 min-h-[46px] flex-col justify-center px-[13px] py-[11px] rounded-[3px] shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="self-stretch flex items-center gap-2 my-auto">
            <button
              onClick={() => handlePageSelect(1)}
              disabled={currentPage === 1 || disabled}
              className="aspect-[1] w-[25px] flex items-center justify-center disabled:opacity-50"
              aria-label="Go to first page"
            >
              <ChevronsLeft className="h-4 w-4 text-[rgba(99,115,129,1)]" />
            </button>
            <button
              onClick={() => handlePageSelect(currentPage - 1)}
              disabled={currentPage === 1 || disabled}
              className="aspect-[1] w-[25px] flex items-center justify-center disabled:opacity-50"
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4 text-[rgba(99,115,129,1)]" />
            </button>
          </div>

          {paginationItems.map((item, index) => (
            <div key={index} className="self-stretch my-auto">
              {item === "..." ? (
                <div className="text-[rgba(99,115,129,1)] text-base font-normal leading-none text-center">
                  ...
                </div>
              ) : (
                <div
                  onClick={() => handlePageSelect(item)}
                  className={`
                    ${
                      currentPage === item
                        ? "bg-[rgba(38,101,240,1)] text-white"
                        : "text-[rgba(99,115,129,1)]"
                    }
                    ${
                      typeof item === "number"
                        ? "w-[25px] h-[25px] flex items-center justify-center rounded-md cursor-pointer"
                        : ""
                    }
                    text-base font-normal leading-none text-center
                  `}
                >
                  {item}
                </div>
              )}
            </div>
          ))}

          <div className="self-stretch flex items-center gap-2 my-auto">
            <button
              onClick={() => handlePageSelect(currentPage + 1)}
              disabled={currentPage >= totalPages || disabled}
              className="aspect-[1] w-[25px] flex items-center justify-center disabled:opacity-50"
              aria-label="Go to next page"
            >
              <ChevronRight className="h-4 w-4 text-[rgba(99,115,129,1)]" />
            </button>
            <button
              onClick={() => handlePageSelect(totalPages)}
              disabled={currentPage === totalPages || disabled}
              className="aspect-[1] w-[25px] flex items-center justify-center disabled:opacity-50"
              aria-label="Go to last page"
            >
              <ChevronsRight className="h-4 w-4 text-[rgba(99,115,129,1)]" />
            </button>
          </div>
        </div>
      </div>

      {showPerPage ? (
        <div className="flex items-center gap-2">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageSelect}
            disabled={disabled}
          >
            <SelectTrigger className="min-w-60 min-h-12 text-base text-[#637381] font-normal w-[250px] rounded-md items-center border border-[#DFE4EA] bg-white flex gap-2.5 px-5 py-3">
              <SelectValue className="self-stretch my-auto">{`${itemsPerPage} results per page`}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="10"
                className="text-base text-[#637381] font-normal"
              >
                10 results per page
              </SelectItem>
              <SelectItem
                value="20"
                className="text-base text-[#637381] font-normal"
              >
                20 results per page
              </SelectItem>
              <SelectItem
                value="50"
                className="text-base text-[#637381] font-normal"
              >
                50 results per page
              </SelectItem>
              <SelectItem
                value="100"
                className="text-base text-[#637381] font-normal"
              >
                100 results per page
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null}
    </div>
  );
};

export default CustomPagination;
