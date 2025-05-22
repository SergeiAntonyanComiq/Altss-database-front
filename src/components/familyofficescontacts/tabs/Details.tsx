import React from "react";
import { Card } from "@/components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { FieldsRenderer } from "@/components/common";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { LinkedinIcon } from "@/components/ui/icons";

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
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedinIcon />
        </a>
      ),
    },
    // TODO Show twitter if needed
    // {
    //   label: "X (Twitter)",
    //   value: "x.com/lorem-ipsum-2025",
    //   icon: (
    //     <a
    //       href={`mailto:${general_email}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="w-4 h-4 fill-current text-blue-600"
    //         viewBox="0 0 1200 1227"
    //       >
    //         <path d="M1043 0H810L602 297 390 0H0l435 623L11 1227h233l207-293 219 293h390L752 601 1043 0zm-174 1134l-265-354-256 354H198l305-418L90 93h253l240 332 243-332h219L688 493l314 641h-233z" />
    //       </svg>
    //     </a>
    //   ),
    // },
    {
      label: "Work Emails",
      value: email ?? "test@gmail.com",
      icon: (
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
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
        <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer">
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
