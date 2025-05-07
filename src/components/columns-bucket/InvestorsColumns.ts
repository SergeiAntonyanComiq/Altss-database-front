import { ColumnDef } from "@tanstack/react-table";

import { Investor } from "@/hooks/useInvestorsData.ts";
import { Aum, Type, FoundedYear, CompanyLocation } from "./shared";
import { Funds, InvestorName } from "@/components/columns-bucket/investors";

export const investorsColumns = (): ColumnDef<Investor, unknown>[] => [
  InvestorName,
  Type("Type"),
  Aum(),
  CompanyLocation(),
  FoundedYear("year_est"),
  Funds,
];
