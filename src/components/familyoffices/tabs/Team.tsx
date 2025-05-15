import { FieldsRenderer } from "@/components/common";
import React from "react";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const Team = ({ wealth_creator, general_email }: FamilyOffice) => {
  const teamMembers = [
    {
      label: "Fundraising",
      value: ["Ethan Caldewell", "Sophia Ramirez"],
    },
    {
      label: "Investment",
      value: [
        "Liam Whitaker",
        "Isabella Chen",
        "Noah Patel",
        "Jonny Smith",
        "Ethan Caldewell",
        "Sophia Ramirez",
      ],
    },
    {
      label: "Oparations",
      value: ["Ava Thoronton", "Benjamin O'Connor", "Emily Nakamura"],
    },
    {
      label: "Legal",
      value: ["Lucas Fernandez", "Olivia Bauer"],
    },
  ];

  const teamFields = [
    {
      label: "Full Name",
      value: wealth_creator,
    },
    {
      label: "Position Title",
      value: "Chief Investors Relations",
    },
    {
      label: "Area of responsibility",
      value: "Fundraising",
    },
    {
      label: "Work Emails",
      value: general_email,
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
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="font-semibold text-xl py-2 mb-2">Primary Contact</h2>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-[120px]">
          <div className="space-y-[24px]">
            {teamFields
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer key={f.label} label={f.label} icon={f.icon} />
              ))}
          </div>
          <div className="space-y-[24px]">
            {teamFields
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
      <h2 className="font-semibold text-xl py-2 mb-2">Team</h2>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="flex space-x-[120px]">
        <div className="space-y-[24px]">
          {teamMembers
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer key={f.label} label={f.label} />
            ))}
        </div>
        <div className="space-y-[24px]">
          {teamMembers
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer
                key={f.label}
                value={f.value}
                modalHeader={f.label}
                isBadge={true}
                variant="secondary"
              />
            ))}
        </div>
      </div>
    </>
  );
};
