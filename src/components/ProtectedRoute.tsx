import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserStatus, registerUser } from "@/services/usersService";
import { Loader2 } from "lucide-react";
import { Loading } from "@/utils.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const [statusChecked, setStatusChecked] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const isAuthPage = location.pathname === "/auth";

  useEffect(() => {
    const checkStatus = async () => {
      if (user) {
        try {
          const response = await getUserStatus();
          const status = response?.status;

          if (!status) {
            const fullName =
              user.name ??
              `${user.given_name ?? ""} ${user.family_name ?? ""}`.trim();
            const email = user.email ?? "";
            await registerUser(fullName, email);
          } else {
            setIsPending(status === "pending");
          }
        } catch {
          setIsPending(true);
        } finally {
          setStatusChecked(true);
        }
      } else {
        setStatusChecked(true);
      }
    };

    checkStatus();
  }, [user]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location.pathname]);

  if (isLoading || !statusChecked) {
    return <Loading show={true} />;
  }

  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/familyoffices" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
