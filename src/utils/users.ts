import { UserPlan } from "@/services/usersService.ts";

export const planVariantMap: Record<UserPlan, "default" | "outline" | "error"> =
  {
    paid: "default",
    trial: "outline",
    expired: "error",
    admin: "default",
  };

export const planOptions: UserPlan[] = ["paid", "trial", "expired"];
