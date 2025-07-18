"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button.tsx";
import { SingleVirtualizedCommand } from "@/components/virtualized/SingleVirtualizedCommand.tsx";

export interface ContactOption {
  value: string;
  label: string;
}

export const DropdownSearch = ({
  contacts,
  selectedValue,
  onSelect,
  disabled,
  className,
}: {
  contacts: ContactOption[];
  disabled: boolean;
  selectedValue: string;
  onSelect: (value: string) => void;
  className: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className={cn(
            "mt-0 min-w-[300px] flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
        >
          {selectedValue
            ? contacts.find((contact) => contact.value === selectedValue)?.label
            : "Select contact..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-white">
        <SingleVirtualizedCommand
          height="60"
          options={contacts}
          placeholder="Search by Contact Name"
          selectedOption={selectedValue}
          onSelectOption={(currentValue) => {
            onSelect(currentValue === selectedValue ? "" : currentValue);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
