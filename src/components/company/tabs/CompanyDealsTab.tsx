
import React from "react";
import { CompanyType } from "@/types/company";

interface CompanyDealsTabProps {
  company: CompanyType;
}

const CompanyDealsTab: React.FC<CompanyDealsTabProps> = ({ company }) => {
  const hasDealSize = company.pe_initial_minimum_equity_investment_size_mn && 
    company.pe_initial_maximum_equity_investment_size_mn;
    
  return (
    <div className="space-y-6">
      {hasDealSize && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Deal Size</h3>
          <p className="mt-1 text-sm">
            ${company.pe_initial_minimum_equity_investment_size_mn}M - 
            ${company.pe_initial_maximum_equity_investment_size_mn}M
          </p>
        </div>
      )}
      
      {company.pe_strategies && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Deal Type</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.pe_strategies.split(',').map((strategy, index) => (
              <span 
                key={index}
                className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {strategy.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Deals</h3>
        <p className="text-sm text-gray-500">No recent deals information available.</p>
      </div>
    </div>
  );
};

export default CompanyDealsTab;
