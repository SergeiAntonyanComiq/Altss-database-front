
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PersonalCabinet3 from "./pages/PersonalCabinet3";
import ProfilePage from "./pages/ProfilePage";
import Auth from "./pages/Auth";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import MyOrders from "./pages/MyOrders";
import Favorites from "./pages/Favorites";
import SavedSearches from "./pages/SavedSearches";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route - no protection */}
            <Route path="/auth" element={<Auth />} />
            
            {/* NotFound should remain accessible */}
            <Route path="*" element={<NotFound />} />
            
            {/* All protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/cabinet3" element={
              <ProtectedRoute>
                <PersonalCabinet3 />
              </ProtectedRoute>
            } />
            <Route path="/profile/:id" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/companies" element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            } />
            <Route path="/company/:id" element={
              <ProtectedRoute>
                <CompanyDetails />
              </ProtectedRoute>
            } />
            <Route path="/my-orders" element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } />
            <Route path="/saved-searches" element={
              <ProtectedRoute>
                <SavedSearches />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
