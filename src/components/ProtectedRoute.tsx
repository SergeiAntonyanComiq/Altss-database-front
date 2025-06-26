import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getUserStatus } from "@/services/usersService";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, userPlan } = useAuth();
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

          setIsPending(status === "pending");
        } catch {
          setIsPending(true);
        } finally {
          setStatusChecked(true);
        }
      } else {
        setStatusChecked(true); // user is null, done
      }
    };

    (async () => {
      await checkStatus();
    })();
  }, [user]);

  if (loading || !statusChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user && !isAuthPage) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (user && isAuthPage) {
    return <Navigate to="/familyoffices" replace />;
  }

  if (user && isPending && location.pathname !== "/waiting-approval") {
    return <Navigate to="/waiting-approval" replace />;
  }

  if (location.pathname === "/users" && userPlan && userPlan !== "admin") {
    return <Navigate to="/familyoffices" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
