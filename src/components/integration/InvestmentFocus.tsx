import React from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Controller, useFormContext } from "react-hook-form";

interface InvestmentFocusProps {
  isEditing: boolean;
}

type FocusSectionProps = {
  label: string;
  name: string;
  isEditing: boolean;
};

const RangeInput = ({
  label,
  name,
  isEditing,
}: {
  label: string;
  name: string;
  isEditing: boolean;
}) => {
  const { control } = useFormContext();

  return (
    <div className="mt-10">
      <div className="font-semibold text-lg mb-4">{label}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Min</Label>
          <Controller
            name={`${name}.min`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                disabled={!isEditing}
                placeholder="Min"
                className="w-full bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 disabled:bg-gray-200"
              />
            )}
          />
        </div>
        <div>
          <Label>Max</Label>
          <Controller
            name={`${name}.max`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                disabled={!isEditing}
                placeholder="Max"
                className="w-full bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 disabled:bg-gray-200"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

const FocusSection = ({ label, name, isEditing }: FocusSectionProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id={field.name}
            disabled={!isEditing}
            rows={6}
            className="w-full rounded-md border-0 bg-white disabled:bg-gray-200 p-2 text-base resize-none"
          />
        )}
      />
    </div>
  );
};

export const InvestmentFocus = ({ isEditing }: InvestmentFocusProps) => {
  const { control } = useFormContext();

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FocusSection
          label="Company Type: Confirmed (comma separated)"
          name="investment_focus.company_types.Confirmed"
          isEditing={isEditing}
        />
        <FocusSection
          label="Company Type: Pipeline (comma separated)"
          name="investment_focus.company_types.Pipeline"
          isEditing={isEditing}
        />
        <FocusSection
          label="Company Type: Indicated (comma separated)"
          name="investment_focus.company_types.Indicated"
          isEditing={isEditing}
        />
        <FocusSection
          label="Company Type: Negative (comma separated)"
          name="investment_focus.company_types.Negative"
          isEditing={isEditing}
        />

        <FocusSection
          label="Technological Focuses: Confirmed (comma separated)"
          name="investment_focus.technological_focuses.Confirmed"
          isEditing={isEditing}
        />
        <FocusSection
          label="Technological Focuses: Pipeline (comma separated)"
          name="investment_focus.technological_focuses.Pipeline"
          isEditing={isEditing}
        />
        <FocusSection
          label="Technological Focuses: Indicated (comma separated)"
          name="investment_focus.technological_focuses.Indicated"
          isEditing={isEditing}
        />
        <FocusSection
          label="Technological Focuses: Negative (comma separated)"
          name="investment_focus.technological_focuses.Negative"
          isEditing={isEditing}
        />

        <FocusSection
          label="Industry Focuses: Confirmed (comma separated)"
          name="investment_focus.industry_focuses.Confirmed"
          isEditing={isEditing}
        />
        <FocusSection
          label="Industry Focuses: Pipeline (comma separated)"
          name="investment_focus.industry_focuses.Pipeline"
          isEditing={isEditing}
        />
        <FocusSection
          label="Industry Focuses: Indicated (comma separated)"
          name="investment_focus.industry_focuses.Indicated"
          isEditing={isEditing}
        />
        <FocusSection
          label="Industry Focuses: Negative (comma separated)"
          name="investment_focus.industry_focuses.Negative"
          isEditing={isEditing}
        />

        <FocusSection
          label="Regional Focuses: Confirmed (comma separated)"
          name="investment_focus.regional_focuses.Confirmed"
          isEditing={isEditing}
        />
        <FocusSection
          label="Regional Focuses: Pipeline (comma separated)"
          name="investment_focus.regional_focuses.Pipeline"
          isEditing={isEditing}
        />
        <FocusSection
          label="Regional Focuses: Indicated (comma separated)"
          name="investment_focus.regional_focuses.Indicated"
          isEditing={isEditing}
        />
        <FocusSection
          label="Regional Focuses: Negative (comma separated)"
          name="investment_focus.regional_focuses.Negative"
          isEditing={isEditing}
        />
      </div>

      <div>
        <div className="flex flex-col space-y-4 mb-6">
          <Label>Philanthropic Themes (comma separated)</Label>
          <Controller
            name="investment_focus.philanthropic_themes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id={field.name}
                disabled={!isEditing}
                rows={6}
                className="w-full rounded-md border-0 bg-white disabled:bg-gray-200 p-2 text-base resize-none"
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-between space-x-8">
        <RangeInput
          label="Ticket Size"
          name="investment_focus.ticket_size_musd"
          isEditing={isEditing}
        />
        <RangeInput
          label="Preferred Fund Size"
          name="investment_focus.preferred_fund_size_musd"
          isEditing={isEditing}
        />
        <RangeInput
          label="Investment Horizon (Years)"
          name="investment_focus.investment_horizon_yrs"
          isEditing={isEditing}
        />
      </div>
    </>
  );
};
