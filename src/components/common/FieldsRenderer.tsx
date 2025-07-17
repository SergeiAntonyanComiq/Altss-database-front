import { Badge } from "@/components/ui/badge.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Fragment, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { withTooltipRenderer } from "@/components/ui/withTooltipRenderer.tsx";
import { cn } from "@/lib/utils.ts";

type BadgeItem = {
  label: string;
  onClick?: () => void;
};

export interface FieldsRendererProps {
  label?: string;
  value?:
    | string
    | number
    | Array<string>
    | Array<BadgeItem>
    | JSX.Element
    | null;
  isBadge?: boolean;
  icon?: ReactNode;
  variant?: "outline" | "default" | "secondary";
  modalHeader?: string;
  maxSize?: number;
}

const FieldsRenderer = ({
  label,
  value,
  isBadge,
  icon,
  variant,
  modalHeader,
  maxSize = 4,
}: FieldsRendererProps) => {
  const [open, setOpen] = useState(false);
  const values = Array.isArray(value) ? value : [value];

  return (
    <>
      <div className="text-sm">
        {label ? (
          <div className="min-h-[26px] flex space-x-2 items-center">
            {icon ? icon : null}
            <span className="text-[#637381] font-medium min-w-[160px]">
              {label}
            </span>
          </div>
        ) : null}
        {value ? (
          <div className="w-full flex flex-row justify-start">
            {values.slice(0, maxSize).map((item, index) => {
              const isObject =
                typeof item === "object" && item !== null && "label" in item;

              const content = isObject ? (item as BadgeItem).label : item;
              const onClick = isObject
                ? (item as BadgeItem).onClick
                : undefined;

              return (
                <Fragment key={`${content?.toString()}-${index}`}>
                  {isBadge ? (
                    <div
                      onClick={onClick}
                      className={cn(
                        "flex items-center min-h-[26px] mr-3",
                        onClick ? "cursor-pointer" : ""
                      )}
                    >
                      <Badge variant={variant} className="max-w-[200px]">
                        {content}
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-[#637381] min-h-[26px] flex items-center text-left">
                      {content}
                    </span>
                  )}
                </Fragment>
              );
            })}
            {values.length > maxSize ? (
              <div
                className="max-w-[160px] min-h-[26px] flex items-center mr-3"
                onClick={() => setOpen(!open)}
              >
                <Badge
                  variant={variant}
                  className="w-full px-2 py-1 cursor-pointer"
                >
                  {`+ ${values.length - maxSize}`}
                </Badge>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader className="flex items-center justify-center space-y-[12px]">
            <DialogTitle className="text-2xl">{modalHeader}</DialogTitle>
            <div className="w-[90px] border-2 rounded-[2px] border-[#2665F0]" />
          </DialogHeader>
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            {values.map((item, idx) => {
              const isObject =
                typeof item === "object" && item !== null && "label" in item;
              const content = isObject ? (item as BadgeItem).label : item;
              const onClick = isObject
                ? (item as BadgeItem).onClick
                : undefined;

              return withTooltipRenderer(
                <Badge
                  key={`${content}-${idx}`}
                  variant={variant}
                  onClick={onClick}
                  className={cn(
                    "flex items-center min-h-[26px] mr-3",
                    onClick ? "cursor-pointer" : ""
                  )}
                >
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                    {content}
                  </span>
                </Badge>,
                content?.toString()
              );
            })}
          </div>
          <DialogFooter className="!justify-center w-full flex items-center mt-[35px]">
            <Button
              size="lg"
              className="min-w-[190px] rounded-[50px]"
              onClick={() => setOpen(!open)}
            >
              Got It
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { FieldsRenderer };
