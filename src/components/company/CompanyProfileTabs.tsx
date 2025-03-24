
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyDetailsSection from "./CompanyDetailsSection";
import CompanyNewsSection from "./CompanyNewsSection";
import CompanyHistorySection from "./CompanyHistorySection";
import { CompanyType } from "@/types/company";

interface CompanyProfileTabsProps {
  company: CompanyType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CompanyProfileTabs: React.FC<CompanyProfileTabsProps> = ({ 
  company, 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="border-b border-gray-200"
    >
      <TabsList className="bg-transparent p-0 h-auto">
        <TabsTrigger 
          value="details" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Details
        </TabsTrigger>
        <TabsTrigger 
          value="news" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          News & Updates
        </TabsTrigger>
        <TabsTrigger 
          value="history" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Company History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="pt-6">
        <CompanyDetailsSection company={company} />
      </TabsContent>

      <TabsContent value="news" className="pt-6">
        <CompanyNewsSection company={company} />
      </TabsContent>

      <TabsContent value="history" className="pt-6">
        <CompanyHistorySection company={company} />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyProfileTabs;
