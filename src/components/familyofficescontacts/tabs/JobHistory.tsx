import React from "react";
import { FieldsRenderer } from "@/components/common";

export const JobHistory = ({ title, other_fields }) => {
  const joHistoryField = [
    { label: "Area of responsibility", value: title },
    { label: "Position title", value: other_fields.office_tag },
    { label: "Company Name", value: other_fields.family_office },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="font-semibold text-xl mb-2">2020-Current Time</h2>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-[120px]">
          <div className="space-y-2">
            {joHistoryField
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer key={f.label} label={f.label} />
              ))}
          </div>
          <div className="space-y-2">
            {joHistoryField
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
        <h2 className="font-semibold text-xl mb-2">02/1990-08/2020</h2>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="flex space-x-[120px]">
          <div className="space-y-2">
            {joHistoryField
              .filter((f) => f.value)
              .map((f) => (
                <FieldsRenderer key={f.label} label={f.label} />
              ))}
          </div>
          <div className="space-y-2">
            {joHistoryField
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
    </div>
  );
};
