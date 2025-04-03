
import React from "react";
import { CompanyType } from "@/types/company";

interface CompanyInvestmentFocusTabProps {
  company: CompanyType;
}

const CompanyInvestmentFocusTab: React.FC<CompanyInvestmentFocusTabProps> = ({ company }) => {
  return (
    <div className="space-y-6">
      {company.pe_main_firm_strategy && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Company type</h3>
          <p className="mt-1 text-sm">{company.pe_main_firm_strategy}</p>
        </div>
      )}
      
      {company.pe_geographic_exposure && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Geo Focus</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.pe_geographic_exposure.split(',').map((geo, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {geo.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {company.pe_industry_verticals && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Technology & Vertical</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.pe_industry_verticals.split(',').map((vertical, index) => (
              <span 
                key={index}
                className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
              >
                {vertical.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {company.pe_industries && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Industries</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.pe_industries.split(',').map((industry, index) => (
              <span 
                key={index}
                className="inline-block bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
              >
                {industry.trim().replace(/\\u0026/g, '&')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInvestmentFocusTab;
