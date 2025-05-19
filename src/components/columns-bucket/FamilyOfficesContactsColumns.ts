import { ColumnDef } from "@tanstack/react-table";

import {
  FamilyOfficeContactsCompanyName,
  FamilyOfficeContactsName,
  FamilyOfficeContactsTitle,
} from "./family-office-contacts";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { Website } from "./shared";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const familyOfficesContactsColumns = (
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void,
  onSelectAll: (id: FamilyOfficeContact[]) => void,
  onSelect: (id: string) => void
): ColumnDef<FamilyOfficeContact, unknown>[] => [
  FamilyOfficeContactsName(favorites, toggleFavorite, onSelectAll, onSelect),
  FamilyOfficeContactsTitle,
  FamilyOfficeContactsCompanyName,
];
