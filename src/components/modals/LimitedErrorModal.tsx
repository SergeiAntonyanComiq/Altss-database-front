import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LimitErrorType } from "@/services/usersService.ts";

interface LimitErrorModalProps {
  open: boolean;
  onClose: () => void;
  type: LimitErrorType;
}

const limitMessageMap: Record<
  LimitErrorType,
  { title: string; description: string }
> = {
  personal_phones_limit: {
    title: "You’ve reached your personal phone limit",
    description:
      "This trial includes access to a limited number of verified phones. To unlock full contact data and continue exploring Altss, please contact your account executive.",
  },
  personal_emails_limit: {
    title: "You’ve reached your personal email access limit",
    description:
      "This trial includes access to a limited number of verified personal email. Please contact your account executive to upgrade.",
  },
  business_phones_limit: {
    title: "You’ve reached your work phone limit",
    description:
      "This trial includes access to a limited number of work phones. To unlock full contact data and continue exploring Altss, please contact your account executive.",
  },
  business_emails_limit: {
    title: "You’ve reached your work email limit",
    description:
      "This trial includes access to a limited number of work email. To unlock full contact data and continue exploring Altss, please contact your account executive.",
  },
};

const LimitErrorModal = ({ open, onClose, type }: LimitErrorModalProps) => {
  const fallbackMessage = {
    title: "Limit reached",
    description:
      "You’ve reached a data access limit. Please contact your account executive for more details.",
  };

  const { title, description } = limitMessageMap[type] ?? fallbackMessage;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LimitErrorModal;
