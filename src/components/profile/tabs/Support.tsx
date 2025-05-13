import React from "react";
import { FieldsRenderer } from "@/components/common";

export const Support = () => {
  const supportDetailsFields = [
    { label: "Name", value: "Dawid Siekiera" },
    { label: "Email", value: "d@atss.com" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#111928] mb-[15px]">
        Your manager
      </h2>
      <div className="flex space-x-[120px]">
        <div className="space-y-[24px]">
          {supportDetailsFields
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer key={f.label} label={f.label} />
            ))}
        </div>
        <div className="space-y-[24px]">
          {supportDetailsFields
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
      <a
        href="https://cal.com/dawid.s/altss-support"
        target="_blank"
        rel="noopener noreferrer"
        className="self-stretch bg-white border text-base min-w-[200px] mt-[48px] text-[#2665F0] w-auto py-[12px] rounded-[50px] border-[#2665F0] border-solid font-medium hover:bg-gray-50 transition-colors inline-block text-center"
      >
        Book a call
      </a>
    </div>
  );
};
