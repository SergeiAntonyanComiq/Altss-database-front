import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { PersonType } from "@/types/person.ts";

export const PersonContacts: ColumnDef<PersonType> = {
  id: "contact",
  header: "Contacts",
  meta: {
    cellClassName:
      "font-normal text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap",
    maxWidth: 200,
  },
  cell: ({ row }) => {
    const email = row.original.email;
    const linkedin = row.original.linkedin;
    const phone = row.original.phone;

    const ensureProtocol = (url: string | undefined | null): string => {
      if (!url || url === "#") return "#";
      if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
      }
      return url;
    };

    return (
      <div className="flex items-center gap-2">
        {email && (
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54"
              alt="Email"
              className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
            />
          </a>
        )}
        {linkedin && (
          <a
            href={ensureProtocol(linkedin)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/beb16618d740a2aa8ec04b177ad0bb8cbdc7b395"
              alt="LinkedIn"
              className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
            />
          </a>
        )}
        {phone && (
          <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/5a26cf0f3dd36a935ed5a7cefbff69240744cd7b"
              alt="Phone"
              className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
            />
          </a>
        )}
      </div>
    );
  },
};
