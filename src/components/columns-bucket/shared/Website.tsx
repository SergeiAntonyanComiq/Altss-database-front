import { ColumnDef } from "@tanstack/react-table";

export const Website = <T, K extends keyof T>(
  field: K,
  header: string = "Website",
  href?: string,
): ColumnDef<T> => ({
  id: field as string,
  accessorFn: (row) => row[field],
  header,
  meta: {
    cellClassName:
      "font-normal max-w-full truncate overflow-hidden whitespace-nowrap",
    headerClassName: "bg-[#F8FAFC]",
    maxWidth: 280,
  },
  cell: ({ row }) => {
    const value = href ?? (row.getValue(field as string) as string);

    return value ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline "
      >
        {value}
      </a>
    ) : null;
  },
});
