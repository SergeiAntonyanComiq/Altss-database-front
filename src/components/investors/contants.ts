import { Column } from "@/components/investors/table-parts/InvestorsTableHeader.tsx";

export const columnLabelsMap: Record<Column["id"], string> = {
  name: "Name",
  type: "Type",
  location: "Location",
  aum: "AUM",
  founded: "Founded",
  funds: "Funds",
};
