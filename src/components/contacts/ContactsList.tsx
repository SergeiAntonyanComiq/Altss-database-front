
import React, { useState } from "react";
import ContactsTable from "./ContactsTable";
import PersonsSearchBar from "../personal/PersonsSearchBar";
import PersonsPagination from "../personal/PersonsPagination";
import { useContacts } from "@/hooks/useContacts";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  
  // Use our updated hook to fetch contacts
  const { contacts, isLoading, error, totalCount, toggleFavorite } = useContacts(currentPage, contactsPerPage);
  const { toast } = useToast();

  // Show toast if there's an error
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleContactsPerPageChange = (value: number) => {
    setContactsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Persons</h1>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <Select
              value={contactsPerPage.toString()}
              onValueChange={(value) => handleContactsPerPageChange(parseInt(value, 10))}
            >
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${contacts.length} of ${totalCount} items`}
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
            No persons found
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <PersonsPagination 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
          totalPages={Math.ceil(totalCount / contactsPerPage)}
          itemsPerPage={contactsPerPage}
          onItemsPerPageChange={handleContactsPerPageChange}
        />
      </div>
    </div>
  );
};

export default ContactsList;
