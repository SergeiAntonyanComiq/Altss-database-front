import { ColumnDef } from "@tanstack/react-table";

import {
  Aum,
  NameWithLogo,
  Type,
  Website,
  FoundedYear,
  CompanyLocation,
} from "./shared";
import { CompanyType } from "@/types/company.ts";
import { Background, CompanyContact, KnownTeam } from "./companies";

export const companiesColumns = (
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void,
  toggleAllCompanies: (companies: CompanyType[]) => void,
  toggleCompanies: (id: string) => void,
): ColumnDef<CompanyType, unknown>[] => [
  NameWithLogo(
    "id",
    "firm_name",
    "Company name",
    favorites,
    toggleFavorite,
    "company",
    toggleAllCompanies,
    toggleCompanies,
  ),
  Type("Company Type"),
  Background,
  CompanyLocation(),
  Website("website", "Company Website"),
  CompanyContact,
  Aum(),
  FoundedYear("foundedYear"),
  KnownTeam,
];
