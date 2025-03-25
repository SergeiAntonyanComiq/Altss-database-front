
import React from "react";
import { CompanyType } from "@/types/company";

interface CompanyServiceProvidersTabProps {
  company: CompanyType;
}

const CompanyServiceProvidersTab: React.FC<CompanyServiceProvidersTabProps> = ({ company }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Service Providers</h3>
        <p className="text-sm text-gray-500">No service provider information available.</p>
      </div>
    </div>
  );
};

export default CompanyServiceProvidersTab;
