import React from "react";
import { CompanyType } from "@/types/company";
import { Globe, Mail, Phone, Linkedin, Twitter } from "lucide-react";

interface CompanyOverviewTabProps {
  company: CompanyType;
}

const CompanyOverviewTab: React.FC<CompanyOverviewTabProps> = ({ company }) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-2">About</h2>
        <hr className="mb-4 border-t border-[#DFE4EA]" />
        <div className="grid grid-cols-[180px_auto] gap-x-8 gap-y-4 text-base">
          <span className="text-gray-600 font-medium">Company type</span>
          <div className="flex gap-2">
            {company.firm_type && (
              <span className="bg-blue-100 text-blue-800 px-3 py-0.5 rounded-full text-sm">
                {company.firm_type}
              </span>
            )}
          </div>
          
          <span className="text-gray-600 font-medium">Company HQ</span>
          <span>
            {[company.address, company.city, company.state_county].filter(Boolean).join(", ")}
          </span>
          
          <span className="text-gray-600 font-medium">Founded Year</span>
          <span>{company.year_est || '2015 y.'}</span>
          
          <span className="text-gray-600 font-medium">AUM ($, mln)</span>
          <span>{company.total_assets_under_management_usd_mn || '102.5'}</span>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-2">Contacts</h2>
        <hr className="mb-4 border-t border-[#DFE4EA]" />
        <div className="grid grid-cols-[180px_auto] gap-x-8 gap-y-4 text-base">
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <Globe className="w-4 h-4" />
            Website
          </span>
          <a 
            href={company.website?.startsWith('http') ? company.website : `https://${company.website || 'acmelorem.com'}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company.website || 'acmelorem.com'}
          </a>
          
          {company.social?.linkedin && (
            <>
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </span>
              <a 
                href={`https://${company.social.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.social.linkedin}
              </a>
            </>
          )}
          
          {company.social?.twitter && (
            <>
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <Twitter className="w-4 h-4" />
                X (Twitter)
              </span>
              <a 
                href={`https://x.com/${company.social.twitter}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {`x.com/${company.social.twitter}`}
              </a>
            </>
          )}
          
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <Mail className="w-4 h-4" />
            Work Emails
          </span>
          <span>{company.email || 'info@acmelorem.com'}</span>
          
          {company.tel && (
            <>
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <Phone className="w-4 h-4" />
                Phone number
              </span>
              <span>{company.tel || '+810 000 000 000'}</span>
            </>
          )}
        </div>
      </section>
      
      {company.description && (
        <section>
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <hr className="mb-4 border-t border-[#DFE4EA]" />
          <p className="text-gray-700">{company.description}</p>
        </section>
      )}
    </div>
  );
};

export default CompanyOverviewTab;
