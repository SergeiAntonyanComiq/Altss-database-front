import { ColumnDef } from "@tanstack/react-table";

import { NameWithLogo } from "./shared";
import { PersonType } from "@/types/person.ts";
import {
  PersonBio,
  PersonCompanyName,
  PersonContacts,
  PersonLocation,
  PersonPosition,
  PersonResponsibilities,
} from "./persons";

export const personsColumns = (
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void,
  toggleAllPersons: (companies: PersonType[]) => void,
  togglePerson: (id: string) => void,
): ColumnDef<PersonType, unknown>[] => [
  NameWithLogo(
    "id",
    "name",
    "Full Name",
    favorites,
    toggleFavorite,
    "profile",
    toggleAllPersons,
    togglePerson,
  ),
  PersonCompanyName,
  PersonBio,
  PersonPosition,
  PersonResponsibilities,
  PersonContacts,
  PersonLocation,
];
