import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getUserById, getUserStatus, User } from "@/services/usersService";
import { useAuth0, User as Auth0User } from "@auth0/auth0-react";

interface AuthContextType {
  user: Auth0User | undefined;
  userData: User | undefined;
  loading: boolean;
  userStatus: string | null;
  userPlan: string | null;
  userPlanExpirationDate: Date | null;
  userPlanType: "office_or_contact" | "expired" | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  userStatus: null,
  userPlan: null,
  userPlanType: null,
  userPlanExpirationDate: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, logout, isLoading, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [userPlanExpirationDate, setUserPlanExpirationDate] =
    useState<Date | null>(null);
  const [userPlanType, setUserPlanType] = useState<
    "office_or_contact" | "expired" | null
  >(null);

  useEffect(() => {
    let mounted = true;

    const fetchUserInfo = async () => {
      setLoading(true);

      if (!user || !isAuthenticated) return;

      try {
        const [statusRes, userDataRes] = await Promise.all([
          getUserStatus(),
          getUserById(user?.sub),
        ]);

        if (mounted) {
          setUserStatus(statusRes?.status ?? null);
          setUserPlan(statusRes?.plan ?? null);
          setUserPlanExpirationDate(statusRes?.expiration_date ?? null);
          setUserPlanType(statusRes?.type ?? null);
          setUserData(userDataRes);
        }
      } catch (error) {
        if (mounted) {
          setUserStatus(null);
          setUserData(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    (async () => {
      await fetchUserInfo();
    })();

    return () => {
      mounted = false;
    };
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading: isLoading || loading,
        userStatus,
        userPlan,
        userPlanExpirationDate,
        userPlanType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
