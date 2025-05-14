import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (token && refreshToken) {
      supabase.auth.setSession({
        access_token: token,
        refresh_token: refreshToken,
      });
    }
  }, []);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill out both fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password updated",
        description: "You can now sign in with your new password.",
      });
      navigate("/signin");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F6F7]">
      <Card className="w-full max-w-md bg-white p-[40px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/images/altss_logo.png"
                  alt="Altss Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <h1 className="mt-10">Reset Your Password</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-16 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="w-full border-b border-[#EBEDF1] mb-[16px]">
                <Label className="text-xl font-bold text-[#111928]">
                  New Password
                </Label>
              </div>
              <Input
                type="password"
                placeholder="New password"
                className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="w-full border-b border-[#EBEDF1] mb-[16px]">
                <Label className="text-xl font-bold text-[#111928]">
                  Confirm Password
                </Label>
              </div>
              <Input
                type="password"
                placeholder="Confirm new password"
                className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleReset} className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Set New Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
