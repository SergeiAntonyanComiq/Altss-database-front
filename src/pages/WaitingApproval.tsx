import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client.ts";
import { getUserStatus, registerUser } from "@/services/usersService.ts";

const WaitingApproval = () => {
  const POLL_INTERVAL_MS = 8000;

  const startPollingUserStatus = async () => {
    let hasRegistered = false;

    const poll = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      const user = session?.user;

      if (!token || !user) return;

      const fullName =
        user.user_metadata.full_name ??
        `${user.user_metadata.first_name ?? ""} ${
          user.user_metadata.last_name ?? ""
        }`.trim();

      try {
        const statusResponse = await getUserStatus();
        const status = statusResponse?.status;

        if (status) {
          hasRegistered = true;
          if (status !== "pending") {
            clearInterval(intervalId);
            window.location.href = "/familyoffices";
          }
          return;
        }

        if (!hasRegistered) {
          await registerUser(fullName, user.email);
          hasRegistered = true;
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    await poll();

    const intervalId = setInterval(poll, POLL_INTERVAL_MS);
  };

  useEffect(() => {
    (async () => {
      await startPollingUserStatus();
    })();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F6F7] px-4">
      <Card className="w-full max-w-md bg-white p-[50px] md:min-w-[505px] text-center">
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
            redirected.
          </p>
          <div className="flex justify-center pt-4">
            <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitingApproval;
