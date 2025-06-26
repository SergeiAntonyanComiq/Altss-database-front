import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/services/usersService.ts";
import { withTooltipRenderer } from "@/components/ui/withTooltipRenderer.tsx";

export const UserName: ColumnDef<User> = {
  id: "full_name",
  accessorFn: (row) => row.full_name,
  meta: {
    maxWidth: 200,
    cellClassName:
      "font-medium text-[#1F2A37] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  header: "User Name",
  cell: ({ row }) =>
    withTooltipRenderer(
      <span>{row.original.full_name}</span>,
      row.original.full_name
    ),
};
