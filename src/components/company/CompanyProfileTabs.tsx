import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyOverviewTab from "./tabs/CompanyOverviewTab";
import CompanyInvestmentFocusTab from "./tabs/CompanyInvestmentFocusTab";
import CompanyTeamTab from "./tabs/CompanyTeamTab";
import CompanyDealsTab from "./tabs/CompanyDealsTab";
import CompanyGPLPTab from "./tabs/CompanyGPLPTab";
import CompanyServiceProvidersTab from "./tabs/CompanyServiceProvidersTab";
import CompanyNewsSection from "./CompanyNewsSection";
import CompanyMandateTab from "./tabs/CompanyMandateTab";
import CompanyOtherTab from "./tabs/CompanyOtherTab";
import { CompanyType } from "@/types/company";
import { Lock } from "lucide-react";

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
    >
      <div className="px-4 flex gap-6 border-b border-[#DFE4EA]">
        <TabsList className="bg-transparent p-0 h-auto">
          <TabsTrigger 
            value="overview" 
            className="py-3 px-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="investment" 
            className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Investment focus
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Team
          </TabsTrigger>
          <TabsTrigger 
            value="deals" 
            className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Deals
          </TabsTrigger>
          <TabsTrigger 
            value="gplp" 
            className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            GP & LP
          </TabsTrigger>
          <TabsTrigger 
            value="news" 
            className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            News
          </TabsTrigger>
          <TabsTrigger 
            value="mandate" 
            className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            <div className="flex items-center">
              <Lock className="h-3.5 w-3.5 mr-1.5" />
              Mandate
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="providers" 
            className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Service Providers
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="p-4">
        <TabsContent value="overview" className="mt-0">
          <CompanyOverviewTab company={company} />
        </TabsContent>
        
        <TabsContent value="investment" className="mt-0">
          <CompanyInvestmentFocusTab company={company} />
        </TabsContent>
        
        <TabsContent value="team" className="mt-0">
          <CompanyTeamTab company={company} />
        </TabsContent>
        
        <TabsContent value="deals" className="mt-0">
          <CompanyDealsTab company={company} />
        </TabsContent>
        
        <TabsContent value="gplp" className="mt-0">
          <CompanyGPLPTab company={company} />
        </TabsContent>
        
        <TabsContent value="providers" className="mt-0">
          <CompanyServiceProvidersTab company={company} />
        </TabsContent>
        
        <TabsContent value="news" className="mt-0">
          <CompanyNewsSection company={company} />
        </TabsContent>
        
        <TabsContent value="mandate" className="mt-0">
          <CompanyMandateTab company={company} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default CompanyProfileTabs;
