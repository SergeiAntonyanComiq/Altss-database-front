
import { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";

export function useContacts(page: number = 1, perPage: number = 10) {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(119418); // Total contacts from 1 to 119418
  const { toast } = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        
        // Calculate the range of contact IDs to fetch based on pagination
        const startId = (page - 1) * perPage + 1;
        const endId = Math.min(startId + perPage - 1, totalCount);
        
        console.log(`Fetching contacts from ID ${startId} to ${endId}`);
        
        // Create an array of promises to fetch multiple contacts in parallel
        const promises = [];
        for (let id = startId; id <= endId; id++) {
          promises.push(
            fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }
            }).then(response => {
              if (!response.ok) {
                console.error(`Failed to fetch contact ${id}: ${response.status}`);
                return null;
              }
              return response.json();
            }).catch(err => {
              console.error(`Error fetching contact ${id}:`, err);
              return null;
            })
          );
        }
        
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        
        // Filter out any null results (failed requests)
        const validContacts = results.filter(contact => contact !== null) as ContactType[];
        
        if (validContacts.length === 0) {
          throw new Error("No valid contacts retrieved");
        }
        
        console.log(`Successfully fetched ${validContacts.length} contacts`);
        setContacts(validContacts);
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
