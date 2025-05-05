import { ColumnDef } from "@tanstack/react-table";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import {
  FamilyOfficeName,
  FamilyOfficeCountry,
  FamilyOfficeType,
  FamilyOfficeCity,
  FamilyOfficeRegion,
  FamilyOfficeAum,
  FamilyOfficeYear,
} from "./family-office";
import { LastUpdated } from "./shared";

export const familyOfficeColumnList = (
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void,
): ColumnDef<FamilyOffice, unknown>[] => [
  FamilyOfficeName(favorites, toggleFavorite),
  FamilyOfficeType,
  FamilyOfficeCity,
  FamilyOfficeCountry,
  FamilyOfficeRegion,
  FamilyOfficeAum,
  FamilyOfficeYear,
  LastUpdated(),
];
