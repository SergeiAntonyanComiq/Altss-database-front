
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactType } from "@/types/contact";

interface ProfileHeaderProps {
  contact: ContactType;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ contact }) => {
  return (
    <div className="border-b">
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm">
          <Link to="/persons" className="flex items-center hover:text-blue-600">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Persons</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-blue-600 font-medium">{contact.name}</span>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className="text-xs text-gray-600 mb-1 font-montserrat">Last update: 4 weeks ago</div>
        <h1 className="text-2xl font-semibold font-montserrat">{contact.name}</h1>
      </div>
      
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border rounded-full h-8 px-4 text-green-700 hover:bg-green-50"
        >
          <Star className="h-4 w-4" />
          <span>Add to Favorites</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="rounded-full h-8 px-4 flex items-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12V8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 4V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12V16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 20V16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 8V4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Order Enrich
        </Button>
        
        <Button 
          variant="outline" 
          className="rounded-full h-8 px-4"
        >
          Claim a mistake
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
