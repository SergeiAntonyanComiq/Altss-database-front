import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Plus, Mail, Linkedin, MapPin, Phone } from "lucide-react";
import { ContactType } from "@/types/contact";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ContactsTableProps {
  contacts: ContactType[];
  isLoading: boolean;
  selectedContacts: number[];
  onCheckboxChange: (contactId: number) => void;
  onSelectAll: () => void;
  onToggleFavorite: (id: number) => void;
}

const getAvatarFallback = (name: string) => {
  const nameParts = name.split(' ');
  return nameParts[0]?.charAt(0) + (nameParts[1]?.charAt(0) || '');
};

const getAssetClasses = (assetClass: string) => {
  return assetClass.split(',').map(item => item.trim());
};

const getLocation = (city: string, state: string, country: string) => {
  let parts = [];
  if (city) parts.push(city);
  if (state) parts.push(state);
  if (country) parts.push(country);
  return parts.join(', ');
};

// Helper function to format LinkedIn URL
const formatLinkedInUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const ContactsTable = ({ 
  contacts, 
  isLoading,
  selectedContacts, 
  onCheckboxChange, 
  onSelectAll, 
  onToggleFavorite 
}: ContactsTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-[#DFE4EA]">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedContacts.length === contacts.length && contacts.length > 0}
                  onCheckedChange={onSelectAll}
                  className="h-4 w-4"
                />
              </TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Asset Class</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead className="w-5">
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-2 rounded-full bg-blue-50">
                  <Plus className="h-3 w-3 text-blue-600" />
                  <span className="sr-only">Add column</span>
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="h-[400px]">
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-[#DFE4EA]">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedContacts.length === contacts.length && contacts.length > 0}
                  onCheckedChange={onSelectAll}
                  className="h-4 w-4"
                />
              </TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Asset Class</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead className="w-5">
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-2 rounded-full bg-blue-50">
                  <Plus className="h-3 w-3 text-blue-600" />
                  <span className="sr-only">Add column</span>
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="h-[400px]">
                <div className="flex justify-center items-center h-full text-gray-500">
                  No contacts found
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-[#DFE4EA]">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
                onCheckedChange={onSelectAll}
                className="h-4 w-4"
              />
            </TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Asset Class</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead className="w-5">
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-2 rounded-full bg-blue-50">
                <Plus className="h-3 w-3 text-blue-600" />
                <span className="sr-only">Add column</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow 
              key={contact.id} 
              className={`${selectedContacts.includes(contact.id) ? "bg-blue-50" : ""}`}
              data-state={selectedContacts.includes(contact.id) ? "selected" : undefined}
            >
              <TableCell>
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => onCheckboxChange(contact.id)}
                  className="h-4 w-4"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src="/lovable-uploads/fed0ab22-4812-4812-9ed8-1094621576ed.png" 
                      alt={contact.name} 
                    />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                      {getAvatarFallback(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <Link 
                        to={`/profile/${contact.id}`} 
                        className="font-medium text-gray-800 hover:text-blue-600 hover:underline"
                      >
                        {contact.title} {contact.name}
                      </Link>
                      <button 
                        onClick={() => onToggleFavorite(contact.id)}
                        className="focus:outline-none"
                      >
                        <Heart 
                          className={`h-4 w-4 cursor-pointer ${contact.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                        />
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground">{contact.role}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{contact.investor}</span>
                  <span className="text-xs text-muted-foreground">{contact.firm_type}</span>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm text-gray-600 max-w-[200px] line-clamp-2">
                  {contact.job_title || "-"}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {getAssetClasses(contact.asset_class).map((assetClass, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100">
                      {assetClass}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  {getLocation(contact.city, contact.state, contact.country_territory)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-blue-600">
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {contact.tel && (
                    <a href={`tel:${contact.tel}`} className="text-gray-600 hover:text-blue-600">
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {contact.linkedin && (
                    <a href={formatLinkedInUrl(contact.linkedin)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactsTable;
