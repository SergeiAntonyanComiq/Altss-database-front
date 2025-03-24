
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactType } from "@/types/contact";

interface ProfileHeaderProps {
  contact: ContactType;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ contact }) => {
  return (
    <>
      <div className="mb-6 flex items-center text-gray-500 text-sm">
        <Link to="/persons" className="flex items-center hover:text-blue-600">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Persons</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{contact.name}</span>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{contact.name}</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="text-gray-600">
              Claim a mistake
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-gray-600">
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
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Button variant="outline" className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3]">
            My List
          </Button>
          <Button variant="outline" className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3]">
            Update Subscription
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
