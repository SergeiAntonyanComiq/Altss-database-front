import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import NotFound from "./pages/NotFound";
import FamilyOffices from "./pages/FamilyOffices";
import FamilyOfficesContacts from "./pages/FamilyOfficesContacts";
import FamilyOfficeProfile from "./pages/FamilyOfficeProfile";
import Favorites from "./pages/Favorites";
import SavedSearches from "./pages/SavedSearches";
import Profile from "./pages/Profile";
import FamilyOfficesContactsProfile from "./pages/FamilyOfficesContactsProfile";
import Users from "@/pages/Users.tsx";
import { Loading } from "@/utils.tsx";
import TermsConsent from "@/pages/TermsConsent.tsx";
import Integration from "@/pages/Integrations.tsx";
import IntegrationDetails from "@/pages/IntegrationDetails.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/familyoffices" replace />} />

      <Route path="/terms-consent" element={<TermsConsent />} />

      <Route path="/familyoffices" element={<FamilyOffices />} />
      <Route
        path="/familyofficescontacts"
        element={<FamilyOfficesContacts />}
      />
      <Route path="/users" element={<Users />} />
      <Route path="/integration" element={<Integration />} />
      <Route path="/integration/:id" element={<IntegrationDetails />} />
      <Route
        path="/familyofficescontacts/:id"
        element={
          <React.Suspense fallback={<Loading />}>
            <FamilyOfficeProfile />
          </React.Suspense>
        }
      />
      <Route
        path="/familyofficescontactsprofile/:id"
        element={<FamilyOfficesContactsProfile />}
      />
      <Route
        path="/familyoffices/:id"
        element={
          <React.Suspense fallback={<Loading />}>
            <FamilyOfficeProfile />
          </React.Suspense>
        }
      />

      <Route path="/favorites" element={<Favorites />} />
      <Route path="/saved-searches" element={<SavedSearches />} />
      <Route path="/userprofile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
