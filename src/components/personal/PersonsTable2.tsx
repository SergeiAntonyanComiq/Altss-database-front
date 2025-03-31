
import React, { useState } from "react";
import { Heart, GripVertical } from "lucide-react";
import { PersonType } from "@/types/person";
import { Checkbox } from "@/components/ui/checkbox";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PersonsTable2Props {
  persons: PersonType[];
  selectedPersons: string[];
  handleCheckboxChange: (personId: string) => void;
  handleSelectAll: () => void;
  toggleFavorite: (id: string) => void;
  isPersonSelected: (id: string | undefined) => boolean;
  isLoading: boolean;
}

// Helper function to get company logo based on company name
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

// Helper function to format LinkedIn URL
const formatLinkedInUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

// Helper function to format social media URLs
const formatSocialUrl = (platform: string, username: string) => {
  return `https://${platform}.com/${username.toLowerCase().replace(' ', '')}`;
};

const PersonsTable2 = ({ 
  persons, 
  selectedPersons, 
  handleCheckboxChange, 
  handleSelectAll, 
  toggleFavorite,
  isPersonSelected,
  isLoading
}: PersonsTable2Props) => {
  if (persons.length === 0 && !isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <p className="text-gray-500">No persons found for the current page</p>
      </div>
    );
  }

  const allSelected = selectedPersons.length === persons.length && persons.length > 0;
  
  // Store column size state at the top level so it applies to both header and rows
  const [columnSizes, setColumnSizes] = useState({
    checkbox: 5,
    fullName: 25,
    shortBio: 15,
    position: 15,
    jobHistory: 10,
    news: 10,
    responsibilities: 10,
    contacts: 10,
    location: 8,
    companies: 10,
    lastUpdate: 7,
    actions: 5
  });

  // Update column sizes when resizing
  const handleResize = (columnId: string) => (size: number) => {
    setColumnSizes(prev => ({
      ...prev,
      [columnId]: size
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
      <div className="table-container w-full">
        {/* Table Header */}
        <ResizablePanelGroup direction="horizontal" className="bg-gray-100 flex h-14 w-full">
          <ResizablePanel 
            defaultSize={columnSizes.checkbox} 
            minSize={3} 
            onResize={handleResize('checkbox')}
            className="flex items-center justify-center min-w-[40px]"
          >
            <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
              <Checkbox
                id="selectAll"
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all persons"
                className="h-5 w-5 rounded-md"
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.fullName} 
            minSize={15} 
            onResize={handleResize('fullName')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Full Name</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.shortBio} 
            minSize={10} 
            onResize={handleResize('shortBio')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Bio / About</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.position} 
            minSize={8} 
            onResize={handleResize('position')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Position</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.jobHistory} 
            minSize={8} 
            onResize={handleResize('jobHistory')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Job History</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.news} 
            minSize={8} 
            onResize={handleResize('news')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">News</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.responsibilities} 
            minSize={8} 
            onResize={handleResize('responsibilities')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Area of responsibility</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.contacts} 
            minSize={8} 
            onResize={handleResize('contacts')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Contacts</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.location} 
            minSize={8} 
            onResize={handleResize('location')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Resident Location</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.companies} 
            minSize={8} 
            onResize={handleResize('companies')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Current Companies</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.lastUpdate} 
            minSize={7} 
            onResize={handleResize('lastUpdate')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 px-4">Last Update</div>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="transition-colors hover:bg-gray-300">
            <GripVertical className="h-4 w-4" />
          </ResizableHandle>
          
          <ResizablePanel 
            defaultSize={columnSizes.actions} 
            minSize={3} 
            onResize={handleResize('actions')}
            className="overflow-hidden text-sm text-gray-600 font-medium leading-none min-w-[40px]"
          >
            <div className="flex items-center min-h-11 w-full gap-2.5 justify-center">+</div>
          </ResizablePanel>
        </ResizablePanelGroup>
        
        {/* Table Rows - use the same column sizes as header */}
        <div className="divide-y divide-[#DFE4EA] w-full">
          {persons.map((person) => (
            <div key={person.id} className="flex min-h-[50px] w-full border-b border-[#DFE4EA]">
              {/* Checkbox cell */}
              <div style={{width: `${columnSizes.checkbox}%`}} className="flex items-center justify-center min-w-[40px]">
                <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
                  <Checkbox
                    id={`person-${person.id}`}
                    checked={isPersonSelected(person.id)}
                    onCheckedChange={() => handleCheckboxChange(person.id)}
                    aria-label={`Select ${person.name}`}
                    className="h-5 w-5 rounded-md"
                  />
                </div>
              </div>
              
              {/* Full Name cell */}
              <div style={{width: `${columnSizes.fullName}%`}} className="overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src="/lovable-uploads/fed0ab22-4812-4812-9ed8-1094621576ed.png" 
                        alt={person.name} 
                      />
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                        {person.name.charAt(0)}
                        {person.name.split(' ')[1]?.charAt(0) || ''}
                      </AvatarFallback>
                    </Avatar>
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
                </div>
              </div>
              
              {/* Bio / About cell */}
              <div style={{width: `${columnSizes.shortBio}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <p className="text-sm text-gray-600 max-w-[200px] line-clamp-2">
                    {person.shortBio || "-"}
                  </p>
                </div>
              </div>
              
              {/* Position cell */}
              <div style={{width: `${columnSizes.position}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <span className="text-sm">
                    {person.currentPosition || "-"}
                  </span>
                </div>
              </div>
              
              {/* Job History cell */}
              <div style={{width: `${columnSizes.jobHistory}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <span className="text-sm">
                    {person.jobHistory || "-"}
                  </span>
                </div>
              </div>
              
              {/* News cell */}
              <div style={{width: `${columnSizes.news}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <span className="text-sm">
                    {person.news || "-"}
                  </span>
                </div>
              </div>
              
              {/* Area of responsibility cell */}
              <div style={{width: `${columnSizes.responsibilities}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {person.responsibilities.map((resp, index) => (
                      <Badge key={index} variant="outline" className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100">
                        {resp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Contacts cell */}
              <div style={{width: `${columnSizes.contacts}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <div className="grid grid-cols-2 gap-2">
                    <a href={`mailto:${person.name.toLowerCase().replace(' ', '.')}@example.com`} className="text-gray-600 hover:text-blue-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </a>
                    <a href={formatLinkedInUrl(person.linkedin)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a href={formatSocialUrl('facebook', person.name)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a href={formatSocialUrl('twitter', person.name)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Location cell */}
              <div style={{width: `${columnSizes.location}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <span className="text-sm">{person.location}</span>
                </div>
              </div>
              
              {/* Current Companies cell */}
              <div style={{width: `${columnSizes.companies}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
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
                </div>
              </div>
              
              {/* Last Update cell */}
              <div style={{width: `${columnSizes.lastUpdate}%`}} className="overflow-hidden">
                <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
                  <span className="text-sm text-muted-foreground">
                    {person.lastUpdate || "-"}
                  </span>
                </div>
              </div>
              
              {/* Actions cell */}
              <div style={{width: `${columnSizes.actions}%`}} className="overflow-hidden min-w-[40px]">
                <div className="flex min-h-11 w-full items-center gap-2.5 justify-center"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonsTable2;
