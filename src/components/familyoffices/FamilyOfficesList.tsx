"use client";

import React, { useEffect, useState } from "react";
import { useDebounce, useFamilyOfficesData, useModal } from "@/hooks";

import { familyOfficeColumnList } from "@/components/columns-bucket";
import { DataTable } from "@/components/ui/DataTable.tsx";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { Loading } from "@/utils.tsx";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import { TableToolbar } from "@/components/ui/table-toolbar.tsx";
import { useLocation } from "react-router-dom";
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
  const [filter, setFilter] = useState<string>("");

  const query = new URLSearchParams(location.search);

  const defaultFilterQuery = query.get("filterQuery") || "";
  const defaultFilterText = query.get("filterText") || "";

  const initialSearch = query.get("search") || "";

  const { isOpen, open, close } = useModal();

  const [filterQuery, setFilterQuery] = useState<string>(defaultFilterQuery);
  const [filterText, setFilterText] = useState<string>(defaultFilterText);
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
    updateSavedFilters,
    updateSavedSearches,
  } = useFamilyOfficesData(
    currentPage,
    itemsPerPage,
    debouncedSearchQuery,
    filter,
    filterQuery
  );

  const onSelectAllRows = (rows: FamilyOffice[]) => {
    const allIds = rows.map((row) => String(row.company_id));

    setSelectedIds(allIds);
  };

  const onSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClear = () => {
    setFilterQuery("");
    setFilterText("");
    setFilter("");
    query.delete("filterText");
    query.delete("filterQuery");

    const newSearch = query.toString();
    const newUrl = `${location.pathname}${newSearch ? "?" + newSearch : ""}`;

    window.history.replaceState(null, "", newUrl);
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

  const onSave = async () => {
    if (filter.length > 0) {
      await updateSavedFilters(filter);
    }

    if (searchQuery.length > 0) {
      await updateSavedSearches(searchQuery);
    }
  };

  const handleApply = (value: string) => {
    if (filterQuery.length > 0) {
      handleClear();
    }

    setFilterText(value);
    setFilter(value);
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

  useEffect(() => {
    setFilterQuery(defaultFilterQuery);
  }, [defaultFilterQuery]);

  useEffect(() => {
    setFilterText(defaultFilterText);
  }, [defaultFilterText]);

  return (
    <div className="bg-[#FEFEFE] w-full h-full py-8 px-4 md:px-6 lg:px-8 flex flex-col justify-between">
      <Loading show={isLoading} />
      <div className="flex-grow">
        <h1 className="text-[#111928] text-2xl font-semibold mb-10">
          Family Offices
        </h1>
        <TableToolbar
          filter={filter.length > 0 ? filter : filterText}
          searchPlaceholder="Search the Family Office"
          isAddToFavoriteDisabled={!selectedIds.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClear={handleClear}
          onFavoriteClick={onBulkUpdateFavorites}
          onSaveClick={onSave}
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
          totalPages={totalPages}
        />
      </div>
      <CustomFilterModal
        isOpen={isOpen}
        onClose={close}
        defaultFilterText={filterText}
        placeholder="I need all Funds of Funds VC, that are founded by ex-startups founders after 2020 and have AUM more then $20B with investment focus in.."
        onApply={handleApply}
      />
    </div>
  );
};

export default FamilyOfficesList;
