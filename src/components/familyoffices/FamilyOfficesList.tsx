"use client";

import React, { useEffect, useState } from "react";
import { useDebounce, useFamilyOfficesData, useModal } from "@/hooks";

import { familyOfficeColumnList } from "@/components/columns-bucket";
import { DataTable } from "@/components/ui/DataTable.tsx";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { Loading } from "@/utils.tsx";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import { TableToolbar } from "@/components/ui/table-toolbar.tsx";
import { useLocation, useSearchParams } from "react-router-dom";
import { CustomFilterModal } from "@/components/common";

export interface FamilyOfficesListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  filterId?: string | null;
}

const FamilyOfficesList = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: FamilyOfficesListProps) => {
  const location = useLocation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});

  const query = new URLSearchParams(location.search);
  const initialSearch = query.get("search") || "";
  const { isOpen, open, close } = useModal();

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  const debouncedSearchQuery = useDebounce(
    searchQuery,
    initialSearch === searchQuery ? 0 : 700
  );

  const {
    familyOffices,
    isLoading,
    error,
    totalPages,
    totalItems,
    updateFavorites,
    updateSavedSearches,
  } = useFamilyOfficesData(currentPage, itemsPerPage, debouncedSearchQuery);

  const onSelectAllRows = (rows: FamilyOffice[]) => {
    const allIds = rows.map((row) => String(row.company_id));

    setSelectedIds(allIds);
  };

  const onSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const onBulkUpdateFavorites = async () => {
    const data = {
      itemType: "family_office",
      itemIds: selectedIds,
      favorited: true,
    };

    setFavoriteMap((prev) => {
      const updated = { ...prev };
      selectedIds.forEach((id) => {
        updated[id] = true;
      });
      return updated;
    });

    await updateFavorites(data);
  };

  const toggleFavorite = async (id: string) => {
    const defaultFavorite =
      familyOffices.find((item) => item.company_id === id)?.isFavorite ?? false;

    const isFav = favoriteMap[id] ?? defaultFavorite;

    const data = {
      itemType: "family_office",
      itemIds: [id],
      favorited: !isFav,
    };

    setFavoriteMap((prev) => ({ ...prev, [id]: !isFav }));

    await updateFavorites(data);
  };

  useEffect(() => {
    if (!familyOffices) return;

    const initialFavorites = familyOffices.reduce<Record<number, boolean>>(
      (acc, office) => {
        acc[office.company_id] = office.isFavorite;
        return acc;
      },
      {}
    );

    setFavoriteMap(initialFavorites);
  }, [familyOffices]);

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  return (
    <div className="bg-[#FEFEFE] w-full h-full py-8 px-4 md:px-6 lg:px-8 flex flex-col justify-between">
      <Loading show={isLoading} />
      <div className="flex-grow">
        <h1 className="text-[#111928] text-2xl font-semibold mb-10">
          Family Offices
        </h1>
        <TableToolbar
          searchPlaceholder="Search the Family Office"
          isAddToFavoriteDisabled={!selectedIds.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFavoriteClick={onBulkUpdateFavorites}
          onSaveClick={() => updateSavedSearches(searchQuery)}
          onFilterClick={open}
        />
        {error ? (
          <div className="text-red-500 mt-8">{error}</div>
        ) : (
          <div className="w-full mt-8 mb-8 overflow-x-auto">
            <DataTable
              columns={familyOfficeColumnList(
                favoriteMap,
                toggleFavorite,
                onSelectAllRows,
                onSelectRow
              )}
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
      <CustomFilterModal
        isOpen={isOpen}
        onClose={close}
        placeholder="I need all Funds of Funds VC, that are founded by ex-startups founders after 2020 and have AUM more then $20B with investment focus in.."
        onApply={() => {}}
      />
    </div>
  );
};

export default FamilyOfficesList;
