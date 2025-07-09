import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import NotFound from "./pages/NotFound";
import FamilyOffices from "./pages/FamilyOffices";
import FamilyOfficesContacts from "./pages/FamilyOfficesContacts";
import FamilyOfficeProfile from "./pages/FamilyOfficeProfile";
import Favorites from "./pages/Favorites";
import SavedSearches from "./pages/SavedSearches";
import Profile from "./pages/Profile";
import FamilyOfficesContactsProfile from "./pages/FamilyOfficesContactsProfile";
import WaitingApproval from "@/pages/WaitingApproval.tsx";
import TrialBlockedScreen from "@/components/modals/TrialBlockedScreen.tsx";
import Users from "@/pages/Users.tsx";
import { RequireAuth } from "@/components/RequireAuth.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuth0 } from "@/auth/auth0Client.ts";
import { Loading } from "@/utils.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, userPlan, userPlanType, userStatus, loading } = useAuth();
  const location = useLocation();

  const auth0 = useAuth0();

  useEffect(() => {
    setAuth0(auth0);
  }, [auth0]);

  const shouldBlock = user && userPlan === "expired";

  if (!loading) {
    if (!userStatus || userStatus === "pending") {
      if (location.pathname !== "/waiting-approval") {
        return <Navigate to="/waiting-approval" replace />;
      }
    }
  }

  if (shouldBlock) {
    return <TrialBlockedScreen type={userPlanType ?? "expired"} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/familyoffices" replace />} />

      <Route path="/waiting-approval" element={<WaitingApproval />} />

      <Route
        path="/familyoffices"
        element={
          <ProtectedRoute>
            <FamilyOffices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/familyofficescontacts"
        element={
          <ProtectedRoute>
            <FamilyOfficesContacts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/familyofficescontacts/:id"
        element={
          <ProtectedRoute>
            <React.Suspense fallback={<Loading />}>
              <FamilyOfficeProfile />
            </React.Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/familyofficescontactsprofile/:id"
        element={
          <ProtectedRoute>
            <FamilyOfficesContactsProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/familyoffices/:id"
        element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <FamilyOfficeProfile />
            </React.Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-searches"
        element={
          <ProtectedRoute>
            <SavedSearches />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userprofile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RequireAuth>
            <AppContent />
          </RequireAuth>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
