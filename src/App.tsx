
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PersonalCabinet from "./pages/PersonalCabinet";
import PersonalCabinet2 from "./pages/PersonalCabinet2";
import PersonalCabinet3 from "./pages/PersonalCabinet3";
import PersonalCabinet4 from "./pages/PersonalCabinet4";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cabinet" element={
              <ProtectedRoute>
                <PersonalCabinet />
              </ProtectedRoute>
            } />
            <Route path="/cabinet2" element={
              <ProtectedRoute>
                <PersonalCabinet2 />
              </ProtectedRoute>
            } />
            <Route path="/cabinet3" element={
              <ProtectedRoute>
                <PersonalCabinet3 />
              </ProtectedRoute>
            } />
            <Route path="/cabinet4" element={
              <ProtectedRoute>
                <PersonalCabinet4 />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
