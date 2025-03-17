
import React, { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { useQuery } from "@tanstack/react-query";
import ContactsTable from "./ContactsTable";
import PersonsSearchBar from "../personal/PersonsSearchBar";
import PersonsPagination from "../personal/PersonsPagination";
import { toast } from "@/components/ui/use-toast";

const fetchContacts = async (): Promise<ContactType[]> => {
  try {
    const response = await fetch("https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/");
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    const data = await response.json();
    // Add favorite property to each contact
    return data.map((contact: ContactType) => ({
      ...contact,
      favorite: false
    }));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [currentPage] = useState(1);

  const { data: contacts = [], isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load contacts. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error]);

  const handleCheckboxChange = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId) 
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(contact => contact.id));
    }
  };

  const toggleFavorite = (id: number) => {
    // In a real application, this would be an API call to change the favorite status
    console.log(`Toggle favorite for contact with ID: ${id}`);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${contacts.length} items`}
          </span>
        </div>
      </div>
      
      <PersonsSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : contacts.length > 0 ? (
          <ContactsTable 
            contacts={contacts}
            selectedContacts={selectedContacts}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <div className="text-center p-12 text-muted-foreground">
            No contacts found
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <PersonsPagination currentPage={currentPage} />
      </div>
    </div>
  );
};

export default ContactsList;
