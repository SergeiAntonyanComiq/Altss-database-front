
import React from "react";
import { CompanyType } from "@/types/company";

interface CompanyMandateTabProps {
  company: CompanyType;
}

const CompanyMandateTab: React.FC<CompanyMandateTabProps> = ({ company }) => {
  const hasTicketSize = company.pe_portfolio_company_minimum_value_mn && 
    company.pe_portfolio_company_maximum_value_mn;
    
  // Format timestamp to readable date if available
  const formatDate = (timestamp: number) => {
    if (!timestamp) return null;
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const publicationDate = company.pe_date_updated ? formatDate(company.pe_date_updated) : null;
  
  return (
    <div className="space-y-6">
      {publicationDate && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Publication date</h3>
          <p className="mt-1 text-sm">{publicationDate}</p>
        </div>
      )}
      
      <div>
        <h3 className="text-sm font-medium text-gray-500">Investment period</h3>
        <p className="mt-1 text-sm text-gray-500">No investment period information available.</p>
      </div>
      
      {company.total_assets_under_management_curr_mn && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total amount</h3>
          <p className="mt-1 text-sm">{company.total_assets_under_management_curr_mn}</p>
        </div>
      )}
      
      {hasTicketSize && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">Ticket size</h3>
          <p className="mt-1 text-sm">
            ${company.pe_portfolio_company_minimum_value_mn}M - 
            ${company.pe_portfolio_company_maximum_value_mn}M
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyMandateTab;
