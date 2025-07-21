import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import apiClient from "@/lib/axios.ts";

const TermsConsent = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user");

  const [fullName, setFullName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userId) {
      toast({
        title: "Missing user ID",
        description: "Please try logging in again.",
        variant: "destructive",
      });
      return;
    }

    if (!fullName.trim()) {
      setValidationError("Full Name is required.");
      return;
    }

    if (!agreed) {
      setValidationError("You must agree to the Privacy Policy and Terms.");
      return;
    }

    setLoading(true);

    try {
      await apiClient.post("/users/set-agreed-to-terms", null, {
        params: {
          userId,
          full_name: fullName,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F6F7]">
      <Card className="w-full max-w-md bg-white p-[40px]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            <div className="flex items-center justify-between w-full">
              <img
                src="/images/logo.png"
                alt="Altss Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="mt-10">Welcome to Altss</h1>
            <p className="text-sm font-normal mt-2 text-gray-500">
              Please enter your full name and agree to our terms to continue.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-xl font-bold text-[#111928]">
              Full Name
            </Label>
            <Input
              className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(value) => setAgreed(!!value)}
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-blue-600 underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-of-service"
                target="_blank"
                className="text-blue-600 underline"
              >
                Terms of Service
              </a>
              .
            </span>
          </div>
          {validationError && (
            <p className="text-sm text-red-600 mt-1">{validationError}</p>
          )}

          <Button onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsConsent;
