
import React, { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { useQuery } from "@tanstack/react-query";
import ContactsTable from "./ContactsTable";
import PersonsSearchBar from "../personal/PersonsSearchBar";
import PersonsPagination from "../personal/PersonsPagination";
import { toast } from "@/components/ui/use-toast";

// Mock data to use when API fails or for initial load
const mockContacts: ContactType[] = [
  {
    id: 2,
    firm_id: 4,
    contact_id: 59246,
    investor: "3i",
    firm_type: "Fund Manager",
    title: "Mr.",
    name: "Rémi Carnimolla",
    alternative_name: "",
    role: "Investment Team",
    job_title: "Senior Partner, Managing Director, Global Head of Services & Software Sector and Member of the Investment Committee",
    asset_class: "PE,INF,NR",
    email: "remi.carnimolla@3i.com",
    tel: "+33 (0)1 7315 1100",
    city: "Paris",
    state: "",
    country_territory: "France",
    zip_code: "75008",
    linkedin: "www.linkedin.com/in/rémi-carnimolla-4227873/",
    favorite: false
  },
  {
    id: 3,
    firm_id: 4,
    contact_id: 59247,
    investor: "Accel",
    firm_type: "Fund Manager",
    title: "Ms.",
    name: "Jane Smith",
    alternative_name: "",
    role: "Investment Team",
    job_title: "Partner",
    asset_class: "VC",
    email: "jane.smith@example.com",
    tel: "+1 123 456 7890",
    city: "London",
    state: "",
    country_territory: "UK",
    zip_code: "EC1V",
    linkedin: "www.linkedin.com/in/janesmith/",
    favorite: false
  },
  {
    id: 4,
    firm_id: 5,
    contact_id: 59248,
    investor: "Blackstone",
    firm_type: "Fund Manager",
    title: "Mr.",
    name: "John Doe",
    alternative_name: "",
    role: "Executive",
    job_title: "Managing Director",
    asset_class: "PE,RE",
    email: "john.doe@example.com",
    tel: "+1 987 654 3210",
    city: "New York",
    state: "NY",
    country_territory: "USA",
    zip_code: "10001",
    linkedin: "www.linkedin.com/in/johndoe/",
    favorite: false
  }
];

const fetchContact = async (contactId: number): Promise<ContactType> => {
  try {
    const response = await fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/${contactId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch contact with ID ${contactId}`);
    }
    const data = await response.json();
    return {
      ...data,
      favorite: false // Add favorite property
    };
  } catch (error) {
    console.error(`Error fetching contact ${contactId}:`, error);
    throw error;
  }
};

const fetchContactIds = async (): Promise<number[]> => {
  // In a real app, you would fetch a list of available contact IDs
  // For now, we'll return mock IDs
  return [2, 3, 4, 5, 6, 7, 8];
};

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactIds, setContactIds] = useState<number[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const contactsPerPage = 3;

  // Get list of contact IDs
  useEffect(() => {
    const getContactIds = async () => {
      try {
        const ids = await fetchContactIds();
        setContactIds(ids);
      } catch (err) {
        console.error("Failed to fetch contact IDs:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        // Use mock data if fetching IDs fails
        setContactIds(mockContacts.map(contact => contact.id));
      }
    };
    
    getContactIds();
  }, []);

  // Fetch contacts for current page
  useEffect(() => {
    const fetchCurrentPageContacts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (contactIds.length === 0) {
          // If no contact IDs, use mock data
          setContacts(mockContacts);
          setIsLoading(false);
          return;
        }
        
        // Calculate which contacts to fetch based on current page
        const startIndex = (currentPage - 1) * contactsPerPage;
        const currentPageIds = contactIds.slice(startIndex, startIndex + contactsPerPage);
        
        // Fetch each contact
        const contactPromises = currentPageIds.map(id => fetchContact(id));
        const fetchedContacts = await Promise.all(
          contactPromises.map(promise => 
            promise.catch(err => {
              console.error("Error fetching a contact:", err);
              return null; // Return null for failed contacts
            })
          )
        );
        
        // Filter out null values (failed fetches) and add to state
        const validContacts = fetchedContacts.filter(contact => contact !== null) as ContactType[];
        
        if (validContacts.length === 0) {
          // If all fetches failed, use mock data
          setContacts(mockContacts);
          toast({
            title: "Warning",
            description: "Using demo data as we couldn't load contacts from the server.",
            variant: "default", // Changed from "warning" to "default"
          });
        } else {
          setContacts(validContacts);
        }
      } catch (err) {
        console.error("Error in contact fetching process:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setContacts(mockContacts); // Fallback to mock data
        
        toast({
          title: "Error",
          description: "Failed to load contacts. Using demo data instead.",
          variant: "destructive", // This is already correct
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCurrentPageContacts();
  }, [contactIds, currentPage]);

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
    setContacts(prev => 
      prev.map(contact => 
        contact.id === id 
          ? { ...contact, favorite: !contact.favorite } 
          : contact
      )
    );
    console.log(`Toggle favorite for contact with ID: ${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
        <PersonsPagination 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
          totalPages={Math.ceil(contactIds.length / contactsPerPage)}
        />
      </div>
    </div>
  );
};

export default ContactsList;
