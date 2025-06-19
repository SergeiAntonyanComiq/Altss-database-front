import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";
import {
  DealDate,
  DealSize,
  DealType,
  Partner,
  DealNotes,
  DealRole,
} from "./deals";

export const dealsColumns: ColumnDef<Deals>[] = [
  Partner,
  DealSize,
  DealType,
  DealDate,
  DealNotes,
  DealRole,
];
