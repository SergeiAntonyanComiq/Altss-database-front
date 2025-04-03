
import React from "react";
import { ContactType } from "@/types/contact";

interface ProfileBioSectionProps {
  contact: ContactType;
  newsItems: {
    id: string;
    logo: string;
    color: string;
    textColor: string;
    content: string;
  }[];
}

const ProfileBioSection: React.FC<ProfileBioSectionProps> = ({ contact, newsItems }) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-medium mb-4">Short Bio</h2>
        <p className="text-gray-700">
          {contact.job_title || "No biography information available."}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">News</h2>
        <div className="space-y-4">
          {newsItems.map(item => (
            <div key={item.id} className="flex gap-4">
              <div 
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: item.color, color: item.textColor }}
              >
                {item.logo}
              </div>
              <div className="flex-1">
                <p className="text-gray-700">{item.content}</p>
                <a href="#" className="text-blue-600 hover:underline mt-1 inline-block">Read more.</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileBioSection;
