import { ColumnDef } from "@tanstack/react-table";

import {
  FamilyOfficeContactsCompanyName,
  FamilyOfficeContactsName,
  FamilyOfficeContactsTitle,
} from "./family-office-contacts";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

export const familyOfficesContactsColumns = (
  favorites: Record<string, boolean>,
  selectedIds: string[],
  toggleFavorite: (id: string) => void,
  onSelectAll: (value: boolean, id: FamilyOfficeContact[]) => void,
  onSelect: (id: string) => void
): ColumnDef<FamilyOfficeContact, unknown>[] => [
  FamilyOfficeContactsName(
    favorites,
    selectedIds,
    toggleFavorite,
    onSelectAll,
    onSelect
  ),
  FamilyOfficeContactsTitle,
  FamilyOfficeContactsCompanyName,
];
