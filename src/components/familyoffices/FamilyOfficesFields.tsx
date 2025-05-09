import { Badge } from "@/components/ui/badge.tsx";

export const FamilyOfficesFields = ({
  label,
  value,
  isBadge,
  icon,
}: {
  label?: string;
  value?: string | number | null;
  isBadge?: boolean;
  icon?: JSX.Element;
}) => (
  <div className="flex justify-between text-sm py-1">
    {label ? (
      <div className="flex justify-between space-x-2 items-center">
        {icon ? icon : null}
        <span className="text-[#637381] font-medium">{label}</span>
      </div>
    ) : null}
    {value ? (
      <>
        {isBadge ? (
          <div className="flex gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <Badge>{value}</Badge>
          </div>
        ) : (
          <span className="text-[#637381] text-right">{value}</span>
        )}
      </>
    ) : null}
  </div>
);
