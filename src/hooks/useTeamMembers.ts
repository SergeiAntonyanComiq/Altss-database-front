
import { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";

export function useTeamMembers(firmId?: number | string) {
  const [teamMembers, setTeamMembers] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!firmId) {
        setError("Firm ID not available");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching team members for company firm_id:", firmId);
        
        // Convert firmId to string to ensure consistent handling
        const stringFirmId = String(firmId);
        
        const response = await fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts?firm_id=${stringFirmId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch team members: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Team members fetched:", data);
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Failed to load team members. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load team members. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, [firmId, toast]);

  // Find primary contact (assuming it's the first one with a specific role or just the first one)
  const primaryContact = teamMembers.length > 0 ? teamMembers[0] : null;
  const otherMembers = teamMembers.length > 1 ? teamMembers.slice(1) : [];

  return { teamMembers, primaryContact, otherMembers, isLoading, error };
}
