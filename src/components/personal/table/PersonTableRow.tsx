import React from "react";
import { Heart } from "lucide-react";
import { PersonType } from "@/types/person";
import { TableCheckbox } from "@/components/ui/table-checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Column } from "./PersonTableHeader";

interface PersonTableRowProps {
  person: PersonType;
  isSelected: boolean;
  onCheckboxChange: () => void;
  toggleFavorite: (id: string) => void;
  onProfileClick: (id: string) => void;
  columns: Column[];
}

// Helper function to get avatar initials
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// Helper function to ensure URL has a protocol
const ensureProtocol = (url: string | undefined | null): string => {
  if (!url || url === '#') return '#';
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const PersonTableRow: React.FC<PersonTableRowProps> = ({
  person,
  isSelected,
  onCheckboxChange,
  toggleFavorite,
  onProfileClick,
  columns
}) => {
  // Calculate total minimum width
  const totalMinWidth = columns.reduce((sum, col) => sum + col.minWidth, 0) + 44; // Include checkbox column width
  
  return (
    <div className="flex w-full border-b border-[rgba(223,228,234,1)]" style={{ minWidth: `${totalMinWidth}px` }}>
      <div className="w-11 min-w-[44px] border-r border-[rgba(223,228,234,1)] flex items-center justify-center py-3">
        <TableCheckbox
            id={`person-${person.id}`}
            checked={isSelected}
            onCheckedChange={onCheckboxChange}
            aria-label={`Select ${person.name}`}
          />
      </div>
      
      {columns.find(col => col.id === 'name') && (
      <div 
          className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center gap-2.5 cursor-pointer"
          style={{ width: columns.find(col => col.id === 'name')!.width, minWidth: columns.find(col => col.id === 'name')!.minWidth }}
        onClick={() => onProfileClick(person.id)}
      >
          <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage 
                src="/lovable-uploads/fed0ab22-4812-4812-9ed8-1094621576ed.png" 
                alt={person.name} 
              />
              <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                {getInitials(person.name)}
              </AvatarFallback>
            </Avatar>
          <div className="flex items-center gap-1 ml-1 flex-1 min-w-0">
            <span className="text-sm font-medium text-gray-800 truncate">
              {person.name}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(person.id);
              }}
              className="focus:outline-none ml-auto text-gray-400 hover:text-[#03887E]"
            >
              <Heart 
                className={`h-4 w-4 ${person.favorite ? 'text-[#03887E] fill-[#03887E]' : ''}`} 
              />
            </button>
          </div>
        </div>
      )}
      
      {columns.find(col => col.id === 'company') && (
        <div 
          className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
          style={{ width: columns.find(col => col.id === 'company')!.width, minWidth: columns.find(col => col.id === 'company')!.minWidth }}
        >
          <span className="text-sm text-gray-600">
            {person.companies && person.companies.length > 0 ? person.companies[0] : "-"}
          </span>
      </div>
      )}
      
      {columns.find(col => col.id === 'bio') && (
        <div 
          className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
          style={{ width: columns.find(col => col.id === 'bio')!.width, minWidth: columns.find(col => col.id === 'bio')!.minWidth }}
        >
          <p className="text-sm text-gray-600 line-clamp-2">
            {person.shortBio || "-"}
          </p>
        </div>
      )}
      
      {columns.find(col => col.id === 'position') && (
        <div 
          className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center overflow-hidden"
          style={{ width: columns.find(col => col.id === 'position')!.width, minWidth: columns.find(col => col.id === 'position')!.minWidth }}
        >
          {person.currentPosition ? (
            <div className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1 rounded-[30px] flex items-center text-[rgba(1,69,199,1)] text-sm max-w-full" title={person.currentPosition}>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">{person.currentPosition}</span>
            </div>
          ) : (
            <span className="text-gray-500 text-sm">-</span>
          )}
        </div>
      )}
      
      {columns.find(col => col.id === 'responsibilities') && (
        <div 
          className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
          style={{ width: columns.find(col => col.id === 'responsibilities')!.width, minWidth: columns.find(col => col.id === 'responsibilities')!.minWidth }}
        >
          <div className="flex flex-wrap gap-1">
            {person.responsibilities?.map((resp, index) => (
              <Badge key={index} variant="outline" className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100">
                {resp}
              </Badge>
            )) || <span className="text-gray-500 text-sm">-</span>}
          </div>
        </div>
      )}
      
      {columns.find(col => col.id === 'contacts') && (
        <div 
          className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center gap-2"
          style={{ width: columns.find(col => col.id === 'contacts')!.width, minWidth: columns.find(col => col.id === 'contacts')!.minWidth }}
        >
          {person.email && (
            <a href={`mailto:${person.email}`} target="_blank" rel="noopener noreferrer">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54" 
                alt="Email" 
                className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
              />
            </a>
          )}
          {person.linkedin && (
            <a href={ensureProtocol(person.linkedin)} target="_blank" rel="noopener noreferrer">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/beb16618d740a2aa8ec04b177ad0bb8cbdc7b395" 
                alt="LinkedIn" 
                className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
              />
            </a>
          )}
          {person.phone && (
            <a href={`tel:${person.phone}`} target="_blank" rel="noopener noreferrer">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/5a26cf0f3dd36a935ed5a7cefbff69240744cd7b" 
                alt="Phone" 
                className="w-4 h-4 opacity-[.75] hover:opacity-100 transition-opacity"
              />
            </a>
          )}
        </div>
      )}
      
      {columns.find(col => col.id === 'location') && (
        <div 
          className="px-4 py-3 flex items-center"
          style={{ width: columns.find(col => col.id === 'location')!.width, minWidth: columns.find(col => col.id === 'location')!.minWidth }}
        >
          {person.location ? (
            <div className="flex items-center gap-1 px-2">
              <div className="bg-[rgba(0,126,96,0.1)] rounded-[4px] py-1 px-2">
                <span className="whitespace-nowrap text-[#006C50]">{person.location}</span>
              </div>
            </div>
          ) : (
            <span className="text-gray-500 text-sm">-</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonTableRow;
