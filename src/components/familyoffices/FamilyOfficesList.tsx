"use client";

import React, { useEffect, useState } from "react";
import { useFamilyOfficesData } from "@/hooks/useFamilyOfficesData";

import { Button } from "@/components/ui/button";
import { Search, Filter, Save, Heart } from "lucide-react";

import { familyOfficeColumnList } from "@/components/columns-bucket";
import { DataTable } from "@/components/ui/DataTable.tsx";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { Loading } from "@/utils.tsx";

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
  const { familyOffices, isLoading, error, totalPages, totalItems } =
    useFamilyOfficesData(currentPage, itemsPerPage);

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
      <Loading show={isLoading} />
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
        {error ? (
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
      <div className="mt-6">
        <CustomPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          onPageChange={onPageChange}
          totalItems={totalItems}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default FamilyOfficesList;
