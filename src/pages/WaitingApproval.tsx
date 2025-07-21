import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { getUserStatus } from "@/services/usersService.ts";

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export const WaitingApprovalModal = ({ open, onOpenChange }: Props) => {
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(async () => {
      try {
        const res = await getUserStatus();
        if (res?.status !== "pending") {
          onOpenChange(false);
          window.location.href = "/";
        }
      } catch (e) {
        console.error("Status check failed", e);
      }
    }, 3000000);

    return () => clearInterval(interval);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0 bg-white [&>button:last-of-type]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <Card className="text-center border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">
              <div className="flex justify-center">
                <img
                  src="/images/logo.png"
                  alt="Altss Logo"
                  className="h-10 object-contain"
                />
              </div>
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111928]">
              Your account is under review
            </h2>
            <p className="text-sm text-[#6B7280]">
              Once your account is approved by an admin, you’ll be automatically
              redirected and data will be available.
            </p>
            <div className="flex justify-center pt-4">
              <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
            </div>
            <Button
              className="mt-8 w-full"
              onClick={() => (window.location.href = "/")}
            >
              Go to Home Page
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
