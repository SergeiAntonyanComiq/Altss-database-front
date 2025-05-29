import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";

export interface CustomFilterModalProps {
  defaultFilterText: string;
  isOpen: boolean;
  placeholder: string;
  onClose: () => void;
  onApply: (value: string) => void;
}

export const CustomFilterModal = ({
  defaultFilterText,
  isOpen,
  placeholder,
  onClose,
  onApply,
}: CustomFilterModalProps) => {
  const [filter, setFilter] = useState<string>(defaultFilterText);

  const onFilterApply = (value: string) => {
    onApply?.(value);
    onClose?.();
  };

  useEffect(() => {
    setFilter(defaultFilterText);
  }, [defaultFilterText]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-[1000px] sm:max-w-[90%] px-6 sm:px-8">
        <DialogHeader className="flex flex-col items-center gap-2">
          <DialogTitle className="text-[#111928] text-2xl font-semibold text-center">
            Select Filters
          </DialogTitle>
          <div className="w-[90px] h-[2px] bg-[#2665F0]" />
        </DialogHeader>

        <div className="mt-6">
          <div className="w-full border-b border-[#EBEDF1] mb-4">
            <Label
              htmlFor="filter-text"
              className="text-xl font-bold text-[#111928]"
            >
              Just type what you are looking for...
            </Label>
          </div>

          <Textarea
            value={filter}
            onChange={({ target }) => setFilter(target.value ?? "")}
            id="filter-text"
            placeholder={placeholder}
            className="w-full border text-[#111928] border-[#DFE4EA] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-[#9CA3AF] resize-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="xl"
              className="border-[#2665F0] text-[#2665F0]"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            size="xl"
            className="border-[#2665F0]"
            onClick={() => onFilterApply(filter)}
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
