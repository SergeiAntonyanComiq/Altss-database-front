import { ColumnDef } from "@tanstack/react-table";
import { User, UserPlan, UserStatus } from "@/services/usersService.ts";
import { SignupDate, Status, Subscription, UserName } from "./users";

export const getUserColumns = (
  onStatusChange: (userId: string, newStatus: UserStatus) => void,
  onChangePlan: (id: string, newPlan: UserPlan) => void
): ColumnDef<User>[] => [
  UserName,
  Subscription(onChangePlan),
  SignupDate,
  Status(onStatusChange),
];
