"use client";

import React, { useState } from "react";
import { useFamilyOfficesContactsData } from "@/hooks/useFamilyOfficesContactsData";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Save, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FamilyOfficeContact {
  contact_id: string;
  company_id: string;
  full_name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  notes: string;
  other_fields: string;
  avatar_filename: string;
}

interface FamilyOfficesContactsListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  filterId?: string | null;
}

const columns: ColumnDef<FamilyOfficeContact>[] = [
  {
    id: "select",
    accessorFn: (row) => row.full_name,
    meta: {
      headerClassName: "bg-[#F8FAFC]",
      cellClassName: "bg-white",
    },
    header: ({ table }) => (
      <div className="flex h-full items-center px-4 w-full bg-white">
        <div className="flex items-center h-full border-r border-[#DFE4EA] pr-3">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            data-state={table.getIsSomePageRowsSelected() ? "indeterminate" : "unchecked"}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
        <div className="ml-3 flex items-center gap-2.5">Full Name</div>
      </div>
    ),
    cell: ({ row }) => {
      const [favorited, setFavorited] = useState(false);

      return (
        <div className="flex h-full items-center px-4 justify-between bg-white">
          <div className="flex items-center h-full border-r border-[#DFE4EA] pr-3">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
          <div className="ml-3 flex items-center gap-3 flex-1 min-w-[300px]">
            <img
              src={`https://sinerg.blob.core.windows.net/main/img/avatars/${row.original.avatar_filename}`}
              alt=""
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            <a
              href={`/familyofficescontactsprofile/${row.original.contact_id}`}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {row.getValue("select")}
            </a>
          </div>
          <div className="flex items-center flex-shrink-0 justify-end min-w-[32px] ml-4 bg-white px-2 py-1 rounded border border-[#DFE4EA]">
            <button
              onClick={() => {
                setFavorited(!favorited);
                // TODO: Update favorited status in API
              }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-transparent hover:bg-transparent p-0"
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              {favorited ? (
                // Filled heart
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" className="size-5">
                  <path
                    fill="#637381"
                    d="M10 18c-.25 0-.5-.094-.688-.25-.718-.625-1.437-1.219-2.062-1.75-1.813-1.531-3.406-2.875-4.5-4.188C1.5 10.313.937 8.938.937 7.407c0-1.468.5-2.843 1.438-3.843A4.912 4.912 0 0 1 6 2c1.031 0 2 .344 2.844.969.344.25.625.562.906.906a.293.293 0 0 0 .469 0c.281-.344.594-.625.906-.906A4.541 4.541 0 0 1 13.969 2c1.406 0 2.687.563 3.625 1.563.937 1 1.437 2.374 1.437 3.843 0 1.532-.562 2.907-1.812 4.375-1.094 1.313-2.688 2.656-4.5 4.188-.625.531-1.344 1.125-2.063 1.75-.156.187-.406.281-.656.281Z"
                  />
                </svg>
              ) : (
                // Outlined heart
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" className="size-5">
                  <path
                    fill="#637381"
                    d="M10 18.438c-.406 0-.813-.157-1.125-.438a164.876 164.876 0 0 0-1.969-1.688c-1.781-1.53-3.343-2.812-4.437-4.125C1.188 10.626.563 9.158.563 7.5c0-1.594.562-3.094 1.562-4.188a5.392 5.392 0 0 1 4-1.75c1.156 0 2.25.375 3.188 1.094.25.188.468.375.687.625.219-.219.438-.437.688-.625.937-.719 2-1.094 3.187-1.094 1.563 0 2.969.625 4 1.75 1.031 1.094 1.563 2.594 1.563 4.188 0 1.656-.594 3.125-1.907 4.688-1.093 1.312-2.656 2.624-4.437 4.124-.594.5-1.281 1.094-2 1.688a1.562 1.562 0 0 1-1.094.438ZM6.125 2.967a4.133 4.133 0 0 0-3 1.282c-.75.844-1.156 2-1.156 3.25 0 1.281.5 2.5 1.562 3.781 1.031 1.219 2.531 2.5 4.25 3.969.594.5 1.282 1.094 2 1.719a.376.376 0 0 0 .438 0c.719-.625 1.406-1.188 2-1.719 1.75-1.5 3.25-2.75 4.25-3.969C17.53 10 18.03 8.781 18.03 7.5c0-1.25-.437-2.406-1.187-3.219a4.027 4.027 0 0 0-2.969-1.312c-.844 0-1.625.281-2.313.781a5.873 5.873 0 0 0-.78.75 1.043 1.043 0 0 1-.782.375c-.313 0-.563-.125-.781-.375a5.87 5.87 0 0 0-.781-.75 3.754 3.754 0 0 0-2.313-.781Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    meta: {
      headerClassName: "bg-[#F8FAFC] shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]",
      cellClassName: "shadow-[inset_10px_0px_6px_-5px_rgba(0,0,0,0.1)]",
    },
  },
  {
    accessorKey: "company_id",
    header: "Company ID",
    meta: {
      headerClassName: "bg-[#F8FAFC]",
    },
    cell: ({ row }) => {
      const value = row.getValue("company_id") as string;
      return value?.replace(/_/g, ' ');
    },
  },
  {
    accessorKey: "linkedin",
    header: "LinkedIn",
    meta: {
      headerClassName: "bg-[#F8FAFC]",
    },
    cell: ({ row }) => {
      const value = row.getValue("linkedin") as string;
      return value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate"
        >
          {value}
        </a>
      ) : null;
    },
  },
];

const FamilyOfficesContactsList: React.FC<FamilyOfficesContactsListProps> = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  filterId
}) => {
  const [search, setSearch] = useState("");
  const {
    contacts,
    isLoading,
    error,
    totalPages,
    totalItems,
  } = useFamilyOfficesContactsData(currentPage, itemsPerPage);

  // Filter contacts client-side for now (API search can be added later)
  const filteredContacts = contacts
    ? contacts.filter(
        (c) =>
          c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
          c.title?.toLowerCase().includes(search.toLowerCase()) ||
          c.email?.toLowerCase().includes(search.toLowerCase()) ||
          c.phone?.toLowerCase().includes(search.toLowerCase()) ||
          c.linkedin?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="bg-[#FEFEFE] w-full py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-[#111928] text-2xl font-semibold mb-10">Family Offices Contacts</h1>
      <div className="mb-8 flex gap-4 items-center">
        <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]"> 
          <div className="w-full flex-1">
            <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-11 pl-5 pr-4 rounded-[50px]">
            <input
                type="text"
              placeholder="Search family office"
                className="bg-transparent outline-none flex-1 border-none text-base placeholder:text-[#9CA3AF]"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
              <Search className="text-[#9CA3AF] size-4" />
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="h-11 rounded-full">
          <Filter className="mr-2 size-4.5" /> 
          Filters
        </Button>
        
        <Button variant="outline" className="h-11 rounded-full" disabled>
          <Save className="mr-2 size-4.5" />
          Save this Search
        </Button>
        
        <Button variant="outline" className="h-11 rounded-full">
          <Heart className="mr-2 size-5" />
          Add to Favorites
        </Button>

          <button
          className="justify-center items-center border border-[#DFE4EA] bg-white flex gap-2 text-[#637381] px-[15px] py-2.5 rounded-[50px] h-11"
            onClick={() => alert("Columns: TODO")}
          >
            <Settings className="h-[18px] w-[18px]" />
            <span>Columns</span>
          </button>
      </div>
      {isLoading ? (
        <div className="flex gap-4 items-center mt-10">
          <div className="w-full h-11 bg-gray-100 animate-pulse rounded-full"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 mt-8">{error}</div>
      ) : (
        <div className="w-full mt-8 mb-8 overflow-x-auto">
          <DataTable columns={columns} data={filteredContacts} />
        </div>
      )}
      <footer className="flex h-[48px] items-center justify-between py-3 pl-[13px]">
        <nav role="navigation" aria-label="pagination" data-slot="pagination" className="">
          <ul data-slot="pagination-content" className="flex flex-row items-center gap-2">
            <li data-slot="pagination-item" className="size-[25px]">
              <a 
                data-slot="pagination-link"
                className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5"
                aria-label="Go to first page"
                onClick={() => onPageChange(1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" className="size-[13px]"><path fill="#637381" d="M6.028 11.64a.404.404 0 0 1-.325-.143l-4.59-4.672a.454.454 0 0 1 0-.65l4.59-4.672a.454.454 0 0 1 .65 0 .454.454 0 0 1 0 .65L2.087 6.5l4.286 4.347a.454.454 0 0 1 0 .65c-.122.081-.223.142-.345.142Z"></path><path fill="#637381" d="M11.563 11.64a.404.404 0 0 1-.325-.143l-4.59-4.672a.454.454 0 0 1 0-.65l4.59-4.672a.454.454 0 0 1 .65 0 .454.454 0 0 1 0 .65L7.622 6.5l4.286 4.347a.454.454 0 0 1 0 .65c-.122.081-.223.142-.345.142Z"></path></svg>
              </a>
            </li>
            <li data-slot="pagination-item" className="size-[25px]">
              <a
                data-slot="pagination-link"
                className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5"
                aria-label="Go to previous page"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" className="size-[13px]"><path fill="#637381" d="M8.795 11.64a.404.404 0 0 1-.325-.143L3.88 6.825a.454.454 0 0 1 0-.65l4.59-4.672a.454.454 0 0 1 .65 0 .454.454 0 0 1 0 .65L4.855 6.5l4.286 4.347a.454.454 0 0 1 0 .65c-.122.081-.224.142-.346.142Z"></path></svg>
              </a>
            </li>
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
                  pages.push(1, 2, 3, 4, 5, 'ellipsis', total);
                } else if (currentPage >= total - 3) {
                  pages.push(1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total);
                } else {
                  pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', total);
                }
              }
              return pages.map((page, idx) =>
                page === 'ellipsis' ? (
                  <li data-slot="pagination-item" className="size-[25px]" key={`ellipsis-${idx}`}>
                    <span aria-hidden="true" data-slot="pagination-ellipsis" className="flex size-[25px] items-end justify-center text-[#637381]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis size-4" aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                      <span className="sr-only">More pages</span>
                    </span>
                  </li>
                ) : (
                  <li data-slot="pagination-item" className="size-[25px]" key={page}>
                    <a
                      data-slot="pagination-link"
                      data-active={page === currentPage ? "true" : undefined}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={
                        "w-[25px] h-[25px] flex items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-6.25 pt-0.5 " +
                        (page === currentPage
                          ? "bg-[#2665F0] text-white hover:bg-[#2665F0]/90"
                          : "bg-background text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50")
                      }
                      onClick={() => onPageChange(Number(page))}
                    >
                      {page}
                    </a>
                  </li>
                )
              );
            })()}
            <li data-slot="pagination-item" className="size-[25px]">
              <a
                data-slot="pagination-link"
                className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer inline-flex whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5 gap-1 px-2.5 sm:pr-2.5 bg-[#F3F4F6]"
                aria-label="Go to next page"
                onClick={() => onPageChange(Math.min(totalPages || 0, currentPage + 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" className="size-[13px]"><path fill="#637381" d="M4.205 11.64a.498.498 0 0 1-.325-.123.454.454 0 0 1 0-.65L8.145 6.5 3.88 2.153a.454.454 0 0 1 0-.65.454.454 0 0 1 .65 0l4.59 4.672a.454.454 0 0 1 0 .65l-4.59 4.672a.48.48 0 0 1-.325.142Z"></path></svg>
              </a>
            </li>
            <li data-slot="pagination-item" className="size-[25px]">
              <a
                data-slot="pagination-link"
                className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:text-[#8899A8] disabled:bg-[#E5E7EB] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-[#637381] hover:bg-[#F3F4F6] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-6.25 pt-0.5 px-2.5 bg-[#F3F4F6]"
                aria-label="Go to last page"
                onClick={() => onPageChange(totalPages || 0)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="13" fill="none" className="size-[13px] w-[21px]"><path fill="#637381" d="M5.447 11.636a.498.498 0 0 1-.325-.121.454.454 0 0 1 0-.65l4.266-4.368-4.266-4.346a.454.454 0 0 1 0-.65.454.454 0 0 1 .65 0l4.59 4.671a.454.454 0 0 1 0 .65l-4.59 4.672a.48.48 0 0 1-.325.143Z"></path><path fill="#637381" d="M10.962 11.636a.498.498 0 0 1-.325-.121.454.454 0 0 1 0-.65l4.266-4.368-4.266-4.346a.454.454 0 0 1 0-.65.454.454 0 0 1 .65 0l4.59 4.671a.454.454 0 0 1 0 .65l-4.59 4.672a.479.479 0 0 1-.325.143Z"></path></svg>
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center pr-6">
          <label htmlFor="results-per-page" className="sr-only">Results per page</label>
          <select
            id="results-per-page"
            value={itemsPerPage}
            onChange={e => onItemsPerPageChange(Number(e.target.value))}
            className="flex items-center rounded-md border border-[#DFE4EA] bg-transparent px-5 py-3 text-sm text-[#637381] shadow-xs outline-none transition-[color,box-shadow] cursor-pointer"
          >
            {[10, 25, 50, 100].map(option => (
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

export default FamilyOfficesContactsList;
