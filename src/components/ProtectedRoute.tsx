
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("Protected route - Auth state:", { user, loading, path: location.pathname });
  }, [user, loading, location.pathname]);

  // Add additional check to prevent endless redirects
  const isAuthPage = location.pathname === "/auth";
  
  if (loading) {
    console.log("Auth is still loading...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user && !isAuthPage) {
    console.log("User not authenticated, redirecting to /auth");
    // Redirect to the auth page if the user is not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If user is authenticated and trying to access /auth, redirect to companies
  if (user && isAuthPage) {
    console.log("User is authenticated, redirecting from /auth to /companies");
    return <Navigate to="/companies" replace />;
  }

  console.log("User authenticated, allowing access to:", location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;
