import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { FieldsRenderer, PatternDisplay } from "@/components/common";
import {
  FamilyOfficeContact,
  fetchFullenrichByContactId,
} from "@/services/familyOfficeContactsService.ts";
import { LinkedinIcon } from "@/components/ui/icons";
import { Loading } from "@/utils.tsx";

export const Details = ({
  contact_id,
  avatar_filename,
  full_name,
  title,
  other_fields,
  linkedin,
  general_email,
  phone,
}: FamilyOfficeContact) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [workEmails, setWorkEmails] = useState<string>("");
  const [workPhones, setWorkPhones] = useState<string>("");

  const handleShow = useCallback(
    async (type: "email" | "phone") => {
      if (workEmails || workPhones) {
        if (type === "email") {
          setShowEmail(true);
        }

        if (type === "phone") {
          setShowPhone(true);
        }
        return;
      }

      setIsLoading(true);

      const interval = setInterval(async () => {
        const result = await fetchFullenrichByContactId(contact_id);

        if (
          result?.work_email !== undefined ||
          result?.work_phone !== undefined
        ) {
          setWorkEmails(result.work_email ?? "");
          setWorkPhones(result.work_phone ?? "");
          clearInterval(interval);
          setIsLoading(false);
          if (type === "email") {
            setShowEmail(true);
          }

          if (type === "phone") {
            setShowPhone(true);
          }
        }
      }, 7000);
    },
    [contact_id, workEmails, workPhones]
  );

  const detailsFields = useMemo(
    () => [
      { label: "Area of responsibility", value: title },
      { label: "Resident Location", value: "Ankara (Türkiye)" },
      { label: "Current Company", value: other_fields.family_office },
      { label: "Position title", value: title },
      { label: "SEC Registration", value: "ID Number" },
    ],
    [other_fields.family_office, title]
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
        icon: (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon />
          </a>
        ),
      },
      {
        label: "Work Emails",
        value: showEmail ? (
          workEmails.length > 0 && workEmails ? (
            workEmails
          ) : (
            "We couldn’t find a phone number for this contact."
          )
        ) : (
          <PatternDisplay handleShow={() => handleShow("email")} />
        ),
        isBadge: showEmail && workEmails && workEmails.length > 0,
        icon: (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54"
            alt="Email"
            className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
          />
        ),
      },
      {
        label: "Work Phone",
        value: showPhone ? (
          workPhones && workPhones.length > 0 ? (
            workPhones
          ) : (
            "We couldn’t find a phone number for this contact."
          )
        ) : (
          <PatternDisplay handleShow={() => handleShow("phone")} />
        ),
        isBadge: showPhone && workPhones && workPhones.length > 0,
        icon: (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/5a26cf0f3dd36a935ed5a7cefbff69240744cd7b"
            alt="Phone"
            className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
          />
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
    ],
    [
      general_email,
      handleShow,
      linkedin,
      phone,
      showEmail,
      showPhone,
      workEmails,
      workPhones,
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

  useEffect(() => {
    let isCleared = false;

    const fetchData = async () => {
      const result = await fetchFullenrichByContactId(contact_id);

      if (
        result?.work_email !== undefined ||
        result?.work_phone !== undefined
      ) {
        setWorkEmails(result?.work_email ?? "");
        setWorkPhones(result?.work_phone ?? "");
        isCleared = true;
      }
    };

    (async () => {
      await fetchData();
    })();

    const interval = setInterval(() => {
      if (isCleared) {
        clearInterval(interval);
      } else {
        (async () => {
          await fetchData();
        })();
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [contact_id]);

  return (
    <div>
      <Loading show={isLoading} />
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
