import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import React from "react";

export function NameColumn<T, KName extends keyof T, KId extends keyof T>(
  nameKey: KName,
  idKey: KId,
  basePath: string,
  header: string = "Name"
): ColumnDef<T, T[KName]> {
  return {
    id: "name",
    accessorFn: (row) => row[nameKey],
    header,
    cell: ({ row }) => {
      const id = row.original[idKey];
      const name = row.original[nameKey];
      const normalizedBasePath = basePath.startsWith("/")
        ? basePath
        : `/${basePath}`;

      return (
        <Link
          to={`${normalizedBasePath}/${id}`}
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {name as React.ReactNode}
        </Link>
      );
    },
  };
}
