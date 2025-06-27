import { ColumnDef } from "@tanstack/react-table";
import { User, UserPlan, UserStatus } from "@/services/usersService.ts";
import { Status, Subscription, UserName } from "./users";
import { Date } from "./shared";

export const getUserColumns = (
  onStatusChange: (userId: string, newStatus: UserStatus) => void,
  onChangePlan: (id: string, newPlan: UserPlan) => void
): ColumnDef<User>[] => [
  UserName,
  Subscription(onChangePlan),
  Date("sign_up_date", "Sign-up Date"),
  Date("expiration_date", "Next Payment"),
  Status(onStatusChange),
];
