import * as React from "react";
import { ContactOption } from "@/components/ui/dropdown-search.tsx";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { cn } from "@/lib/utils.ts";
import { CheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";

interface MultipleVirtualizedCommandProps {
  height: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onSelect: (value: string) => void;
  onClear: () => void;
  toggleAll: () => void;
}

export const MultipleVirtualizedCommand = ({
  height,
  options,
  selectedValues,
  onSelect,
  onClear,
  toggleAll,
}: MultipleVirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] =
    React.useState<ContactOption[]>(options);
  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        break;
      }
      case "ArrowUp": {
        event.preventDefault();

        break;
      }
      case "Enter": {
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options?.filter((option) =>
        option?.label?.toLowerCase().includes(search.toLowerCase() ?? "")
      )
    );
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput placeholder="Search..." onValueChange={handleSearch} />
      <CommandList ref={parentRef} style={{ height, overflow: "auto" }}>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={toggleAll}>
            <div
              className={cn(
                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                selectedValues.length === options.length
                  ? "bg-primary text-primary-foreground"
                  : "opacity-50"
              )}
            >
              {selectedValues.length === options.length ? (
                <CheckIcon className="h-4 w-4" />
              ) : null}
            </div>
            <span>(Select All)</span>
          </CommandItem>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualOptions.map((virtualOption) => {
              const option = filteredOptions[virtualOption.index];
              const isSelected = selectedValues.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => onSelect(option.value)}
                  style={{
                    height: `${virtualOption.size}px`,
                    transform: `translateY(${virtualOption.start}px)`,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {isSelected ? <CheckIcon className="h-4 w-4" /> : null}
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              );
            })}
          </div>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <div className="flex items-center justify-between">
            {selectedValues.length > 0 && (
              <>
                <CommandItem
                  onSelect={onClear}
                  className="flex-1 justify-center cursor-pointer"
                >
                  Clear
                </CommandItem>
                <Separator
                  orientation="vertical"
                  className="flex min-h-6 h-full"
                />
              </>
            )}
            <CommandItem
              onSelect={() => {}}
              className="flex-1 justify-center cursor-pointer max-w-full"
            >
              Close
            </CommandItem>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
