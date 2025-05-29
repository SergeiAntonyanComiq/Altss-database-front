import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export interface CustomEmailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomEmailsModal = ({
  isOpen,
  onClose,
}: CustomEmailsModalProps) => (
  <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="w-full max-w-[1000px] sm:max-w-[90%] px-6 sm:px-8">
      <DialogHeader className="flex flex-col items-center gap-2">
        <DialogTitle className="text-[#111928] text-2xl font-semibold text-center">
          Work Emails
        </DialogTitle>
        <div className="w-[90px] h-[2px] bg-[#2665F0]" />
      </DialogHeader>

      <div className="mt-6">
        <Badge>Test@test.com</Badge>
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
      </div>
    </DialogContent>
  </Dialog>
);
