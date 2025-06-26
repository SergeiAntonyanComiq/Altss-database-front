import { ColumnDef } from "@tanstack/react-table";
import { User, UserStatus } from "@/services/usersService.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

const statusClassMap: Record<string, string> = {
  active: "text-[#007E60]",
  blocked: "text-[#BC1C21]",
  pending: "text-[#FBBF24]",
};

const statusOptions: UserStatus[] = ["active", "blocked", "pending"];

const statusLabelMap: Record<UserStatus, string> = {
  blocked: "Block",
  active: "Active",
  pending: "Pending",
};

export const Status = (
  onStatusChange?: (id: string, newStatus: UserStatus) => void
): ColumnDef<User> => ({
  id: "status",
  accessorFn: (row) => row.status,
  meta: {
    maxWidth: 350,
  },
  header: "Status",
  cell: ({ row }) => {
    const userId = row.original.user_id;
    const currentStatus = row.original.status;
    const textClass = statusClassMap[currentStatus] || "text-gray-500";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`font-medium text-[18px] leading-[26px] ${textClass}`}
          >
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-1 shadow-lg bg-white border-none"
          align="start"
        >
          {statusOptions.map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                if (status !== currentStatus && onStatusChange) {
                  onStatusChange(userId, status);
                }
              }}
              className={`capitalize text-[16px] font-medium px-3 py-1 rounded-md cursor-pointer ${
                statusClassMap[status]
              } ${
                status === currentStatus
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              {statusLabelMap[status]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
});
