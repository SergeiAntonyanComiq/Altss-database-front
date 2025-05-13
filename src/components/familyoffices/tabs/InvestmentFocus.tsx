import React from "react";
import { FieldsRenderer } from "@/components/common";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export const InvestmentFocus = ({
  firm_type,
  industry_wealth_origin,
  geographic_focus,
  emerging_markets,
}: FamilyOffice) => {
  const investmentFields = [
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
      value: industry_wealth_origin,
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-xl py-2 mb-2">Focus</h2>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="flex space-x-[120px]">
        <div className="space-y-[24px]">
          {investmentFields
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer key={f.label} label={f.label} />
            ))}
        </div>
        <div className="space-y-[24px]">
          {investmentFields
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
    </div>
  );
};
