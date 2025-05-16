import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import {
  FamilyOfficeCountry,
  FamilyOfficeCity,
  FamilyOfficeRegion,
} from "./family-office";
import { Aum, LastUpdated, NameWithLogo, Type, FoundedYear } from "./shared";

export const familyOfficeColumnList = (
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void,
  onSelectAll: (id: FamilyOffice[]) => void,
  onSelect: (id: string) => void
): ColumnDef<FamilyOffice, unknown>[] => [
  NameWithLogo(
    "company_id",
    "firm_name",
    "Family Office Name",
    favorites,
    toggleFavorite,
    "familyoffices",
    onSelectAll,
    onSelect
  ),
  Type("Type"),
  FamilyOfficeCity,
  FamilyOfficeCountry,
  FamilyOfficeRegion,
  Aum(),
  FoundedYear("year_founded"),
  LastUpdated(),
];
