import React from "react";
import { format } from "date-fns";
import { ExperienceData } from "@/services/familyOfficeContactsService";
import { Link } from "react-router-dom";
import clsx from "clsx";

const formatDateRangeWithDuration = (
  from: string,
  to: string | null,
  duration: string | null
) => {
  const start = format(new Date(from), "MMM yyyy");
  const end = to ? format(new Date(to), "MMM yyyy") : "Present";
  return duration ? `${start} – ${end} · ${duration}` : `${start} – ${end}`;
};

export const JobHistory = ({
  experiences,
}: {
  experiences: ExperienceData[];
}) => {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500 italic">
        No job history found.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {experiences
        .sort((a, b) => a.order_in_profile - b.order_in_profile)
        .map((job) => {
          const dateInfo = formatDateRangeWithDuration(
            job.date_from,
            job.date_to,
            job.job_time_period
          );
          const company = job.company_id ? (
            <Link
              to={`/familyoffices/${job.company_id}?from=${encodeURIComponent(
                window.location.pathname
              )}`}
              className="text-blue-600 hover:underline"
            >
              {job.company_name}
            </Link>
          ) : (
            job.company_name
          );

          return (
            <div
              key={`${job.title}-${job.company_name}`}
              className="flex space-x-4"
            >
              {job.company_logo_url ? (
                <img
                  src={job.company_logo_url}
                  alt={job.company_name || "Company Logo"}
                  className="w-12 h-12 object-contain rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 text-gray-700 rounded flex items-center justify-center text-lg font-semibold">
                  {job.company_name?.[0] || "?"}
                </div>
              )}

              <div className="flex-1">
                <div className="text-lg font-medium">
                  {job.title}{" "}
                  {job.company_name && (
                    <span className="text-gray-700 font-normal">
                      · {company}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{dateInfo}</div>
                {job.location && (
                  <div className="text-sm text-gray-500">{job.location}</div>
                )}
                {job.description && (
                  <div className="mt-2 space-y-2 text-sm text-gray-800 whitespace-pre-line">
                    {job.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
