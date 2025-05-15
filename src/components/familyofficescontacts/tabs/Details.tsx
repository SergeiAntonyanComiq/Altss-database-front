import React from "react";
import { Card } from "@/components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { FieldsRenderer } from "@/components/common";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

export const Details = ({
  avatar_filename,
  full_name,
  title,
  other_fields,
  linkedin,
  general_email,
  email,
  phone,
  office_phone,
}: FamilyOfficeContact) => {
  const detailsFields = [
    { label: "Area of responsibility", value: title },
    { label: "Resident Location", value: "Ankara (Türkiye)" },
    { label: "Current Company", value: other_fields.family_office },
    { label: "Position title", value: title },
    { label: "SEC Registration", value: "ID Number" },
  ];

  const detailFieldsContacts = [
    {
      label: "LinkedIn",
      value: linkedin,
      icon: (
        <a
          href={`mailto:${general_email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 fill-current text-[#0A66C2]"
            viewBox="0 0 34 34"
          >
            <path d="M34,3.1c0-1.7-1.4-3.1-3.1-3.1H3.1C1.4,0,0,1.4,0,3.1v27.8C0,32.6,1.4,34,3.1,34h27.8c1.7,0,3.1-1.4,3.1-3.1V3.1z M10,29H5V12.5h5V29z M7.5,10.3c-1.6,0-2.9-1.3-2.9-2.9C4.6,5.8,5.9,4.5,7.5,4.5c1.6,0,2.9,1.3,2.9,2.9C10.4,9,9.1,10.3,7.5,10.3z M29,29h-5v-7.8c0-1.9,0-4.3-2.6-4.3c-2.6,0-3,2-3,4.1V29h-5V12.5h4.8v2.2h0.1c0.7-1.3,2.4-2.6,4.9-2.6c5.2,0,6.2,3.4,6.2,7.8V29z" />
          </svg>
        </a>
      ),
    },
    {
      label: "X (Twitter)",
      value: "x.com/lorem-ipsum-2025",
      icon: (
        <a
          href={`mailto:${general_email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 fill-current text-blue-600"
            viewBox="0 0 1200 1227"
          >
            <path d="M1043 0H810L602 297 390 0H0l435 623L11 1227h233l207-293 219 293h390L752 601 1043 0zm-174 1134l-265-354-256 354H198l305-418L90 93h253l240 332 243-332h219L688 493l314 641h-233z" />
          </svg>
        </a>
      ),
    },
    {
      label: "Work Emails",
      value: email ?? "test@gmail.com",
      icon: (
        <a
          href={`mailto:${general_email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54"
            alt="Email"
            className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
          />
        </a>
      ),
    },
    {
      label: "Personal Emails",
      value: "personal@gmail.com",
      icon: (
        <a
          href={`mailto:${general_email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54"
            alt="Email"
            className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
          />
        </a>
      ),
    },
    {
      label: "Phone Number",
      value: phone || "+810 000 000 000",
      icon: (
        <a
          href={`tel:${office_phone}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/5a26cf0f3dd36a935ed5a7cefbff69240744cd7b"
            alt="Phone"
            className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
          />
        </a>
      ),
    },
  ];

  return (
    <div>
      <Card className="p-6 mb-4">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`https://sinerg.blob.core.windows.net/main/img/avatars/${avatar_filename}`}
              alt={full_name}
              onError={(e) =>
                ((e.target as HTMLImageElement).src = "/placeholder.svg")
              }
            />
            <AvatarFallback>
              {full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl font-bold">{full_name}</div>
            <div className="text-gray-500">{title}</div>
            <div className="text-sm text-gray-700 mt-1">
              {other_fields?.office_tag && (
                <div>
                  <span className="font-medium">Office Tag:</span>{" "}
                  {other_fields.office_tag}
                </div>
              )}
              {other_fields?.family_office && (
                <div>
                  <span className="font-medium">Family Office:</span>{" "}
                  {other_fields.family_office}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="font-semibold text-xl mb-2">About</h2>
          <hr className="border-t border-gray-200 mb-4" />
          <div className="flex space-x-[120px]">
            <div className="space-y-2">
              {detailsFields
                .filter((f) => f.value)
                .map((f) => (
                  <FieldsRenderer key={f.label} label={f.label} />
                ))}
            </div>
            <div className="space-y-2">
              {detailsFields
                .filter((f) => f.value)
                .map((f) => (
                  <FieldsRenderer
                    key={f.label}
                    value={f.value}
                    modalHeader={f.label}
                    isBadge={f.label === "Area of responsibility"}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold text-xl mb-2">Contacts</h2>
          <hr className="border-t border-gray-200 mb-4" />
          <div className="flex space-x-[120px]">
            <div className="space-y-2">
              {detailFieldsContacts
                .filter((f) => f.value)
                .map((f) => (
                  <FieldsRenderer key={f.label} label={f.label} icon={f.icon} />
                ))}
            </div>
            <div className="space-y-2">
              {detailFieldsContacts
                .filter((f) => f.value)
                .map((f) => (
                  <FieldsRenderer
                    key={f.label}
                    value={f.value}
                    modalHeader={f.label}
                    isBadge={f.label === "Firm Type"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
