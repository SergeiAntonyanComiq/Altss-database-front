import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Loading } from "@/utils.tsx";
import { useLocation } from "react-router-dom";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  const publicRoutes = ["/terms-consent"];

  React.useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !publicRoutes.includes(location.pathname)
    ) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location.pathname]);

  if (
    isLoading ||
    (!isAuthenticated && !publicRoutes.includes(location.pathname))
  ) {
    return <Loading />;
  }

  return <>{children}</>;
};
