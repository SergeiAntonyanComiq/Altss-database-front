
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
    <div>
      {/* Navigation and last update on light gray background */}
      <div className="bg-[#F6F6F7] p-4">
        <div className="flex items-center text-gray-500 text-sm">
          <Link to="/persons" className="flex items-center hover:text-blue-600">
            <span>Persons</span>
          </Link>
          <ChevronLeft className="h-4 w-4 mx-1 rotate-180" />
          <span className="text-blue-600 font-medium">{contact.name}</span>
        </div>
        
        <div className="text-xs text-gray-600 mt-1 font-montserrat">Last update: 4 weeks ago</div>
      </div>

      {/* Main header content on white background */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">{contact.name}</h1>
            <button className="bg-white flex items-center gap-2 text-[#03887E] border-none font-medium text-center justify-center px-4 py-1 rounded-[50px]">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/ca51bf083c87bb6765db009254de1b519ea4a3ec" 
                className="w-[18px] h-[18px] object-contain" 
                alt="Favorites icon" 
              />
              <span>Add to Favorites</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2.5">
            <button className="bg-white border flex items-center gap-2 justify-center px-4 py-1.5 rounded-[50px] border-[rgba(223,228,234,1)] text-[rgba(99,115,129,1)] font-medium">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/0bd597c769172697ba7e1f8d0385eb32afeed632" 
                className="w-[18px] h-[18px] object-contain" 
                alt="Enrich icon" 
              />
              <span className="ml-1">Order Enrich</span>
            </button>
            
            <button className="bg-white border gap-2.5 px-6 py-[5px] rounded-[50px] border-[rgba(223,228,234,1)] text-[rgba(99,115,129,1)] font-medium">
              Claim a mistake
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
