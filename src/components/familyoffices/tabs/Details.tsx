import { FieldsRenderer } from "@/components/common";
import React from "react";
import { FamilyOffice } from "@/services/familyOfficesService.ts";
import { LinkedinIcon } from "@/components/ui/icons";
import { Globe, GlobeIcon, Twitter, XIcon } from "lucide-react";
import { TwitterIcon } from "@/components/ui/icons/Twitter.tsx";

const getSafeUrl = (url?: string) => {
  if (!url) return "#";
  return url.startsWith("http") ? url : `https://${url}`;
};

export const Details = ({
  firm_type,
  city,
  country,
  region,
  aum,
  year_founded,
  wealth_creator,
  industry_wealth_origin,
  sec_registered,
  office_phone,
  website,
  general_email,
  description,
  websites_main,
  websites_main_original,
  twitter_url,
  linkedin,
  linkedin_url,
  websites_linkedin,
  websites_linkedin_canonical,
}: FamilyOffice) => {
  const overviewFields = [
    {
      label: "Family Office",
      value: Array.isArray(firm_type) ? firm_type.join(", ") : firm_type,
    },
    { label: "City", value: city },
    { label: "Country", value: country },
    { label: "Region", value: region },
    { label: "AUM ($, mln)", value: aum },
    { label: "Founded Year", value: year_founded },
    { label: "Wealth Creator", value: wealth_creator },
    {
      label: "Industry Wealth Origin",
      value: industry_wealth_origin,
    },
    { label: "SEC Registered", value: sec_registered },
  ];

  const websiteLink = website ?? websites_main ?? websites_main_original;
  const linkedinLink =
    linkedin_url ??
    linkedin ??
    websites_linkedin ??
    websites_linkedin_canonical;

  const overviewFieldsContacts = [
    {
      label: "Office Phone",
      value: office_phone,
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
    ...(websiteLink
      ? [
          {
            label: "Website",
            value: (
              <a
                href={getSafeUrl(websiteLink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {websiteLink}
              </a>
            ),
            icon: (
              <a
                href={getSafeUrl(websiteLink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <Globe size={16} color="#0A66C2" />
              </a>
            ),
          },
        ]
      : [{}]),
    {
      label: "Office Email",
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
    ...(linkedinLink
      ? [
          {
            label: "LinkedIn",
            value: (
              <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                {linkedinLink}
              </a>
            ),
            isBadge: false,
            icon: (
              <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
            ),
          },
        ]
      : [{}]),
    ...(twitter_url
      ? [
          {
            label: "Twitter",
            value: (
              <a href={twitter_url} target="_blank" rel="noopener noreferrer">
                {twitter_url}
              </a>
            ),
            isBadge: false,
            icon: (
              <a href={twitter_url} target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
            ),
          },
        ]
      : [{}]),
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="font-semibold text-xl py-2 mb-2">About</h2>
        <div className="mb-2 text-sm">
          <span>{description}</span>
        </div>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-[120px]">
          <div className="space-y-[24px]">
            {overviewFields
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer key={f.label} label={f.label} />
              ))}
          </div>
          <div className="space-y-[24px]">
            {overviewFields
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer
                  key={f.label}
                  value={f.value}
                  modalHeader={f.label}
                  isBadge={f.label === "Family Office"}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-xl py-2 mb-2">Contacts</h2>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-[120px]">
          <div className="space-y-[24px]">
            {overviewFieldsContacts
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer key={f.label} label={f.label} icon={f.icon} />
              ))}
          </div>
          <div className="space-y-[24px]">
            {overviewFieldsContacts
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
    </>
  );
};
