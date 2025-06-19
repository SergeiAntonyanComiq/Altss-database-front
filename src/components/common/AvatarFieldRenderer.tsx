import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { Fragment, useState } from "react";

type AvatarItem = {
  label: string;
  onClick?: () => void;
  image?: string | null;
};

interface AvatarBadgeDialogListProps {
  items: AvatarItem[];
  variant?: "default" | "outline" | "secondary";
  modalHeader?: string;
}

export const AvatarBadgeDialogList = ({
  items,
  variant = "secondary",
  modalHeader = "Team Members",
}: AvatarBadgeDialogListProps) => {
  const [open, setOpen] = useState(false);
  const previewItems = items.slice(0, 4);

  const renderItem = (item: AvatarItem, idx: number) => (
    <div
      key={`${item.label}-${idx}`}
      className={cn(
        "flex items-center space-x-2 cursor-pointer",
        item.onClick ? "hover:opacity-80" : "cursor-default"
      )}
      onClick={item.onClick}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.label}
          className="w-6 h-6 rounded-full object-cover"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-white">
          {getInitials(item.label)}
        </div>
      )}
      <Badge variant={variant} className="max-w-[200px]">
        {item.label}
      </Badge>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {previewItems.map((item, idx) => (
          <Fragment key={idx}>{renderItem(item, idx)}</Fragment>
        ))}

        {items.length > 4 && (
          <Badge
            variant={variant}
            className="cursor-pointer px-2 py-1"
            onClick={() => setOpen(true)}
          >
            +{items.length - 4}
          </Badge>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">{modalHeader}</DialogTitle>
            <div className="w-[90px] border-2 rounded-[2px] border-[#2665F0] mx-auto mt-2" />
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            {items.map((item, idx) => (
              <Fragment key={idx}>{renderItem(item, idx)}</Fragment>
            ))}
          </div>

          <DialogFooter className="!justify-center mt-6">
            <Button
              size="lg"
              className="min-w-[190px] rounded-[50px]"
              onClick={() => setOpen(false)}
            >
              Got It
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
