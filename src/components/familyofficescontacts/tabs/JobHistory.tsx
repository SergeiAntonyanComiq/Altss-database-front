import React from "react";
import { FieldsRenderer } from "@/components/common";
import { format } from "date-fns";
import { ExperienceData } from "@/services/familyOfficeContactsService.ts";

const formatDateRange = (from: string, to: string | null) => {
  const start = format(new Date(from), "MM/yyyy");
  const end = to ? format(new Date(to), "MM/yyyy") : "Current Time";
  return `${start}-${end}`;
};

export const JobHistory = ({
  experiences,
}: {
  experiences: ExperienceData[];
}) => (
  <div className="p-4">
    {!experiences || experiences.length === 0 ? (
      <div className="p-4 text-sm text-gray-500 italic">
        No job history found.
      </div>
    ) : (
      experiences
        .sort((a, b) => a.order_in_profile - b.order_in_profile)
        .map((job) => {
          const fields = [
            {
              label: "Area of responsibility",
              value: job.department || job.company_industry,
            },
            { label: "Position title", value: job.title },
            { label: "Company Name", value: job.company_name },
          ];

          return (
            <div className="mb-6" key={`${job.title}-${job.company_name}`}>
              <h2 className="font-semibold text-xl mb-2">
                {formatDateRange(job.date_from, job.date_to)}
              </h2>
              <hr className="border-t border-gray-200 mb-4" />
              <div className="flex space-x-[120px]">
                <div className="space-y-2">
                  {fields
                    .filter((f) => f.value)
                    .map((f) => (
                      <FieldsRenderer key={f.label} label={f.label} />
                    ))}
                </div>
                <div className="space-y-2">
                  {fields
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
          );
        })
    )}
  </div>
);
