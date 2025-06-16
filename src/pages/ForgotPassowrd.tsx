import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { data: userData } = await supabase.functions.invoke(
      "check-user-by-email",
      {
        body: JSON.stringify({ email }),
      }
    );

    if (!userData?.exists) {
      toast({
        title: "Email not found",
        description: "There is no account with this email address.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (error) {
      toast({
        title: "Error sending reset link",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Reset link sent",
        description: "Check your inbox to reset your password.",
      });
      navigate("/auth");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F6F7]">
      <Card className="w-full max-w-md bg-white p-[40px]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/images/logo.png"
                  alt="Altss Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <h1 className="mt-10"> Forgot your password?</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-16">
          <div className="space-y-2">
            <div className="w-full border-b border-[#EBEDF1] mb-[16px]">
              <Label className="text-xl font-bold text-[#111928]">Email</Label>
            </div>
            <Input
              className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleReset} className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
