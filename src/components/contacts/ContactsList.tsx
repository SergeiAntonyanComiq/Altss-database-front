
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ArrowUpDown } from "lucide-react";

// Simulated data with full names
const MOCK_CONTACTS = [
  {
    id: "1",
    name: "John Smitty",
    handle: "@johnsmitty",
    company: "Acme Corp",
    position: "CEO",
    favorite: true,
  },
  {
    id: "2",
    name: "Jane Doe",
    handle: "@janedoe",
    company: "Widget Inc",
    position: "CTO",
    favorite: false,
  },
  {
    id: "3",
    name: "Bob Johnson",
    handle: "@bobjohnson",
    company: "Tech Solutions",
    position: "Developer",
    favorite: true,
  },
  {
    id: "4",
    name: "Alice Smith",
    handle: "@alicesmith",
    company: "Data Corp",
    position: "Data Scientist",
    favorite: false,
  },
  {
    id: "5",
    name: "Charlie Brown",
    handle: "@charliebrown",
    company: "Design Studio",
    position: "Designer",
    favorite: true,
  },
];

const ContactsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredContacts = MOCK_CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameClick = (contactId: string) => {
    navigate(`/profile?id=${contactId}`);
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Contacts</h2>
        <div className="flex gap-2">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <span>Sort by</span> <ChevronDown className="h-4 w-4" />
          </Button>
          <Button>Add Contact</Button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>LinkedIn</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => handleNameClick(contact.id)}
                  >
                    {contact.name}
                  </div>
                </TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.position}</TableCell>
                <TableCell>{contact.handle}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Call
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactsList;
