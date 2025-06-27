import { ColumnDef } from "@tanstack/react-table";
import { User, UserPlan } from "@/services/usersService.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { planOptions, planVariantMap } from "@/utils/users.ts";

export const Subscription = (
  onChangePlan: (id: string, newPlan: UserPlan) => void
): ColumnDef<User> => ({
  id: "plan",
  accessorFn: (row) => row.plan,
  meta: {
    maxWidth: 350,
  },
  header: "Subscription",
  cell: ({ row }) => {
    const userId = row.original.user_id;
    const currentPlan = row.original.plan;
    const currentVariant = planVariantMap[currentPlan];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Badge variant={currentVariant}>
              {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </Badge>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-1 shadow-lg bg-white border-none"
          align="start"
        >
          {planOptions.map((plan) => (
            <DropdownMenuItem
              key={plan}
              onClick={() => {
                if (plan !== currentPlan && onChangePlan) {
                  onChangePlan(userId, plan);
                }
              }}
              className={`capitalize text-[16px] font-medium px-3 py-1 rounded-md cursor-pointer ${
                plan === currentPlan
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
});
