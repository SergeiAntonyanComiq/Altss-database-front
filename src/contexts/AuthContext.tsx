import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthProvider initializing...");
    let mounted = true;
    
    const getSession = async () => {
      try {
        console.log("Fetching session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
        } else if (mounted) {
          console.log("Session fetched:", session?.user?.email || "No session");
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (err) {
        console.error("Unexpected error getting session:", err);
      } finally {
        if (mounted) {
          console.log("Finished loading session");
          setLoading(false);
        }
      }
    };

    getSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Make sure loading is false after any auth state change
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log("Signing out...");
      setLoading(true); // Set loading to true during sign out
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Clear user and session state
        setUser(null);
        setSession(null);
        
        toast({
          title: "Signed out successfully",
        });
      }
    } catch (error) {
      console.error("Unexpected error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
