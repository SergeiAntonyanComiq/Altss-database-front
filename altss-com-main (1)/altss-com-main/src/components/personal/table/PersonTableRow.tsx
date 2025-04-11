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
  return (
    <div className="flex w-full border-b border-[rgba(223,228,234,1)]">
      <div className="w-11 min-w-[44px] border-r border-[rgba(223,228,234,1)] flex items-center justify-center py-3">
        <TableCheckbox
          id={`person-${person.id}`}
          checked={isSelected}
          onCheckedChange={onCheckboxChange}
          aria-label={`Select ${person.name}`}
        />
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center gap-2.5 cursor-pointer"
        style={{ width: columns[0].width, minWidth: columns[0].minWidth }}
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
            className="focus:outline-none ml-auto text-gray-400 hover:text-purple-500"
          >
            <Heart 
              className={`h-4 w-4 ${person.favorite ? 'text-purple-500 fill-purple-500' : ''}`} 
            />
          </button>
        </div>
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
        style={{ width: columns[1].width, minWidth: columns[1].minWidth }}
      >
        <p className="text-sm text-gray-600 line-clamp-2">
          {person.shortBio || "-"}
        </p>
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
        style={{ width: columns[2].width, minWidth: columns[2].minWidth }}
      >
        {person.currentPosition ? (
           <div className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1 rounded-[30px] flex items-center overflow-hidden text-[rgba(1,69,199,1)] text-sm">
            <span className="truncate block w-full">{person.currentPosition}</span>
          </div>
        ) : (
          <span className="text-gray-500 text-sm">-</span>
        )}
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
        style={{ width: columns[3].width, minWidth: columns[3].minWidth }}
      >
        <div className="flex flex-wrap gap-1">
          {person.responsibilities?.map((resp, index) => (
            <Badge key={index} variant="outline" className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100">
              {resp}
            </Badge>
          )) || <span className="text-gray-500 text-sm">-</span>}
        </div>
      </div>
      
      <div 
        className="border-r border-[rgba(223,228,234,1)] px-4 py-3 flex items-center"
        style={{ width: columns[4].width, minWidth: columns[4].minWidth }}
      >
        <div className="flex items-center gap-2">
          <a href={`mailto:${person.email || `${person.name.toLowerCase().replace(' ', '.')}@example.com`}`} className="text-gray-600 hover:text-blue-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </a>
          <a href={ensureProtocol(person.linkedin)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
           {person.phone && (
             <a href={`tel:${person.phone}`} className="text-gray-600 hover:text-blue-600">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             </a>
           )}
        </div>
      </div>
      
      <div 
        className="px-4 py-3 flex items-center"
        style={{ width: columns[5].width, minWidth: columns[5].minWidth }}
      >
         {person.location ? (
           <div className="bg-[rgba(0,126,96,0.1)] gap-2 px-3 py-1 rounded-[30px] flex items-center overflow-hidden text-[rgba(0,126,96,1)] text-sm">
             <span className="truncate block w-full">{person.location}</span>
           </div>
         ) : (
           <span className="text-gray-500 text-sm">-</span>
         )}
      </div>
    </div>
  );
};

export default PersonTableRow;
