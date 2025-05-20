import React, { useState, useEffect } from "react";
import { useContactsData } from "@/hooks/useContactsData";
import ContactsTable from "./ContactsTable";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomPagination from "../ui/CustomPagination.tsx";

const ContactsList = () => {
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
    setItemsPerPage,
  } = useContactsData({
    initialPage: 1,
    initialItemsPerPage: contactsPerPage,
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
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id));
    }
  };

  const toggleFavorite = () => {};

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleContactsPerPageChange = (value: number) => {
    setContactsPerPage(value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error loading contacts
          </h2>
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
          <Select
            value={String(contactsPerPage)}
            onValueChange={(value) =>
              handleContactsPerPageChange(Number(value))
            }
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
        <CustomPagination
          currentPage={currentPage}
          totalItems={totalContacts}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleContactsPerPageChange}
          totalPages={0}
        />
      </div>
    </div>
  );
};

export default ContactsList;
