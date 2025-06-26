import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import NotFound from "./pages/NotFound";
import PersonalCabinet3 from "./pages/PersonalCabinet3";
import ProfilePage from "./pages/ProfilePage";
import CompanyProfile from "./pages/CompanyProfile";
import Auth from "./pages/Auth";
import Companies from "./pages/Companies";
import FamilyOffices from "./pages/FamilyOffices";
import FamilyOfficesContacts from "./pages/FamilyOfficesContacts";
import FamilyOfficeProfile from "./pages/FamilyOfficeProfile";
import Investors from "./pages/Investors";
import CompanyDetails from "./pages/CompanyDetails";
import Favorites from "./pages/Favorites";
import SavedSearches from "./pages/SavedSearches";
import Profile from "./pages/Profile";
import InvestorProfile from "./pages/InvestorProfile";
import FamilyOfficesContactsProfile from "./pages/FamilyOfficesContactsProfile";
import ForgotPassword from "@/pages/ForgotPassowrd.tsx";
import ResetPassword from "@/pages/ResetPassword.tsx";
import WaitingApproval from "@/pages/WaitingApproval.tsx";
import { isLocked } from "@/utils/routeAccess.ts";
import TrialBlockedScreen from "@/components/modals/TrialBlockedScreen.tsx";
import Users from "@/pages/Users.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, userPlan, userPlanType } = useAuth();

  const shouldBlock = user && userPlan === "expired";

  if (shouldBlock) {
    return <TrialBlockedScreen type={userPlanType ?? "expired"} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/waiting-approval" element={<WaitingApproval />} />

      <Route
        path="/persons"
        element={
          isLocked("/persons") ? (
            <Navigate to="/familyoffices" />
          ) : (
            <ProtectedRoute>
              <PersonalCabinet3 />
            </ProtectedRoute>
          )
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/companyprofile/:id"
        element={
          <ProtectedRoute>
            <CompanyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/investorprofile/:id"
        element={
          <ProtectedRoute>
            <InvestorProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/companies"
        element={
          isLocked("/companies") ? (
            <Navigate to="/familyoffices" />
          ) : (
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          )
        }
      />
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
            <React.Suspense fallback={<div>Loading...</div>}>
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
        path="/investors"
        element={
          isLocked("/investors") ? (
            <Navigate to="/familyoffices" />
          ) : (
            <ProtectedRoute>
              <Investors />
            </ProtectedRoute>
          )
        }
      />
      <Route
        path="/company/:id"
        element={
          <ProtectedRoute>
            <CompanyDetails />
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
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
