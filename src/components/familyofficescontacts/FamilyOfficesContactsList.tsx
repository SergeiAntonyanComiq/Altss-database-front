"use client";

import React, { useEffect, useState } from "react";
import { useDebounce, useFamilyOfficesContactsData } from "@/hooks";
import { DataTable } from "@/components/ui/DataTable.tsx";
import { familyOfficesContactsColumns } from "@/components/columns-bucket";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { Loading } from "@/utils.tsx";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { TableToolbar } from "@/components/ui/table-toolbar.tsx";
import { useLocation } from "react-router-dom";

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

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

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
    updateSavedSearches,
  } = useFamilyOfficesContactsData(
    currentPage,
    itemsPerPage,
    debouncedSearchQuery
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

  return (
    <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
      <Loading show={isLoading} />
      <div className="flex-grow">
        <h1 className="text-[#111928] text-2xl font-semibold mb-10">
          Family Offices Contacts
        </h1>
        <TableToolbar
          searchPlaceholder="Search the Family Office"
          isAddToFavoriteDisabled={!selectedIds.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFavoriteClick={onBulkUpdateFavorites}
          onSaveClick={() => updateSavedSearches(searchQuery)}
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
    </div>
  );
};

export { FamilyOfficesContactsList };
