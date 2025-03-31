
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
      <div className="border-b">
        <div className="p-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Link to="/companies" className="flex items-center hover:text-blue-600">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Companies</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{company.name}</span>
          </div>
        </div>

        <div className="px-4 pb-4">
          {company.last_updated && (
            <div className="text-sm text-gray-500 mb-2 font-montserrat">
              Last update: {company.last_updated}
            </div>
          )}
          
          <h1 className="text-2xl font-semibold font-montserrat mb-4">{company.name}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant="outline" 
              className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3] flex items-center rounded-full h-8 px-4"
            >
              <Star className="w-4 h-4 mr-2" />
              Add to Favorites
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3] rounded-full h-8 px-4"
            >
              Order Enrich
            </Button>
            
            <Button 
              variant="outline" 
              className="rounded-full h-8 px-4"
            >
              Claim a mistake
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfileHeader;
