
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { usePersons } from '@/contexts/PersonContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, Heart, Search, Filter } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PersonalCabinet5 = () => {
  const { persons, toggleFavorite, filterPersons } = usePersons();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const displayedPersons = filterPersons(searchTerm);

  const handleSaveSearch = () => {
    toast({
      title: "Search saved",
      description: `Search for "${searchTerm}" has been saved.`
    });
  };

  const handleAddToFavorites = () => {
    toast({
      title: "Added to favorites",
      description: "Current search results added to favorites."
    });
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <SidebarProvider>
        <AppSidebar />
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="rounded-lg border bg-card shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Persons</h1>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search the company"
                    className="pl-10 pr-4 py-2 border rounded-md w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2" onClick={handleSaveSearch}>
                  <Search className="h-4 w-4" />
                  <span>Save this Search</span>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2" onClick={handleAddToFavorites}>
                  <Heart className="h-4 w-4" />
                  <span>Add to Favorites</span>
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Full Name</TableHead>
                    <TableHead>Area of responsibility</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>Resident Location</TableHead>
                    <TableHead>Current Companies</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedPersons.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="flex justify-between items-center">
                        <span>{person.fullName}</span>
                        <Heart 
                          className={`h-4 w-4 cursor-pointer ${person.favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                          onClick={() => toggleFavorite(person.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {person.area}
                        </span>
                      </TableCell>
                      <TableCell>{person.linkedin}</TableCell>
                      <TableCell>{person.location}</TableCell>
                      <TableCell>
                        {person.companies.map((company, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs mr-1">
                            {company}
                          </span>
                        ))}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  &lt;&lt;
                </Button>
                <Button variant="outline" size="sm" disabled>
                  &lt;
                </Button>
                <div className="px-3 py-1 bg-primary text-primary-foreground rounded-md">1</div>
                <span>...</span>
                <div className="px-3 py-1 rounded-md border">12</div>
                <Button variant="outline" size="sm">
                  &gt;
                </Button>
                <Button variant="outline" size="sm">
                  &gt;&gt;
                </Button>
              </div>
              
              <div className="flex items-center">
                <div className="relative inline-block">
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>50 results per page</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default PersonalCabinet5;
