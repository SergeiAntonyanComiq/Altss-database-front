
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

  // Log authentication state for debugging
  useEffect(() => {
    console.log("Protected route - Auth state:", { user, loading, path: location.pathname });
  }, [user, loading, location.pathname]);

  if (loading) {
    // Show a nicer loading spinner
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user) {
    console.log("User not authenticated, redirecting to /auth");
    // Redirect to the auth page if the user is not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("User authenticated, allowing access");
  return <>{children}</>;
};

export default ProtectedRoute;
