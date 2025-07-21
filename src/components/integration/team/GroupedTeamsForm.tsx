import React from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import {
  GroupedTeamFormValues,
  IntegrationOfficeFormValues,
} from "@/services/integrationService.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { MultiSelect } from "@/components/ui/multi-select.tsx";
import { ContactOption } from "@/components/ui/dropdown-search.tsx";

export const GroupedTeamsForm = ({
  isEditable,
  contacts,
}: {
  isEditable: boolean;
  contacts: ContactOption[];
}) => {
  const { control } = useFormContext<IntegrationOfficeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `team.groupedTeam`,
  });

  const addGroup = () => {
    append({ key: "", ids: [] });
  };

  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold mb-4">Grouped Teams</h2>

      {isEditable ? (
        <Button
          type="button"
          onClick={addGroup}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add New Group
        </Button>
      ) : null}

      {fields.map((group, index) => (
        <div
          key={group.id}
          className="mt-6 flex items-center space-x-8 w-full justify-between"
        >
          <div className="mb-4">
            <Label htmlFor={`group-key-${index}`}>Group Name (Key)</Label>
            <Controller
              name={`team.groupedTeam.${index}.key`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={!isEditable}
                  id={`group-key-${index}`}
                  type="text"
                  className="bg-white placeholder:text-gray-400 disabled:bg-gray-200"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor={`group-company-ids-${index}`}>Contact</Label>
            <Controller
              name={`team.groupedTeam.${index}.ids`}
              control={control}
              render={({ field }) => {
                return (
                  <MultiSelect
                    disabled={!isEditable}
                    options={contacts}
                    defaultValue={field.value}
                    onValueChange={(selectedIds) => field.onChange(selectedIds)}
                  />
                );
              }}
            />
          </div>

          {isEditable ? (
            <Button
              type="button"
              onClick={() => remove(index)}
              className="px-4 py-2 bg-red-600 text-white rounded mt-4 hover:bg-red-600"
            >
              Remove Group
            </Button>
          ) : (
            <div className="min-w-[200px]" />
          )}
        </div>
      ))}
    </div>
  );
};
