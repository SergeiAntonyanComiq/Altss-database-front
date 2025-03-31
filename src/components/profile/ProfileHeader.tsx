
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactType } from "@/types/contact";

interface ProfileHeaderProps {
  contact: ContactType;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ contact }) => {
  const navigate = useNavigate();
  
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

      <div className="text-xs text-gray-600 mb-1 font-montserrat">Last update: 4 weeks ago</div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">{contact.name}</h1>
          <button className="bg-white flex items-center gap-2.5 text-base text-[rgba(0,126,96,1)] font-medium text-center justify-center px-6 py-[5px] rounded-[50px] max-md:px-5">
            <img
              src="/lovable-uploads/1d3b9836-90b0-4d10-a9c1-52e0a5eb102a.png"
              alt="Altss Logo"
              className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
            />
            <span className="self-stretch my-auto">Add to Favorites</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button className="bg-white border flex items-center gap-2.5 justify-center px-6 py-[5px] rounded-[50px] border-[rgba(223,228,234,1)] border-solid max-md:px-5 text-[rgba(99,115,129,1)] font-medium">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/0bd597c769172697ba7e1f8d0385eb32afeed632" 
              alt="Enrich" 
              className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
            />
            <span className="self-stretch my-auto">Order Enrich</span>
          </button>
          
          <button className="bg-white border gap-2.5 px-6 py-[5px] rounded-[50px] border-[rgba(223,228,234,1)] border-solid max-md:px-5 text-[rgba(99,115,129,1)] font-medium">
            Claim a mistake
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
