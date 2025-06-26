import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/services/usersService.ts";
import { format } from "date-fns";

export const SignupDate: ColumnDef<User> = {
  id: "signup-date",
  accessorFn: (row) => format(row.sign_up_date, "dd.MM.yyyy"),
  meta: {
    cellClassName:
      "font-medium text-[#1F2A37] truncate max-w-full overflow-hidden whitespace-nowrap",
  },
  header: "Sign-up Date",
};
