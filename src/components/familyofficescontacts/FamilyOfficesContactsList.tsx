"use client";

import React, { useEffect, useState } from "react";
import { useFamilyOfficesContactsData } from "@/hooks/useFamilyOfficesContactsData";
import { Search, Filter, Save, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable.tsx";
import { familyOfficesContactsColumns } from "@/components/columns-bucket";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { Loading } from "@/utils.tsx";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import familyOffices from "@/pages/FamilyOffices.tsx";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

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
  const [search, setSearch] = useState("");
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    contacts,
    isLoading,
    error,
    totalPages,
    totalItems,
    updateFavorites,
  } = useFamilyOfficesContactsData(currentPage, itemsPerPage);

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

    console.log(selectedIds);

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
    <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
      <Loading show={isLoading} />
      <div className="flex-grow">
        <h1 className="text-[#111928] text-2xl font-semibold mb-10">
          Family Offices Contacts
        </h1>
        <div className="mb-8 flex gap-4 items-center">
          <div className="min-w-60 min-h-11 text-gray-400 font-normal w-[363px]">
            <div className="w-full flex-1">
              <div className="justify-between items-center border border-[#DFE4EA] bg-white flex w-full gap-2 flex-1 h-11 pl-5 pr-4 rounded-[50px]">
                <input
                  type="text"
                  placeholder="Search family office"
                  className="bg-transparent outline-none flex-1 border-none text-base placeholder:text-[#9CA3AF]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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

          <Button
            variant="outline"
            className="h-11 rounded-full"
            onClick={onBulkUpdateFavorites}
          >
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
            <DataTable
              columns={familyOfficesContactsColumns(
                favoriteMap,
                toggleFavorite,
                onSelectAllRows,
                onSelectRow
              )}
              data={filteredContacts}
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
