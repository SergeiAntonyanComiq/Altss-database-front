
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactType } from "@/types/contact";

interface ProfileHeaderProps {
  contact: ContactType;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ contact }) => {
  return (
    <div className="p-4 border-b">
      <div className="mb-6 flex items-center text-gray-500 text-sm">
        <Link to="/persons" className="flex items-center hover:text-blue-600">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Persons</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="text-blue-600 font-medium">{contact.name}</span>
      </div>

      <div className="text-xs text-gray-600 mb-1">Last update: 4 weeks ago</div>

      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">{contact.name}</h1>
          <button className="flex items-center gap-2 text-green-700 bg-white px-4 py-1 rounded-full border">
            <Star className="h-4 w-4" />
            <span>Add to Favorites</span>
          </button>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline" className="flex items-center gap-2 px-4 py-1 h-auto rounded-full">
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
          <Button variant="outline" className="px-4 py-1 h-auto rounded-full">
            Claim a mistake
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
