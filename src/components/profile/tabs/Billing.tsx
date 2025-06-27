import React from "react";
import { FieldsRenderer } from "@/components/common";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { UserPlan } from "@/services/usersService.ts";
import { format } from "date-fns";

export const Billing = ({
  plan,
  expirationDate,
}: {
  plan: string;
  expirationDate: Date;
}) => {
  const mySubscriptionFields = [
    { label: "Plan", value: plan },
    ...(plan !== "admin"
      ? [
          {
            label: "Expiration date",
            value: expirationDate ? format(expirationDate, "dd.MM.yyyy") : null,
          },
        ]
      : [{}]),
  ];

  const lifetimeStatisticsFields = [
    { label: "Persons found", value: "12 347" },
    { label: "Companies found", value: "456" },
    { label: "Enriches ordered", value: "--" },
    { label: "Saved Search & Lists", value: "14" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#111928] mb-[15px]">
        My Subscription
      </h2>
      <div className="space-y-4 text-base mb-8">
        <div className="flex space-x-[120px]">
          <div className="space-y-[24px]">
            {mySubscriptionFields
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer key={f.label} label={f.label} />
              ))}
          </div>
          <div className="space-y-[24px]">
            {mySubscriptionFields
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

      {/*<h2 className="text-xl font-bold text-[#111928] mb-[15px]">*/}
      {/*  Lifetime Statistics*/}
      {/*</h2>*/}
      {/*<div className="flex space-x-[120px]">*/}
      {/*  <div className="space-y-[24px]">*/}
      {/*    {lifetimeStatisticsFields*/}
      {/*      .filter((f) => f.value)*/}
      {/*      .map((f) => (*/}
      {/*        <FieldsRenderer key={f.label} label={f.label} />*/}
      {/*      ))}*/}
      {/*  </div>*/}
      {/*  <div className="space-y-[24px]">*/}
      {/*    {lifetimeStatisticsFields*/}
      {/*      .filter((f) => f.value)*/}
      {/*      .map((f) => (*/}
      {/*        <FieldsRenderer*/}
      {/*          key={f.label}*/}
      {/*          value={f.value}*/}
      {/*          modalHeader={f.label}*/}
      {/*          isBadge={f.label === "Firm Type"}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
