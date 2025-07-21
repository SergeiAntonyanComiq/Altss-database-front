import React, { useEffect, useState } from "react";
import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button.tsx";

interface Deal {
  role: string;
  type: string;
  notes: string;
  currency: string;
  deal_amount: number | string;
  partner_name: string[];
  investment_date: string;
}

interface DealsProps {
  isEditing: boolean;
}

export const Deals = ({ isEditing }: DealsProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<{ deals: Deal[] }>();
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "deals",
  });

  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [prevFieldsLength, setPrevFieldsLength] = useState(fields.length);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const addNewDeal = () => {
    prepend({
      role: "",
      type: "",
      notes: "",
      currency: "",
      deal_amount: "",
      partner_name: [],
      investment_date: "",
    });
  };

  const isAddDisabled = (() => {
    if (watch("deals").length === 0) return false;
    const lastDeal = watch("deals")[0];
    return (
      !lastDeal.role.trim() ||
      !lastDeal.type.trim() ||
      !lastDeal.partner_name ||
      !lastDeal.partner_name.length
    );
  })();

  useEffect(() => {
    if (fields.length > prevFieldsLength) {
      const newField = fields[0];
      if (newField && !expandedIds.includes(newField.id)) {
        setExpandedIds((prev) => [newField.id, ...prev]);
      }
    }
    setPrevFieldsLength(fields.length);
  }, [fields, prevFieldsLength, expandedIds]);

  return (
    <div className="my-10 font-semibold">
      <div className="flex w-full justify-between items-center">
        {isEditing && (
          <Button
            type="button"
            onClick={addNewDeal}
            className="mb-10 px-4 py-2 bg-blue-600 text-white rounded"
            disabled={isAddDisabled}
            title={
              isAddDisabled
                ? "Please fill required fields in the last deal before adding a new one"
                : undefined
            }
          >
            Add Deal
          </Button>
        )}
      </div>

      {fields.map((field, index) => {
        const isExpanded = expandedIds.includes(field.id);
        const roleError = errors?.deals?.[index]?.role;
        const typeError = errors?.deals?.[index]?.type;

        const partnerNameValue = watch(`deals.${index}.partner_name`);

        return (
          <>
            <div
              className="flex items-center cursor-pointer space-x-2 mb-4"
              onClick={() => toggleExpand(field.id)}
            >
              <div className="inline-block rounded-md px-3 py-1 text-sm font-medium text-gray-800">
                {partnerNameValue}
              </div>
              <button
                type="button"
                aria-label={isExpanded ? "Collapse deal" : "Expand deal"}
                className="p-1 focus:outline-none"
              >
                {isExpanded ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
            {isExpanded && (
              <div
                key={field.id}
                className="border rounded-[32px] p-10 mb-4 relative bg-white"
              >
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 text-red-500 mr-10 mt-2"
                  >
                    Remove
                  </button>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor={`deals.${index}.role`}>Role</Label>
                    <Controller
                      control={control}
                      name={`deals.${index}.role`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={`deals.${index}.role`}
                          disabled={!isEditing}
                          className={`bg-white disabled:bg-gray-200 ${
                            roleError ? "border border-red-600" : ""
                          }`}
                        />
                      )}
                    />
                    {roleError && (
                      <p className="text-red-600 text-sm">Role is required</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`deals.${index}.type`}>Type</Label>
                    <Controller
                      control={control}
                      name={`deals.${index}.type`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={`deals.${index}.type`}
                          disabled={!isEditing}
                          className={`bg-white disabled:bg-gray-200 ${
                            typeError ? "border border-red-600" : ""
                          }`}
                        />
                      )}
                    />
                    {typeError && (
                      <p className="text-red-600 text-sm">Type is required</p>
                    )}
                  </div>

                  <div className="space-y-1 col-span-1 sm:col-span-2">
                    <Label htmlFor={`deals.${index}.notes`}>Notes</Label>
                    <Controller
                      control={control}
                      name={`deals.${index}.notes`}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          id={`deals.${index}.notes`}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full rounded-md border border-gray-300 p-2 text-base resize-none disabled:bg-gray-100"
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`deals.${index}.currency`}>Currency</Label>
                    <Controller
                      control={control}
                      name={`deals.${index}.currency`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={`deals.${index}.currency`}
                          disabled={!isEditing}
                          className="bg-white disabled:bg-gray-200 "
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`deals.${index}.deal_amount`}>
                      Deal Amount
                    </Label>
                    <Controller
                      control={control}
                      name={`deals.${index}.deal_amount`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={`deals.${index}.deal_amount`}
                          type="number"
                          disabled={!isEditing}
                          className="bg-white disabled:bg-gray-200 "
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`deals.${index}.partner_name`}>
                      Investments & Deals (comma separated)
                    </Label>
                    <Controller
                      control={control}
                      name={`deals.${index}.partner_name`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={`deals.${index}.partner_name`}
                          disabled={!isEditing}
                          placeholder="Deal1, Deal2"
                          className="bg-white placeholder:text-gray-400 disabled:bg-gray-200 "
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`deals.${index}.investment_date`}>
                      Investment Date
                    </Label>
                    <Controller
                      control={control}
                      name={`deals.${index}.investment_date`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={`deals.${index}.investment_date`}
                          type="date"
                          disabled={!isEditing}
                          className="bg-white disabled:bg-gray-200"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
