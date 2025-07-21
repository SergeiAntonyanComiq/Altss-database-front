import { ColumnDef } from "@tanstack/react-table";
import { Id, NameColumn } from "@/components/columns-bucket/shared";
import { IntegrationOfficesList } from "@/services/integrationService.ts";
import { Delete } from "@/components/columns-bucket/shared/Delete.tsx";

export const integrationColumns = (
  handleDelete: (id: string) => Promise<void> | void
): ColumnDef<IntegrationOfficesList>[] => [
  NameColumn("firm_name", "company_id", "integration", "Office Name"),
  Id("company_id", "ID"),
  Delete("company_id", handleDelete, "Delete"),
];
