
import React from "react";
import { ContactType } from "@/types/contact";

interface ProfileJobSectionProps {
  contact: ContactType;
}

const ProfileJobSection: React.FC<ProfileJobSectionProps> = ({ contact }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-medium mb-4">Job History</h2>
      <div className="text-gray-700">
        <p className="mb-2"><span className="font-medium">Job Title:</span> {contact.job_title || "Not specified"}</p>
        <p className="mb-2"><span className="font-medium">Role:</span> {contact.role || "Not specified"}</p>
        <p className="mb-2"><span className="font-medium">Company:</span> {contact.investor || "Not specified"}</p>
        <p className="mb-2"><span className="font-medium">Industry:</span> {contact.firm_type || "Not specified"}</p>
      </div>
    </div>
  );
};

export default ProfileJobSection;
