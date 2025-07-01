import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/components/ui/use-toast";
import { CardContent, CardFooter } from "@/components/ui/card";
import { getUserStatus } from "@/services/usersService";

type Props = {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  handleSocialLogin: (provider: "google" | "linkedin_oidc" | "azure") => void;
};

export const SignInForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  setLoading,
  handleSocialLogin,
}: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed in successfully!",
          description: "Welcome back!",
        });

        const statusResponse = await getUserStatus();
        const status = statusResponse?.status;

        navigate(
          status && status !== "pending"
            ? "/familyoffices"
            : "/waiting-approval"
        );
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
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4 pt-4">
        <div>
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
        <div className="mt-[48px]">
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
            className="border-[#DFE4EA] border placeholder:text-#9CA3AF"
            placeholder="Type here.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-right mt-2">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
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
