
import React from "react";
import { Linkedin, Twitter, Mail, Phone, Globe } from "lucide-react";
import { CompanyType } from "@/types/company";

interface CompanyDetailsSectionProps {
  company: CompanyType;
}

const CompanyDetailsSection: React.FC<CompanyDetailsSectionProps> = ({ company }) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-medium mb-4">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Industry</span>
            <div className="flex gap-2">
              <span 
                className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {company.industry || company.firm_type || 'N/A'}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Headquarters</span>
            <span>{company.headquarters || company.location || `${company.city || 'N/A'}, ${company.state_county || 'N/A'}`}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Founded</span>
            <span>{company.founded_year || company.year_est || 'N/A'}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Employees</span>
            <span>{company.employees || company.total_staff || 'N/A'}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Revenue</span>
            <span>{company.revenue || 'N/A'}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">CEO</span>
            <span>{company.ceo || 'N/A'}</span>
          </div>
          
          <div className="flex flex-col md:col-span-2">
            <span className="text-gray-500 text-sm mb-1">SEC Registration</span>
            <span>{company.registration_id || 'N/A'}</span>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-medium mb-4">Contacts</h2>
        <div className="space-y-4">
          {company.website && (
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-blue-600 hover:underline">
                <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer">
                  {company.website}
                </a>
              </span>
            </div>
          )}
          
          {company.social?.linkedin && (
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <Linkedin className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-blue-600 hover:underline">
                <a href={`https://${company.social.linkedin}`} target="_blank" rel="noopener noreferrer">
                  {company.social.linkedin}
                </a>
              </span>
            </div>
          )}
          
          {company.social?.twitter && (
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <Twitter className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-blue-600 hover:underline">
                <a href={`https://${company.social.twitter}`} target="_blank" rel="noopener noreferrer">
                  {company.social.twitter}
                </a>
              </span>
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

          {company.phone || company.tel && (
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <span>{company.phone || company.tel}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CompanyDetailsSection;
