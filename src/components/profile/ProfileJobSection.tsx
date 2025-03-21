
import React from "react";
import { ContactType } from "@/types/contact";

interface ProfileJobSectionProps {
  contact: ContactType;
}

const ProfileJobSection: React.FC<ProfileJobSectionProps> = ({ contact }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-medium mb-4">Job History</h2>
      <p className="text-gray-700">
        {contact.job_title || "No job history data available."}
      </p>
    </div>
  );
};

export default ProfileJobSection;
