import { Checkbox } from "@/components/ui/checkbox.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils.ts";
import { CheckedState } from "@radix-ui/react-checkbox";
import { withTooltipRenderer } from "@/components/ui/withTooltipRenderer.tsx";

export const NameWithLogo = <
  T extends { logo_filename?: string; firm_name?: string; name?: string }
>(
  fieldId: string,
  field: string,
  headerName: string,
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void,
  path: string,
  onSelectAll?: (id: T[]) => void,
  onSelect?: (id: string) => void
): ColumnDef<T> => ({
  id: field,
  accessorFn: (row) => row[field],
  meta: {
    maxWidth: 350,
  },
  header: ({ table }) => {
    const handleCheckedChange = (value: CheckedState) => {
      table.toggleAllPageRowsSelected(!!value);

      const selectedData = value
        ? table.getRowModel().rows.map((row) => row.original)
        : [];

      onSelectAll?.(selectedData);
    };

    return (
      <div className="min-h-[43.5px] flex h-full items-center px-4 shadow-none">
        <div className="min-h-[43.5px] flex items-center h-full border-r border-[#DFE4EA] pr-3">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            data-state={
              table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : table.getIsAllPageRowsSelected()
                ? "checked"
                : "unchecked"
            }
            onCheckedChange={handleCheckedChange}
            aria-label="Select all"
          />
        </div>
        <div className="ml-3 flex items-center gap-2.5">{headerName}</div>
      </div>
    );
  },
  cell: ({ row }) => {
    const isFavorited = favorites[row.original[fieldId]];

    return (
      <div className="flex h-full items-center px-4 justify-between">
        <div
          className={cn(
            "flex items-center h-full border-r border-[#DFE4EA] pr-3"
          )}
        >
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);

              onSelect?.(row.original[fieldId]);
            }}
            aria-label="Select row"
          />
        </div>
        <div className="ml-3 flex items-center gap-3 flex-1 min-w-0">
          <img
            src={`https://sinerg.blob.core.windows.net/main/img/logo/${row.original.logo_filename}`}
            alt=""
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          {withTooltipRenderer(
            <a
              href={`/${path}/${row.original[fieldId]}`}
              className="truncate text-inherit hover:underline cursor-pointer"
            >
              {row.getValue(field)}
            </a>,
            row.getValue(field)
          )}
        </div>
        <div className="flex items-center flex-shrink-0 justify-end min-w-[32px]">
          <button
            onClick={() => toggleFavorite(row.original[fieldId])}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-transparent hover:bg-transparent p-0"
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorited ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                className="size-5"
              >
                <path
                  fill="#637381"
                  d="M10 18c-.25 0-.5-.094-.688-.25-.718-.625-1.437-1.219-2.062-1.75-1.813-1.531-3.406-2.875-4.5-4.188C1.5 10.313.937 8.938.937 7.407c0-1.468.5-2.843 1.438-3.843A4.912 4.912 0 0 1 6 2c1.031 0 2 .344 2.844.969.344.25.625.562.906.906a.293.293 0 0 0 .469 0c.281-.344.594-.625.906-.906A4.541 4.541 0 0 1 13.969 2c1.406 0 2.687.563 3.625 1.563.937 1 1.437 2.374 1.437 3.843 0 1.532-.562 2.907-1.812 4.375-1.094 1.313-2.688 2.656-4.5 4.188-.625.531-1.344 1.125-2.063 1.75-.156.187-.406.281-.656.281Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                className="size-5"
              >
                <path
                  fill="#637381"
                  d="M10 18.438c-.406 0-.813-.157-1.125-.438a164.876 164.876 0 0 0-1.969-1.688c-1.781-1.53-3.343-2.812-4.437-4.125C1.188 10.626.563 9.158.563 7.5c0-1.594.562-3.094 1.562-4.188a5.392 5.392 0 0 1 4-1.75c1.156 0 2.25.375 3.188 1.094.25.188.468.375.687.625.219-.219.438-.437.688-.625.937-.719 2-1.094 3.187-1.094 1.563 0 2.969.625 4 1.75 1.031 1.094 1.563 2.594 1.563 4.188 0 1.656-.594 3.125-1.907 4.688-1.093 1.312-2.656 2.624-4.437 4.124-.594.5-1.281 1.094-2 1.688a1.562 1.562 0 0 1-1.094.438ZM6.125 2.967a4.133 4.133 0 0 0-3 1.282c-.75.844-1.156 2-1.156 3.25 0 1.281.5 2.5 1.562 3.781 1.031 1.219 2.531 2.5 4.25 3.969.594.5 1.282 1.094 2 1.719a.376.376 0 0 0 .438 0c.719-.625 1.406-1.188 2-1.719 1.75-1.5 3.25-2.75 4.25-3.969C17.53 10 18.03 8.781 18.03 7.5c0-1.25-.437-2.406-1.187-3.219a4.027 4.027 0 0 0-2.969-1.312c-.844 0-1.625.281-2.313.781a5.873 5.873 0 0 0-.78.75 1.043 1.043 0 0 1-.782.375c-.313 0-.563-.125-.781-.375a5.87 5.87 0 0 0-.781-.75 3.754 3.754 0 0 0-2.313-.781Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  },
});
