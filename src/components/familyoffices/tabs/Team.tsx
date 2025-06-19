import { FieldsRenderer, EmptyDetailsPage } from "@/components/common";
import React, { useEffect, useState } from "react";
import {
  fetchFamilyOfficeTeam,
  PrimaryContact,
  GroupedTeam,
} from "@/services/familyOfficesService.ts";
import { Loading } from "@/utils.tsx";
import { useContactDetails } from "@/hooks/useContactDetails.ts";
import { ContactField } from "@/components/familyofficescontacts/tabs/components/ContactField.tsx";

export const Team = ({ id }: { id: string }) => {
  const [groupedTeam, setGroupedTeam] = useState<GroupedTeam | null>(null);
  const [primaryContact, setPrimaryContact] = useState<PrimaryContact | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTeam = async () => {
      setLoading(true);

      try {
        const data = await fetchFamilyOfficeTeam(id);
        setGroupedTeam(data.groupedTeam);
        setPrimaryContact(data.primaryContact);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    (async () => {
      await loadTeam();
    })();
  }, [id]);

  const contactId = primaryContact?.contact_id;

  const { workEmails, isEmailsLoading, showEmail, handleShowWorkDetails } =
    useContactDetails(contactId || "");

  if (loading) return <Loading show={true} />;
  if (!primaryContact || !groupedTeam)
    return <EmptyDetailsPage pageName="Team" />;

  const workEmailField =
    primaryContact.work_emails && primaryContact.work_emails.length > 0
      ? {
          label: "Work Emails",
          value: primaryContact.work_emails[0],
          icon: (
            <a
              href={`mailto:${primaryContact.work_emails[0]}`}
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
        }
      : ContactField({
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
        });

  const areaOfResponsibility = Object.keys(groupedTeam).find((group) =>
    groupedTeam[group]?.some((m) => m.contact_id === primaryContact.contact_id)
  );

  const teamFields = [
    {
      label: "Full Name",
      value: (
        <a href={`/familyofficescontactsprofile/${primaryContact.contact_id}`}>
          {primaryContact.full_name}
        </a>
      ),
    },
    {
      label: "Position Title",
      value: primaryContact.title,
    },
    {
      label: "Area of responsibility",
      value: areaOfResponsibility,
    },
    workEmailField,
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
                <FieldsRenderer key={f.label} label={f.label} />
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

      {/* Team Members Section */}
      <h2 className="font-semibold text-xl py-2 mb-2">Team</h2>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="flex space-x-[120px]">
        <div className="space-y-[24px]">
          {Object.entries(groupedTeam).map(([label]) => (
            <FieldsRenderer key={label} label={label} />
          ))}
        </div>
        <div className="space-y-[24px]">
          {Object.entries(groupedTeam).map(([label, members]) => (
            <FieldsRenderer
              key={label}
              value={members.map((m) => ({
                label: m.full_name,
                onClick: () =>
                  m.contact_id
                    ? (window.location.href = `/familyofficescontactsprofile/${m.contact_id}`)
                    : undefined,
              }))}
              modalHeader={label}
              isBadge={true}
              variant="secondary"
            />
          ))}
        </div>
      </div>
    </>
  );
};
