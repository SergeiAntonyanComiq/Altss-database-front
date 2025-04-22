import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestorType } from "@/types/investor";
import InvestorOverviewTab from "./tabs/InvestorOverviewTab";
import InvestorAllocationTab from "./tabs/InvestorAllocationTab";
import InvestorTeamTab from "./tabs/InvestorTeamTab";
import InvestorNewsSection from "./InvestorNewsSection";
import { Lock } from "lucide-react";
import InvestorPEFocusTab from "./tabs/InvestorPEFocusTab";

interface InvestorProfileTabsProps {
  investor: InvestorType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const InvestorProfileTabs: React.FC<InvestorProfileTabsProps> = ({ investor, activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="px-4 flex gap-6 border-b">
        <TabsList className="bg-transparent p-0 h-auto">
          <TabsTrigger value="overview" className="py-3 px-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
            Overview
          </TabsTrigger>
          <TabsTrigger value="allocation" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
            Allocation
          </TabsTrigger>
          <TabsTrigger value="team" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
            Team
          </TabsTrigger>
          <TabsTrigger value="pefocus" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
            PE Focus
          </TabsTrigger>
          <TabsTrigger value="news" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
            News
          </TabsTrigger>
          <TabsTrigger value="mandate" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
            <div className="flex items-center">
              <Lock className="h-3.5 w-3.5 mr-1.5" />
              Mandate
            </div>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="p-4">
        <TabsContent value="overview" className="mt-0">
          <InvestorOverviewTab investor={investor} />
        </TabsContent>

        <TabsContent value="allocation" className="mt-0">
          <InvestorAllocationTab investor={investor} />
        </TabsContent>

        <TabsContent value="team" className="mt-0">
          <InvestorTeamTab investor={investor} />
        </TabsContent>

        <TabsContent value="pefocus" className="mt-0">
          <InvestorPEFocusTab investor={investor} />
        </TabsContent>

        <TabsContent value="news" className="mt-0">
          <InvestorNewsSection investor={investor} />
        </TabsContent>

        <TabsContent value="mandate" className="mt-0">
          <p className="text-sm text-gray-500">Mandate data coming soon...</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default InvestorProfileTabs; 