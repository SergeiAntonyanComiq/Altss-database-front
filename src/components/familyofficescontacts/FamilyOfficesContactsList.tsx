"use client";

import React, { useEffect, useState } from "react";
import { useDebounce, useFamilyOfficesContactsData, useModal } from "@/hooks";
import { DataTable } from "@/components/ui/DataTable.tsx";
import { familyOfficesContactsColumns } from "@/components/columns-bucket";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { Loading } from "@/utils.tsx";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { TableToolbar } from "@/components/ui/table-toolbar.tsx";
import { useLocation } from "react-router-dom";
import { CustomFilterModal } from "@/components/common";

interface FamilyOfficesContactsListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  filterId?: string | null;
}

const FamilyOfficesContactsList: React.FC<FamilyOfficesContactsListProps> = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const location = useLocation();
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const query = new URLSearchParams(location.search);
  const initialSearch = query.get("search") || "";
  const defaultFilterText = query.get("filterText") || "";
  const defaultFilterQuery = query.get("filterQuery") || "";
  const { isOpen, open, close } = useModal();

  const [filterQuery, setFilterQuery] = useState<string>(defaultFilterQuery);
  const [filterText, setFilterText] = useState<string>(defaultFilterText);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [filter, setFilter] = useState<string>("");

  const debouncedSearchQuery = useDebounce(
    searchQuery,
    initialSearch === searchQuery ? 0 : 700
  );

  const {
    contacts,
    isLoading,
    error,
    totalPages,
    totalItems,
    updateFavorites,
    updateSavedFilters,
    updateSavedSearches,
  } = useFamilyOfficesContactsData(
    currentPage,
    itemsPerPage,
    debouncedSearchQuery,
    filter,
    filterQuery
  );

  const onSelectAllRows = (rows: FamilyOfficeContact[]) => {
    const allIds = rows.map((row) => String(row.contact_id));

    setSelectedIds(allIds);
  };

  const onSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const onBulkUpdateFavorites = async () => {
    const data = {
      itemType: "family_office_contacts",
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
      contacts.find((item) => item.company_id === id)?.isFavorite ?? false;

    const isFav = favoriteMap[id] ?? defaultFavorite;

    const data = {
      itemType: "family_office_contacts",
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

  const handleClear = () => {
    setFilterQuery("");
    setFilterText("");
    setFilter("");

    query.delete("filterQuery");
    query.delete("filterText");

    const newSearch = query.toString();
    const newUrl = `${location.pathname}${newSearch ? "?" + newSearch : ""}`;

    window.history.replaceState(null, "", newUrl);
  };

  const handleApply = (value: string) => {
    if (filterQuery.length > 0) {
      handleClear();
    }

    setFilterText(value);
    setFilter(value);
  };

  useEffect(() => {
    if (!contacts) return;

    const initialFavorites = contacts.reduce<Record<number, boolean>>(
      (acc, office) => {
        acc[office.contact_id] = office.isFavorite;
        return acc;
      },
      {}
    );

    setFavoriteMap(initialFavorites);
  }, [contacts]);

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
    <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
      <Loading show={isLoading} />
      <div className="flex-grow">
        <h1 className="text-[#111928] text-2xl font-semibold mb-10">
          Family Offices Contacts
        </h1>
        <TableToolbar
          filter={filter.length > 0 ? filter : filterText}
          onClear={handleClear}
          searchPlaceholder="Search the Family Office"
          isAddToFavoriteDisabled={!selectedIds.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFavoriteClick={onBulkUpdateFavorites}
          onSaveClick={onSave}
          onFilterClick={open}
        />
        {isLoading ? (
          <div className="flex gap-4 items-center mt-10">
            <div className="w-full h-11 bg-gray-100 animate-pulse rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 mt-8">{error}</div>
        ) : (
          <div className="w-full mt-8 mb-8 overflow-x-auto">
            <DataTable
              columns={familyOfficesContactsColumns(
                favoriteMap,
                toggleFavorite,
                onSelectAllRows,
                onSelectRow
              )}
              data={contacts}
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
        placeholder="Type the name of a family office, contact person, or city..."
        defaultFilterText={filterText}
        onApply={handleApply}
      />
    </div>
  );
};

export { FamilyOfficesContactsList };
