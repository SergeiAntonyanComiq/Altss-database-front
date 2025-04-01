
import React from "react";
import { Heart } from "lucide-react";
import { PersonType } from "@/types/person";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PersonTableRowProps {
  person: PersonType;
  columnSizes: {
    checkbox: number;
    fullName: number;
    shortBio: number;
    position: number;
    responsibilities: number;
    contacts: number;
    location: number;
  };
  isSelected: boolean;
  onCheckboxChange: () => void;
  toggleFavorite: (id: string) => void;
  onProfileClick: (id: string) => void;
}

// Helper function to get avatar initials
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const PersonTableRow: React.FC<PersonTableRowProps> = ({
  person,
  columnSizes,
  isSelected,
  onCheckboxChange,
  toggleFavorite,
  onProfileClick
}) => {
  return (
    <div className="flex min-h-[50px] w-full border-b border-[#DFE4EA]">
      {/* Checkbox cell */}
      <div style={{width: `${columnSizes.checkbox}%`}} className="flex items-center justify-center min-w-[40px]">
        <div className="flex min-h-11 w-full items-center gap-2.5 justify-center">
          <Checkbox
            id={`person-${person.id}`}
            checked={isSelected}
            onCheckedChange={onCheckboxChange}
            aria-label={`Select ${person.name}`}
            className="h-5 w-5 rounded-md"
          />
        </div>
      </div>
      
      {/* Full Name cell - Now clickable to navigate to profile */}
      <div 
        style={{width: `${columnSizes.fullName}%`}} 
        className="overflow-hidden text-base text-[rgba(31,42,55,1)] font-medium leading-tight cursor-pointer hover:bg-gray-50"
        onClick={() => onProfileClick(person.id)}
      >
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage 
              src="/lovable-uploads/fed0ab22-4812-4812-9ed8-1094621576ed.png" 
              alt={person.name} 
            />
            <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
              {getInitials(person.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1 ml-2">
            <span className="text-sm font-medium text-gray-800 truncate hover:text-blue-600">
              {person.name}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation when clicking the heart
                toggleFavorite(person.id);
              }}
              className="focus:outline-none ml-2"
            >
              <Heart 
                className={`h-4 w-4 cursor-pointer ${person.favorite ? 'text-purple-500 fill-purple-500' : 'text-gray-300'}`} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bio / About cell */}
      <div style={{width: `${columnSizes.shortBio}%`}} className="overflow-hidden">
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <p className="text-sm text-gray-600 truncate">
            {person.shortBio || "-"}
          </p>
        </div>
      </div>
      
      {/* Position cell */}
      <div style={{width: `${columnSizes.position}%`}} className="overflow-hidden text-base text-[rgba(1,69,199,1)] font-medium leading-tight">
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          {person.currentPosition ? (
            <div className="bg-[rgba(219,229,254,1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center overflow-hidden">
              <span className="truncate block w-full text-sm">{person.currentPosition}</span>
            </div>
          ) : (
            <span className="text-gray-500">-</span>
          )}
        </div>
      </div>
      
      {/* Responsibilities cell */}
      <div style={{width: `${columnSizes.responsibilities}%`}} className="overflow-hidden">
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <div className="flex flex-wrap gap-1">
            {person.responsibilities?.map((resp, index) => (
              <Badge key={index} variant="outline" className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100">
                {resp}
              </Badge>
            )) || "-"}
          </div>
        </div>
      </div>
      
      {/* Contacts cell */}
      <div style={{width: `${columnSizes.contacts}%`}} className="overflow-hidden">
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          <div className="flex items-center gap-2">
            <a 
              href={`mailto:${person.email || `${person.name.toLowerCase().replace(' ', '.')}@example.com`}`} 
              className="text-gray-600 hover:text-blue-600"
              onClick={(e) => e.stopPropagation()} // Prevent parent click when clicking email
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a 
              href={person.linkedin || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-blue-600"
              onClick={(e) => e.stopPropagation()} // Prevent parent click when clicking LinkedIn
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Location cell */}
      <div style={{width: `${columnSizes.location}%`}} className="overflow-hidden text-base text-[rgba(0,126,96,1)] font-medium leading-tight">
        <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
          {person.location ? (
            <div className="bg-[rgba(0,126,96,0.1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center overflow-hidden">
              <span className="truncate block w-full text-sm">{person.location}</span>
            </div>
          ) : (
            <span className="flex items-center text-gray-500">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonTableRow;
