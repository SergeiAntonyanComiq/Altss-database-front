import { FieldsRenderer } from "@/components/common";
import React from "react";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const Mandate = ({
  firm_type,
  geographic_focus,
  emerging_markets,
  industry,
}: FamilyOffice) => {
  const mandateBaselineField = [
    {
      label: "Publication date",
      value: "28.12.2023",
    },
    {
      label: "Investment period",
      value: "Q1'2024-Q4'2030",
    },
    {
      label: "Total amount ($, mln)",
      value: "30.0",
    },
    {
      label: "Ticket size ($, mln)",
      value: "0.1-0.7",
    },
    {
      label: "Contact Person",
      value: "Ethan Caldwell",
    },
  ];

  const mandateTargetField = [
    {
      label: "Company type",
      value: firm_type,
    },
    {
      label: "Geo Focus",
      value: geographic_focus?.split(","),
    },
    {
      label: "Technology & Vertical",
      value: emerging_markets?.split(","),
    },
    {
      label: "Industries",
      value: industry,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="font-semibold text-xl py-2 mb-2">Baseline</h2>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-[120px]">
          <div className="space-y-[24px]">
            {mandateBaselineField
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer key={f.label} label={f.label} />
              ))}
          </div>
          <div className="space-y-[24px]">
            {mandateBaselineField
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer
                  key={f.label}
                  value={f.value}
                  modalHeader={f.label}
                  isBadge={f.label === "Contact Person"}
                  variant="secondary"
                />
              ))}
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl py-2 mb-2">Target</h2>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="flex space-x-[120px]">
        <div className="space-y-[24px]">
          {mandateTargetField
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer key={f.label} label={f.label} />
            ))}
        </div>
        <div className="space-y-[24px]">
          {mandateTargetField
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer
                key={f.label}
                value={f.value}
                modalHeader={f.label}
                isBadge={true}
              />
            ))}
        </div>
      </div>
    </>
  );
};
