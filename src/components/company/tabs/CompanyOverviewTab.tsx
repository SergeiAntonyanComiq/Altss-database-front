
import React from "react";
import { CompanyType } from "@/types/company";
import { Globe, Mail, Phone } from "lucide-react";

interface CompanyOverviewTabProps {
  company: CompanyType;
}

const CompanyOverviewTab: React.FC<CompanyOverviewTabProps> = ({ company }) => {
  // Format the address
  const formattedAddress = [
    company.address,
    company.city,
    company.state_county,
    company.zip_code
  ].filter(Boolean).join(", ");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {company.firm_type && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Company type</h3>
            <p className="mt-1 text-sm">{company.firm_type}</p>
          </div>
        )}
        
        {formattedAddress && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Company HQ</h3>
            <p className="mt-1 text-sm">{formattedAddress}</p>
          </div>
        )}
        
        {company.year_est && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Founded Year</h3>
            <p className="mt-1 text-sm">{company.year_est}</p>
          </div>
        )}
        
        {company.total_assets_under_management_usd_mn && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">AUM ($, mln)</h3>
            <p className="mt-1 text-sm">${company.total_assets_under_management_usd_mn}</p>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
        
        {company.website && (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <a 
              href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {company.website}
            </a>
          </div>
        )}
        
        {company.email && (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <span>{company.email}</span>
          </div>
        )}
        
        {company.tel && (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <span>{company.tel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyOverviewTab;
