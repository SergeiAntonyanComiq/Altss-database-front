
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
          value="overview" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="investment" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Investment Focus
        </TabsTrigger>
        <TabsTrigger 
          value="team" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Team
        </TabsTrigger>
        <TabsTrigger 
          value="deals" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Deals
        </TabsTrigger>
        <TabsTrigger 
          value="gplp" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          GP & LP
        </TabsTrigger>
        <TabsTrigger 
          value="providers" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Service Providers
        </TabsTrigger>
        <TabsTrigger 
          value="news" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          News
        </TabsTrigger>
        <TabsTrigger 
          value="mandate" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Mandate
        </TabsTrigger>
        <TabsTrigger 
          value="other" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Other
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="pt-6">
        <CompanyOverviewTab company={company} />
      </TabsContent>

      <TabsContent value="investment" className="pt-6">
        <CompanyInvestmentFocusTab company={company} />
      </TabsContent>

      <TabsContent value="team" className="pt-6">
        <CompanyTeamTab company={company} />
      </TabsContent>

      <TabsContent value="deals" className="pt-6">
        <CompanyDealsTab company={company} />
      </TabsContent>

      <TabsContent value="gplp" className="pt-6">
        <CompanyGPLPTab company={company} />
      </TabsContent>

      <TabsContent value="providers" className="pt-6">
        <CompanyServiceProvidersTab company={company} />
      </TabsContent>

      <TabsContent value="news" className="pt-6">
        <CompanyNewsSection company={company} />
      </TabsContent>

      <TabsContent value="mandate" className="pt-6">
        <CompanyMandateTab company={company} />
      </TabsContent>

      <TabsContent value="other" className="pt-6">
        <CompanyOtherTab company={company} />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyProfileTabs;
