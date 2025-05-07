import { ColumnDef } from "@tanstack/react-table";

export const Aum = <T extends { aum?: string }>(): ColumnDef<T> => ({
  id: "aum",
  accessorFn: (row) => row.aum,
  meta: {
    cellClassName:
      "font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  header: "AUM, $mln.",
});
