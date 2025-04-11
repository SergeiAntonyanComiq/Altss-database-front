import React, { useState, useEffect } from "react";
import { ContactType } from "@/types/contact";
import { useContactsData } from "@/hooks/useContactsData";
import ContactsTable from "./ContactsTable";
import PersonsSearchBar from "../personal/PersonsSearchBar";
import PersonsPagination from "../personal/PersonsPagination";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  // For now, we'll generate IDs for pagination demo
  const totalContacts = 119418; // Total contacts in database
  return Array.from({ length: totalContacts }, (_, i) => i + 1);
};

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [contactsPerPage, setContactsPerPage] = useState(10);

  const {
    contacts,
    isLoading,
    error,
    totalContacts,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
  } = useContactsData({
    initialPage: 1,
    initialItemsPerPage: contactsPerPage
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
    // For now, we'll just update the local state
    const updatedContacts = contacts.map(contact => 
        contact.id === id 
          ? { ...contact, favorite: !contact.favorite } 
          : contact
    );
    // Note: In a real app, you would update this through the useContactsData hook
    console.log(`Toggle favorite for contact with ID: ${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleContactsPerPageChange = (value: number) => {
    setContactsPerPage(value);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (error) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error loading contacts</h2>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-4 items-center">
          <PersonsSearchBar
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            placeholder="Search persons..."
          />
            <Select
            value={String(contactsPerPage)}
            onValueChange={(value) => handleContactsPerPageChange(Number(value))}
            >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select items per page" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>
      
      <ContactsTable
        contacts={contacts}
        isLoading={isLoading}
        selectedContacts={selectedContacts}
        onCheckboxChange={handleCheckboxChange}
        onSelectAll={handleSelectAll}
        onToggleFavorite={toggleFavorite}
      />
      
      <div className="mt-4">
        <PersonsPagination 
          currentPage={currentPage} 
          totalItems={totalContacts}
          itemsPerPage={contactsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ContactsList;
