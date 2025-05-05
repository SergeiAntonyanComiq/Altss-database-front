"use client";

import React, { useEffect, useState } from "react";
import { useFamilyOfficesData } from "@/hooks/useFamilyOfficesData";
import { DataTable } from "./DataTable";

import { Button } from "@/components/ui/button";
import { Search, Filter, Save, Heart } from "lucide-react";

import { familyOfficeColumnList } from "@/components/columns-bucket";

interface FamilyOfficesListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  filterId?: string | null;
}

const FamilyOfficesList: React.FC<FamilyOfficesListProps> = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const { familyOffices, isLoading, error, totalPages } = useFamilyOfficesData(
    currentPage,
    itemsPerPage,
  );
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (familyOffices) {
      const initialFavorites: Record<number, boolean> = {};
      familyOffices.forEach((fo) => {
        initialFavorites[fo.company_id] = fo.favorited;
      });
      setFavorites(initialFavorites);
    }
  }, [familyOffices]);

  return (
    <div className="bg-[#FEFEFE] w-full h-full py-8 px-4 md:px-6 lg:px-8 flex flex-col justify-between">
      <div className="flex-grow">
        <h1 className="text-[#111928] text-2xl font-semibold mb-10">
          Family Offices
        </h1>
        <div className="mb-8 flex gap-4 items-center">
          <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]">
            <div className="w-full flex-1">
              <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-11 pl-5 pr-4 rounded-[50px]">
                <input
                  type="text"
                  placeholder="Search the company"
                  className="bg-transparent outline-none flex-1 border-none text-base placeholder:text-[#9CA3AF]"
                />
                <Search className="text-[#9CA3AF] size-4" />
              </div>
            </div>
          </div>

          {/* Filter button - Using Button component */}
          <Button variant="outline" className="h-11 rounded-full">
            <Filter className="mr-2 size-4.5" />
            Filters
          </Button>

          {/* Save search button - Using Button component */}
          <Button variant="outline" className="h-11 rounded-full" disabled>
            <Save className="mr-2 size-4.5" />
            Save this Search
          </Button>

          {/* Add to favorites button - Using Button component */}
          <Button variant="outline" className="h-11 rounded-full">
            <Heart className="mr-2 size-5" />
            Add to Favorites
          </Button>
        </div>
        {isLoading ? (
          <div className="flex gap-4 items-center mt-10">
            <div className="w-full h-11 bg-gray-100 animate-pulse rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 mt-8">{error}</div>
        ) : (
          <div className="w-full mt-8 mb-8 overflow-x-auto">
            <DataTable
              columns={familyOfficeColumnList(favorites, toggleFavorite)}
              data={familyOffices || []}
            />
          </div>
        )}
      </div>
      <footer className="flex h-[48px] items-center justify-between py-3 pl-[13px]">
        {/* Exact HTML and classes from reference */}
        <nav
          role="navigation"
          aria-label="pagination"
          data-slot="pagination"
          className=""
        >
          <ul
            data-slot="pagination-content"
            className="flex flex-row items-center gap-2"
          >
            <li data-slot="pagination-item" className="size-[25px]">
              <a
                data-slot="pagination-link"
                className="w-[25px] h-[25px] items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5"
                aria-label="Go to first page"
                onClick={() => onPageChange(1)}
              >
                {/* SVG for ChevronsLeft */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="none"
                  className="size-[13px]"
                >
                  <path
                    fill="#637381"
                    d="M6.028 11.64a.404.404 0 0 1-.325-.143l-4.59-4.672a.454.454 0 0 1 0-.65l4.59-4.672a.454.454 0 0 1 .65 0 .454.454 0 0 1 0 .65L2.087 6.5l4.286 4.347a.454.454 0 0 1 0 .65c-.122.081-.223.142-.345.142Z"
                  ></path>
                  <path
                    fill="#637381"
                    d="M11.563 11.64a.404.404 0 0 1-.325-.143l-4.59-4.672a.454.454 0 0 1 0-.65l4.59-4.672a.454.454 0 0 1 .65 0 .454.454 0 0 1 0 .65L7.622 6.5l4.286 4.347a.454.454 0 0 1 0 .65c-.122.081-.223.142-.345.142Z"
                  ></path>
                </svg>
              </a>
            </li>
            <li data-slot="pagination-item" className="size-[25px]">
              <a
                data-slot="pagination-link"
                className="w-[25px] h-[25px] items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5"
                aria-label="Go to previous page"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              >
                {/* SVG for ChevronLeft */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="none"
                  className="size-[13px]"
                >
                  <path
                    fill="#637381"
                    d="M8.795 11.64a.404.404 0 0 1-.325-.143L3.88 6.825a.454.454 0 0 1 0-.65l4.59-4.672a.454.454 0 0 1 .65 0 .454.454 0 0 1 0 .65L4.855 6.5l4.286 4.347a.454.454 0 0 1 0 .65c-.122.081-.224.142-.346.142Z"
                  ></path>
                </svg>
              </a>
            </li>
            {/* Page numbers with ellipsis logic */}
            {(() => {
              const pages = [];
              const maxPages = 7;
              const total = totalPages || 0;
              if (total <= maxPages) {
                for (let i = 1; i <= total; i++) {
                  pages.push(i);
                }
              } else {
                if (currentPage <= 4) {
                  pages.push(1, 2, 3, 4, 5, "ellipsis", total);
                } else if (currentPage >= total - 3) {
                  pages.push(
                    1,
                    "ellipsis",
                    total - 4,
                    total - 3,
                    total - 2,
                    total - 1,
                    total,
                  );
                } else {
                  pages.push(
                    1,
                    "ellipsis",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "ellipsis",
                    total,
                  );
                }
              }
              return pages.map((page, idx) =>
                page === "ellipsis" ? (
                  <li
                    data-slot="pagination-item"
                    className="size-[25px]"
                    key={`ellipsis-${idx}`}
                  >
                    <span
                      aria-hidden="true"
                      data-slot="pagination-ellipsis"
                      className="flex size-[25px] items-end justify-center text-[#637381]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis size-4"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                      <span className="sr-only">More pages</span>
                    </span>
                  </li>
                ) : (
                  <li
                    data-slot="pagination-item"
                    className="size-[25px]"
                    key={page}
                  >
                    <a
                      data-slot="pagination-link"
                      data-active={page === currentPage ? "true" : undefined}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={
                        "w-[25px] h-[25px] items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-6.25 pt-0.5 " +
                        (page === currentPage
                          ? "bg-[#2665F0] text-white hover:bg-[#2665F0]/90"
                          : "bg-background text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50")
                      }
                      onClick={() => onPageChange(Number(page))}
                    >
                      {page}
                    </a>
                  </li>
                ),
              );
            })()}
            <li data-slot="pagination-item" className="size-[25px]">
              <a
                data-slot="pagination-link"
                className="w-[25px] h-[25px] items-center justify-center cursor-pointer inline-flex whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5 gap-1 px-2.5 sm:pr-2.5 bg-[#F3F4F6]"
                aria-label="Go to next page"
                onClick={() =>
                  onPageChange(Math.min(totalPages || 0, currentPage + 1))
                }
              >
                {/* SVG for ChevronRight */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="none"
                  className="size-[13px]"
                >
                  <path
                    fill="#637381"
                    d="M4.205 11.64a.498.498 0 0 1-.325-.123.454.454 0 0 1 0-.65L8.145 6.5 3.88 2.153a.454.454 0 0 1 0-.65.454.454 0 0 1 .65 0l4.59 4.672a.454.454 0 0 1 0 .65l-4.59 4.672a.48.48 0 0 1-.325.142Z"
                  ></path>
                </svg>
              </a>
            </li>
            <li data-slot="pagination-item" className="size-[25px]">
              <a
                data-slot="pagination-link"
                className="w-[25px] h-[25px] items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5 px-2.5 bg-[#F3F4F6]"
                aria-label="Go to last page"
                onClick={() => onPageChange(totalPages || 0)}
              >
                {/* SVG for ChevronsRight */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="13"
                  fill="none"
                  className="size-[13px] w-[21px]"
                >
                  <path
                    fill="#637381"
                    d="M5.447 11.636a.498.498 0 0 1-.325-.121.454.454 0 0 1 0-.65l4.266-4.368-4.266-4.346a.454.454 0 0 1 0-.65.454.454 0 0 1 .65 0l4.59 4.671a.454.454 0 0 1 0 .65l-4.59 4.672a.48.48 0 0 1-.325.143Z"
                  ></path>
                  <path
                    fill="#637381"
                    d="M10.962 11.636a.498.498 0 0 1-.325-.121.454.454 0 0 1 0-.65l4.266-4.368-4.266-4.346a.454.454 0 0 1 0-.65.454.454 0 0 1 .65 0l4.59 4.671a.454.454 0 0 1 0 .65l-4.59 4.672a.479.479 0 0 1-.325.143Z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
        {/* Results per page select (placeholder) */}
        <div className="flex items-center pr-6">
          <label htmlFor="results-per-page" className="sr-only">
            Results per page
          </label>
          <select
            id="results-per-page"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="flex items-center rounded-md border border-[#DFE4EA] bg-transparent px-5 py-3 text-sm text-[#637381] shadow-xs outline-none transition-[color,box-shadow] cursor-pointer"
          >
            {[10, 25, 50, 100].map((option) => (
              <option key={option} value={option}>
                {option} results per page
              </option>
            ))}
          </select>
        </div>
      </footer>
    </div>
  );
};

export default FamilyOfficesList;
