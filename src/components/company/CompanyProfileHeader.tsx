
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyProfileHeaderProps {
  company: {
    name: string;
    last_updated?: string;
  };
}

const CompanyProfileHeader: React.FC<CompanyProfileHeaderProps> = ({ company }) => {
  return (
    <>
      {/* Navigation and last update on light gray background */}
      <div className="bg-[#F6F6F7] p-4 mb-4 rounded-t-lg">
        <div className="flex items-center text-gray-500 text-sm">
          <Link to="/companies" className="flex items-center hover:text-blue-600">
            <span>Companies</span>
          </Link>
          <ChevronLeft className="h-4 w-4 mx-1 rotate-180" />
          <span className="text-gray-700 font-medium">{company.name}</span>
        </div>
        
        {company.last_updated && (
          <div className="text-xs text-gray-600 mt-1 font-montserrat">
            Last update: {company.last_updated}
          </div>
        )}
      </div>

      {/* Main header content */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold font-montserrat">{company.name}</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="text-gray-600">
              Claim a mistake
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-gray-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12V8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 4V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12V16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 20V16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 8V4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Order Enrich
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Button 
            variant="outline" 
            className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3] flex items-center"
          >
            <Star className="w-4 h-4 mr-2" />
            Add to Favorites
          </Button>
          
          <Button variant="outline" className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3]">
            Order Enrich
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanyProfileHeader;
