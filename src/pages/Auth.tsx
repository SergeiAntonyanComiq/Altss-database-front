import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/components/auth/SignInForm.tsx";
import { SignUpForm } from "@/components/auth/SignUpForm.tsx";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSocialLogin = async (
    provider: "google" | "linkedin_oidc" | "azure"
  ) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          scopes: "email",
          redirectTo: window.location.origin + "/waiting-approval",
        },
      });

      if (error) {
        toast({
          title: `Error signing in with ${provider}`,
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
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
    <div className="flex items-center justify-center min-h-screen bg-[#F6F6F7]">
      <Card className="w-full max-w-md bg-white p-[50px] md:min-w-[505px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold mb-[48px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/images/logo.png"
                  alt="Altss Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          </CardTitle>
          <CardDescription className="flex justify-center text-2xl font-semibold text-[#111928]">
            Welcome to Altss
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              setLoading={setLoading}
              handleSocialLogin={handleSocialLogin}
            />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              loading={loading}
              setLoading={setLoading}
              handleSocialLogin={handleSocialLogin}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
