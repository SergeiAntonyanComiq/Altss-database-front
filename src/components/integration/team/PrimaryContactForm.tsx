import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { IntegrationOffice } from "@/services/integrationService.ts";
import {
  ContactOption,
  DropdownSearch,
} from "@/components/ui/dropdown-search.tsx";

export const PrimaryContactForm = ({
  isEditable,
  contacts,
}: {
  isEditable: boolean;
  contacts: ContactOption[];
}) => {
  const { control, formState } = useFormContext<IntegrationOffice>();

  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold mb-4">Primary Contact</h2>
      <div className="flex flex-row items-center space-x-8">
        <div className="flex flex-col space-y-4">
          <Label htmlFor="contact_id">Contact</Label>
          <Controller
            name="team.primaryContact.contact_id"
            control={control}
            render={({ field }) => (
              <DropdownSearch
                className="bg-white placeholder:text-gray-400 disabled:bg-gray-200"
                disabled={!isEditable}
                contacts={contacts}
                selectedValue={field.value}
                onSelect={(newContactId) => field.onChange(newContactId)}
              />
            )}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Label htmlFor="title">Title</Label>
          <Controller
            name="team.primaryContact.title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={!isEditable}
                id="title"
                type="text"
                onChange={(e) => field.onChange(e)}
                className="bg-white placeholder:text-gray-400 disabled:bg-gray-200"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
