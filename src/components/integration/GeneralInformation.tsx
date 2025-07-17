import React from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { IntegrationOffice } from "@/services/integrationService.ts";
import { Controller, useFormContext } from "react-hook-form";

interface GeneralInformationProps {
  isEditing: boolean;
  hideCompanyId: boolean;
}

type PrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

const fields: {
  key: PrimitiveKeys<IntegrationOffice>;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
  isTextArea?: boolean;
  colSpan?: string;
  placeholder?: string;
}[] = [
  { key: "company_id", label: "Office ID", type: "text" },
  { key: "firm_name", label: "Office Name", type: "text", required: true },
  { key: "firm_type", label: "Office Type", type: "text", required: true },
  { key: "city", label: "City", type: "text" },
  { key: "country", label: "Country", type: "text" },
  { key: "region", label: "Region", type: "text" },
  { key: "aum", label: "AUM", type: "text", placeholder: "$23B" },
  {
    key: "year_founded",
    label: "Year Founded",
    type: "text",
    placeholder: "2020",
  },
  { key: "website", label: "Website", type: "url" },
  { key: "linkedin_url", label: "LinkedIn URL", type: "url" },
  { key: "twitter_url", label: "Twitter URL", type: "url" },
  { key: "logo", label: "Logo URL", type: "url" },
  {
    key: "description",
    label: "Description",
    isTextArea: true,
    colSpan: "md:col-span-3 lg:col-span-4",
  },
];

export const GeneralInformation = ({
  isEditing,
  hideCompanyId = false,
}: GeneralInformationProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IntegrationOffice>();

  const visibleFields = fields.filter(
    (field) => !(hideCompanyId && field.key === "company_id")
  );

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {visibleFields.map(
        ({
          key,
          label,
          placeholder,
          type = "text",
          required,
          isTextArea,
          colSpan,
        }) => {
          const disabled = key === "company_id" || !isEditing;
          const error = errors[key];

          return (
            <div key={key} className={`space-y-2 ${colSpan ?? ""}`}>
              <Label htmlFor={key}>{label}</Label>

              <Controller
                name={key}
                control={control}
                rules={{ required }}
                render={({ field }) =>
                  isTextArea ? (
                    <textarea
                      {...field}
                      id={key}
                      disabled={disabled}
                      rows={6}
                      className={`w-full rounded-md border-0 bg-white disabled:bg-gray-200 p-2 text-base resize-none ${
                        error ? "border border-red-600" : ""
                      }`}
                    />
                  ) : (
                    <Input
                      {...field}
                      id={key}
                      placeholder={isEditing ? placeholder ?? "" : ""}
                      type={type}
                      disabled={disabled}
                      className={`bg-white placeholder:text-gray-400 disabled:bg-gray-200 ${
                        error ? "border border-red-600" : ""
                      }`}
                    />
                  )
                }
              />

              {error && (
                <p className="text-red-600 text-sm">This field is required</p>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};
