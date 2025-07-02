import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getUserStatus } from "@/services/usersService";
import { useAuth0, User } from "@auth0/auth0-react";

interface AuthContextType {
  user: User | undefined;
  loading: boolean;
  userStatus: string | null;
  userPlan: string | null;
  userPlanExpirationDate: Date | null;
  userPlanType: "office_or_contact" | "expired" | null;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userStatus: null,
  userPlan: null,
  userPlanType: null,
  userPlanExpirationDate: null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, logout, isLoading, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [userPlanExpirationDate, setUserPlanExpirationDate] =
    useState<Date | null>(null);
  const [userPlanType, setUserPlanType] = useState<
    "office_or_contact" | "expired" | null
  >(null);

  const signOut = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      setLoading(true);

      if (!user || !isAuthenticated) return;

      try {
        const statusRes = await getUserStatus();

        if (mounted) {
          setUserStatus(statusRes?.status ?? null);
          setUserPlan(statusRes?.plan ?? null);
          setUserPlanExpirationDate(statusRes?.expiration_date ?? null);
          setUserPlanType(statusRes?.type ?? null);
        }
      } catch (err) {
        if (mounted) {
          setUserStatus(null);
        }
      } finally {
        setLoading(false);
      }
    };

    (async () => {
      await fetchStatus();
    })();

    return () => {
      mounted = false;
    };
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading || loading,
        userStatus,
        userPlan,
        userPlanExpirationDate,
        userPlanType,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
