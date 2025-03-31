import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Plus, Mail, Linkedin, Facebook, Twitter } from "lucide-react";
import { PersonType } from "@/types/person";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/ui/UserAvatar";

interface PersonsTable2Props {
  persons: PersonType[];
  selectedPersons: string[];
  handleCheckboxChange: (personId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
}

const getCompanyLogo = (company: string) => {
  const logoMap: Record<string, string> = {
    "Goldman Sachs": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "JP Morgan": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "BlackRock": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Citigroup": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Morgan Stanley": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Wells Fargo": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Bank of America": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Optimum": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "LGT": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    "Book Store": "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
  };
  
  return logoMap[company] || "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png";
};

const formatLinkedInUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const formatSocialUrl = (platform: string, username: string) => {
  return `https://${platform}.com/${username.toLowerCase().replace(' ', '')}`;
};

const PersonsTable2 = ({ 
  persons, 
  selectedPersons, 
  handleCheckboxChange, 
  handleSelectAll, 
  toggleFavorite 
}: PersonsTable2Props) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-gray-200">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedPersons.length === persons.length && persons.length > 0}
                onCheckedChange={handleSelectAll}
                className="h-4 w-4"
              />
            </TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Bio / About</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Job History</TableHead>
            <TableHead>News</TableHead>
            <TableHead>Area of responsibility</TableHead>
            <TableHead>Contacts</TableHead>
            <TableHead>Resident Location</TableHead>
            <TableHead>Current Companies</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead className="w-5">
              <Button variant="ghost" size="icon" className="h-5 w-5 ml-2 rounded-full bg-blue-50">
                <Plus className="h-3 w-3 text-blue-600" />
                <span className="sr-only">Add column</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons.map((person) => (
            <TableRow 
              key={person.id} 
              className={`${selectedPersons.includes(person.id) ? "bg-blue-50" : ""}`}
              data-state={selectedPersons.includes(person.id) ? "selected" : undefined}
            >
              <TableCell>
                <Checkbox
                  checked={selectedPersons.includes(person.id)}
                  onCheckedChange={() => handleCheckboxChange(person.id)}
                  className="h-4 w-4"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <UserAvatar name={person.name} className="h-10 w-10" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-800">
                        {person.name}
                      </span>
                      <button 
                        onClick={() => toggleFavorite(person.id)}
                        className="focus:outline-none"
                      >
                        <Heart 
                          className={`h-4 w-4 cursor-pointer ${person.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
                        />
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground">@{person.name.toLowerCase().replace(' ', '')}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm text-gray-600 max-w-[200px] line-clamp-2">
                  {person.shortBio || "-"}
                </p>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {person.currentPosition || "-"}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {person.jobHistory || "-"}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {person.news || "-"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {person.responsibilities.map((resp, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100">
                      {resp}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="grid grid-cols-2 gap-2">
                  <a href={`mailto:${person.name.toLowerCase().replace(' ', '.')}@example.com`} className="text-gray-600 hover:text-blue-600">
                    <Mail className="h-4 w-4" />
                  </a>
                  <a href={formatLinkedInUrl(person.linkedin)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href={formatSocialUrl('facebook', person.name)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href={formatSocialUrl('twitter', person.name)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </TableCell>
              <TableCell>{person.location}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {person.companies.map((company, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs border-blue-100 flex items-center gap-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={getCompanyLogo(company)} alt={company} />
                        <AvatarFallback className="text-[8px] bg-blue-200 text-blue-700">
                          {company.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {company}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {person.lastUpdate || "-"}
                </span>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PersonsTable2;
