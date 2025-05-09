import { ColumnDef } from "@tanstack/react-table";

import {
  FamilyOfficeContactsCompanyName,
  FamilyOfficeContactsName,
  FamilyOfficeContactsTitle,
} from "./family-office-contacts";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { Website } from "./shared";

export const familyOfficesContactsColumns = (
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void,
): ColumnDef<FamilyOfficeContact, unknown>[] => [
  FamilyOfficeContactsName(favorites, toggleFavorite),
  FamilyOfficeContactsTitle,
  FamilyOfficeContactsCompanyName,
  Website("linkedin", "LinkedIn"),
];
