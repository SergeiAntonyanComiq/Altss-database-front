
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

      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold font-montserrat">{contact.name}</h1>
          <button className="bg-white flex items-center gap-2.5 text-base text-[rgba(0,126,96,1)] font-medium text-center justify-center px-6 py-[5px] rounded-[50px] max-md:px-5 border border-gray-200">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/ca51bf083c87bb6765db009254de1b519ea4a3ec"
              alt="Star"
              className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
            />
            <span className="self-stretch my-auto">Add to Favorites</span>
          </button>
        </div>
        <div className="flex gap-2.5">
          <button className="bg-white flex items-center gap-2.5 text-base font-medium text-center justify-center px-6 py-[5px] rounded-[50px] max-md:px-5 border border-gray-200">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/ddb46b8f5e3677e41421100e12cb4f99fefdcce6" 
              alt="Order Enrich" 
              className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
            />
            <span className="self-stretch my-auto">Order Enrich</span>
          </button>
          <Button variant="outline" className="px-4 py-1 h-auto rounded-full">
            Claim a mistake
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
