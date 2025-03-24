
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PersonalCabinet2 from "./pages/PersonalCabinet2";
import PersonalCabinet4 from "./pages/PersonalCabinet4";
import ProfilePage from "./pages/ProfilePage";
import Auth from "./pages/Auth";
import Persons from "./pages/Persons";

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
            <Route path="/cabinet2" element={
              <ProtectedRoute>
                <PersonalCabinet2 />
              </ProtectedRoute>
            } />
            <Route path="/cabinet4" element={
              <ProtectedRoute>
                <PersonalCabinet4 />
              </ProtectedRoute>
            } />
            <Route path="/persons" element={
              <ProtectedRoute>
                <Persons />
              </ProtectedRoute>
            } />
            <Route path="/profile/:id" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
