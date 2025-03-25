
import React from "react";
import { CompanyType } from "@/types/company";

interface CompanyOtherTabProps {
  company: CompanyType;
}

const CompanyOtherTab: React.FC<CompanyOtherTabProps> = ({ company }) => {
  // Function to format date fields
  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Object with field label mapping
  const fieldLabels: Record<string, string> = {
    firm_id: "Firm ID",
    firm_name: "Firm Name",
    background: "Background",
    country: "Country",
    region: "Region",
    fax: "Fax",
    local_language_firm_name: "Local Language Firm Name",
    secondary_locations: "Secondary Locations",
    management_team_staff: "Management Team Staff",
    investment_team_staff: "Investment Team Staff",
    firm_s_main_currency: "Firm's Main Currency",
    currency_of_funds_managed: "Currency of Funds Managed",
    "women-led_firm": "Women-led Firm",
    "minority-led_firm": "Minority-led Firm",
    firm_ownership: "Firm Ownership",
    listed: "Listed",
    ticker_symbol: "Ticker Symbol",
    stock_exchange: "Stock Exchange",
    pe_date_inserted: "Date Inserted",
    pe_estimated_dry_powder_usd_mn: "Estimated Dry Powder (USD, mln)"
  };
  
  // Fields to display in this tab
  const fieldsToDisplay = [
    'firm_id',
    'firm_name',
    'background',
    'country',
    'region',
    'fax',
    'local_language_firm_name',
    'secondary_locations',
    'management_team_staff',
    'investment_team_staff',
    'firm_s_main_currency',
    'currency_of_funds_managed',
    'women-led_firm',
    'minority-led_firm',
    'firm_ownership',
    'listed',
    'ticker_symbol',
    'stock_exchange',
    'pe_date_inserted',
    'pe_estimated_dry_powder_usd_mn'
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fieldsToDisplay.map((field) => {
          // Using any to access dynamic property
          const value = (company as any)[field];
          
          if (!value) return null;
          
          let displayValue = value;
          
          // Format date fields
          if (field === 'pe_date_inserted') {
            displayValue = formatDate(value) || value;
          }
          
          // Format money values
          if (field === 'pe_estimated_dry_powder_usd_mn' && value) {
            displayValue = `$${value}M`;
          }
          
          // Format the background field - replace special characters
          if (field === 'background') {
            displayValue = value.replace(/\\u0027/g, "'").replace(/\\u0026/g, '&');
          }
          
          return (
            <div key={field}>
              <h3 className="text-sm font-medium text-gray-500">{fieldLabels[field] || field}</h3>
              {field === 'background' ? (
                <p className="mt-1 text-sm whitespace-pre-wrap">{displayValue}</p>
              ) : (
                <p className="mt-1 text-sm">{displayValue}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyOtherTab;
