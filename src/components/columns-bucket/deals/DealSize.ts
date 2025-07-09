import { ColumnDef } from "@tanstack/react-table";
import { Deals } from "@/services/familyOfficesService.ts";
import getSymbolFromCurrency from "currency-symbol-map";
import millify from "millify";
import { EMPTY_PLACEHOLDER } from "@/utils.tsx";

export const DealSize: ColumnDef<Deals> = {
  id: "deal_amount",
  accessorFn: (row) =>
    row.deal_amount
      ? `${getSymbolFromCurrency(row.currency)}${millify(row.deal_amount)}`
      : EMPTY_PLACEHOLDER,
  meta: {
    cellClassName:
      "font-normal text-[#1F2A37] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  header: "Transaction Amount",
};
