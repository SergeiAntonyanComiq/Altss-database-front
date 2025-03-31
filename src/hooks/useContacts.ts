
import { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";

export function useContacts(page: number = 1, perPage: number = 10) {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        console.log(`Fetching contacts for page ${page}, per page ${perPage}`);
        
        const response = await fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts?page=${page}&per_page=${perPage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch contacts: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Contacts fetched:", data);
        
        // Check if the response contains contacts data and total count
        if (Array.isArray(data.contacts)) {
          setContacts(data.contacts);
          setTotalCount(data.total || data.contacts.length);
        } else if (Array.isArray(data)) {
          // If response is just an array of contacts
          setContacts(data);
          setTotalCount(data.length);
        } else {
          throw new Error("Unexpected response format");
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load contacts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [page, perPage, toast]);

  // Helper function to toggle favorite status
  const toggleFavorite = async (id: number) => {
    try {
      const contactToUpdate = contacts.find(c => c.id === id);
      if (!contactToUpdate) return;
      
      const response = await fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ favorite: !contactToUpdate.favorite })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update favorite status: ${response.statusText}`);
      }
      
      // Update local state
      setContacts(prev => 
        prev.map(contact => contact.id === id ? { ...contact, favorite: !contact.favorite } : contact)
      );
      
      toast({
        title: "Success",
        description: `${contactToUpdate.name} ${!contactToUpdate.favorite ? "added to" : "removed from"} favorites`,
      });
      
    } catch (err) {
      console.error("Error toggling favorite:", err);
      toast({
        title: "Error",
        description: "Failed to update favorite status.",
        variant: "destructive",
      });
    }
  };

  return { contacts, isLoading, error, totalCount, toggleFavorite };
}
