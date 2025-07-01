import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/components/ui/use-toast";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

type Props = {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  handleSocialLogin: (provider: "google" | "linkedin_oidc" | "azure") => void;
};

export const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  loading,
  setLoading,
  handleSocialLogin,
}: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (error) {
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign up successful!",
          description: "Please check your email for verification.",
        });
        navigate("/familyoffices");
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="w-full border-b border-[#EBEDF1] mb-[16px]">
              <Label
                htmlFor="firstName"
                className="text-xl font-bold text-[#111928]"
              >
                First Name
              </Label>
            </div>
            <Input
              id="firstName"
              placeholder="First Name"
              className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="w-full border-b border-[#EBEDF1] mb-[16px]">
              <Label
                htmlFor="lastName"
                className="text-xl font-bold text-[#111928]"
              >
                Last Name
              </Label>
            </div>
            <Input
              id="lastName"
              placeholder="Last Name"
              className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="w-full border-b border-[#EBEDF1] mb-[16px]">
            <Label htmlFor="email" className="text-xl font-bold text-[#111928]">
              Email
            </Label>
          </div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="w-full border-b border-[#EBEDF1] mb-[16px]">
            <Label
              htmlFor="password"
              className="text-xl font-bold text-[#111928]"
            >
              Password
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox />
          <div className="text-sm text-black">
            I have read and agree to{" "}
            <span className="underline cursor-pointer">Terms of Use</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
          >
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => handleSocialLogin("azure")}
            disabled={loading}
          >
            Microsoft
          </Button>
        </div>
      </CardFooter>
    </form>
  );
};
