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

export interface FieldsRendererProps {
  label?: string;
  value?: string | number | Array<string> | JSX.Element | null;
  isBadge?: boolean;
  icon?: ReactNode;
  variant?: "outline" | "default" | "secondary";
  modalHeader?: string;
}

const FieldsRenderer = ({
  label,
  value,
  isBadge,
  icon,
  variant,
  modalHeader,
}: FieldsRendererProps) => {
  const [open, setOpen] = useState(false);
  const values = Array.isArray(value) ? value : [value];

  return (
    <>
      <div className="text-sm">
        {label ? (
          <div className="min-h-[26px] flex space-x-2 items-center">
            {icon ? icon : null}
            <span className="text-[#637381] font-medium">{label}</span>
          </div>
        ) : null}
        {value ? (
          <div className="w-full flex flex-row justify-start">
            {values.slice(0, 4).map((item, index) => (
              <Fragment key={item.toString()}>
                {isBadge ? (
                  <div
                    key={`${JSON.stringify(item)}-${index}`}
                    className="flex items-center min-h-[26px] mr-3"
                  >
                    <Badge variant={variant} className="max-w-[350px] ">
                      {item}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-[#637381] min-h-[26px] flex items-center text-left">
                    {item}
                  </span>
                )}
              </Fragment>
            ))}
            {values.length > 4 ? (
              <div
                className="max-w-[160px] min-h-[26px] flex items-center mr-3"
                onClick={() => setOpen(!open)}
              >
                <Badge
                  variant={variant}
                  className="w-full px-2 py-1 cursor-pointer"
                >
                  {`+ ${values.length - 3}`}
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
            {values.map((item, idx) => (
              <Badge
                key={`${item}-${idx}`}
                variant={variant}
                className="max-w-[300px]"
              >
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {item}
                </span>
              </Badge>
            ))}
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
