import React from "react";
import { ContactType } from "@/types/contact";

interface ProfileAboutSectionProps {
  contact: ContactType;
}

const ProfileAboutSection: React.FC<ProfileAboutSectionProps> = ({ contact }) => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-2">About</h2>
      <hr className="mb-4 border-t border-[#DFE4EA]" />
      <div className="grid grid-cols-[180px_auto] gap-x-8 gap-y-4 text-base">
        <span className="text-gray-600 font-medium">Area of responsibility</span>
        <div className="flex gap-2">
          {contact.asset_class.split(',').map((asset, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-0.5 rounded-full text-sm"
            >
              {asset.trim()}
            </span>
          ))}
        </div>
        
        <span className="text-gray-600 font-medium">Resident Location</span>
        <span>{`${contact.city}${contact.state ? `, ${contact.state}` : ''}, ${contact.country_territory}`}</span>
        
        {contact.investor && contact.investor !== "No data" && (
          <>
            <span className="text-gray-600 font-medium">Current Company</span>
            <span>{contact.investor}</span>
          </>
        )}
        
        {contact.job_title && contact.job_title !== "No data" && (
          <>
            <span className="text-gray-600 font-medium">Position title</span>
            <span>{contact.job_title}</span>
          </>
        )}
        
        {contact.sec_registration && (
          <>
            <span className="text-gray-600 font-medium">SEC Registration</span>
            <span>{contact.sec_registration}</span>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileAboutSection;
