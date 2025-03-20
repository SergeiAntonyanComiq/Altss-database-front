
import React from "react";
import { ContactType } from "@/types/contact";

interface ProfileAboutSectionProps {
  contact: ContactType;
}

const ProfileAboutSection: React.FC<ProfileAboutSectionProps> = ({ contact }) => {
  return (
    <section>
      <h2 className="text-xl font-medium mb-4">About</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm mb-1">Area of responsibility</span>
          <div className="flex gap-2">
            {contact.asset_class.split(',').map((asset, index) => (
              <span 
                key={index}
                className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {asset}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm mb-1">Resident Location</span>
          <span>{`${contact.city}${contact.state ? `, ${contact.state}` : ''}, ${contact.country_territory}`}</span>
        </div>
        
        <div className="flex flex-col md:col-span-2">
          <span className="text-gray-500 text-sm mb-1">Current Company</span>
          <span>{contact.investor || "No data"}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileAboutSection;
