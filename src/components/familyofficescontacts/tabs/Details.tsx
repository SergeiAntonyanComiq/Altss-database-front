import React, { useMemo } from "react";
import { Card } from "@/components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { FieldsRenderer } from "@/components/common";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";
import { LinkedinIcon } from "@/components/ui/icons";
import { useContactDetails } from "@/hooks/useContactDetails.ts";
import { ContactField } from "@/components/familyofficescontacts/tabs/components/ContactField.tsx";

export const Details = ({
  contact_id,
  avatar_filename,
  full_name,
  title,
  other_fields,
  linkedin,
  location_country,
  location_regions,
  location_raw_address,
}: FamilyOfficeContact) => {
  const {
    workEmails,
    workPhones,
    personalEmail,
    personalPhone,
    isEmailsLoading,
    isPhoneLoading,
    isPersonalEmailLoading,
    isPersonalPhoneLoading,
    showEmail,
    showPhone,
    showPersonalEmail,
    showPersonalPhone,
    handleShowWorkDetails,
    handleShowPersonalDetails,
  } = useContactDetails(contact_id);

  const hasLocation =
    !!location_raw_address ||
    !!location_country ||
    (!!location_regions && location_regions.length > 0);

  const detailsFields = useMemo(
    () => [
      { label: "Area of responsibility", value: title },
      ...(hasLocation
        ? [
            {
              label: "Resident Location",
              value:
                location_raw_address ??
                location_country ??
                location_regions.join(","),
            },
          ]
        : []),
      { label: "Current Company", value: other_fields.family_office },
      { label: "Position title", value: title },
      // TODO will integrate when sec registration field will be available
      // { label: "SEC Registration", value: "ID Number" },
    ],
    [
      hasLocation,
      location_country,
      location_raw_address,
      location_regions,
      other_fields.family_office,
      title,
    ]
  );

  const detailFieldsContacts = useMemo(
    () => [
      {
        label: "LinkedIn",
        value: (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            {linkedin}
          </a>
        ),
        isBadge: false,
        icon: (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon />
          </a>
        ),
      },
      ContactField({
        label: "Work Emails",
        icon: (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54"
            alt="Email"
            className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
          />
        ),
        isLoading: isEmailsLoading,
        show: showEmail,
        value: workEmails,
        fallback: "We couldn’t find a work email for this contact.",
        onReveal: () => handleShowWorkDetails("email"),
      }),
      ContactField({
        label: "Work Phone",
        icon: (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/5a26cf0f3dd36a935ed5a7cefbff69240744cd7b"
            alt="Phone"
            className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
          />
        ),
        isLoading: isPhoneLoading,
        show: showPhone,
        value: workPhones,
        fallback: "We couldn’t find a phone number for this contact.",
        onReveal: () => handleShowWorkDetails("phone"),
      }),
      ContactField({
        label: "Personal Email",
        icon: (
          <a
            href={`mailto:${personalEmail}`}
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
        isLoading: isPersonalEmailLoading,
        show: showPersonalEmail,
        value: personalEmail,
        fallback: "We couldn’t find a personal email for this contact.",
        onReveal: () => handleShowPersonalDetails("personalEmail"),
      }),
      ContactField({
        label: "Personal Phone",
        isLoading: isPersonalPhoneLoading,
        icon: (
          <a
            href={`tel:${personalPhone}`}
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
        show: showPersonalPhone,
        value: personalPhone,
        fallback: "We couldn’t find a personal phone number for this contact.",
        onReveal: () => handleShowPersonalDetails("personalPhone"),
      }),
    ],
    [
      linkedin,
      isEmailsLoading,
      showEmail,
      workEmails,
      isPhoneLoading,
      showPhone,
      workPhones,
      personalEmail,
      isPersonalEmailLoading,
      showPersonalEmail,
      isPersonalPhoneLoading,
      personalPhone,
      showPersonalPhone,
      handleShowWorkDetails,
      handleShowPersonalDetails,
    ]
  );

  const filteredDetails = useMemo(
    () => detailsFields.filter((f) => f.value),
    [detailsFields]
  );

  const filteredContactsDetails = useMemo(
    () => detailFieldsContacts.filter((f) => f.value),
    [detailFieldsContacts]
  );

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
              {filteredDetails.map((f) => (
                <FieldsRenderer key={f.label} label={f.label} />
              ))}
            </div>
            <div className="space-y-2">
              {filteredDetails.map((f) => (
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
              {filteredContactsDetails.map((f) => (
                <FieldsRenderer key={f.label} label={f.label} icon={f.icon} />
              ))}
            </div>
            <div className="space-y-2">
              {filteredContactsDetails.map((f) => (
                <FieldsRenderer
                  key={f.label}
                  value={f.value}
                  modalHeader={f.label}
                  isBadge={f.label === "Firm Type" || f.isBadge}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
