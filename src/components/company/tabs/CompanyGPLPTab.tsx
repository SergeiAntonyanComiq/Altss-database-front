
import React from "react";
import { CompanyType } from "@/types/company";

interface CompanyGPLPTabProps {
  company: CompanyType;
}

const CompanyGPLPTab: React.FC<CompanyGPLPTabProps> = ({ company }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Partner Information</h3>
        <p className="text-sm text-gray-500">No partner information available.</p>
      </div>
      
      {company.pe_sources_of_capital && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Sources of Capital</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.pe_sources_of_capital.split(',').map((source, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {source.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyGPLPTab;
