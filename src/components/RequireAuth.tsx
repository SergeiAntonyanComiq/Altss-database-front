import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Loading } from "@/utils.tsx";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }

  return <>{children}</>;
};
