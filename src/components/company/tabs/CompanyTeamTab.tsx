
import React from "react";
import { CompanyType } from "@/types/company";
import { User } from "lucide-react";

interface CompanyTeamTabProps {
  company: CompanyType;
}

const CompanyTeamTab: React.FC<CompanyTeamTabProps> = ({ company }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Contact</h3>
        <p className="text-sm text-gray-500">No primary contact information available.</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
        <p className="text-sm text-gray-500">No team members information available.</p>
        
        {/* Placeholder for future team data */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-white">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTeamTab;
