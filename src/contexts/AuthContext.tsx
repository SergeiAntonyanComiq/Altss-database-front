import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { getUserStatus } from "@/services/usersService";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  userStatus: string | null;
  userPlan: string | null;
  userPlanType: "office_or_contact" | "expired" | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  userStatus: null,
  userPlan: null,
  userPlanType: null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [userPlanType, setUserPlanType] = useState<
    "office_or_contact" | "expired" | null
  >(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      localStorage.removeItem("userName");
      localStorage.removeItem("avatarUrl");
      setUser(null);
      setSession(null);
      setUserStatus(null);
      toast({ title: "Signed out successfully" });
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const statusRes = await getUserStatus();

          setUserStatus(statusRes?.status ?? null);
          setUserPlan(statusRes?.plan ?? null);
          setUserPlanType(statusRes?.type ?? null);
        }
      } catch (err) {
        console.error("AuthProvider init error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          getUserStatus().then((statusRes) => {
            setUserStatus(statusRes?.status ?? null);
            setUserPlan(statusRes?.plan ?? null);
            setUserPlanType(statusRes?.type ?? null);
          });
        } else {
          setUserStatus(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        userStatus,
        userPlan,
        userPlanType,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
