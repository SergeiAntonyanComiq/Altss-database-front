
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileAboutSection from "./ProfileAboutSection";
import ProfileContactsSection from "./ProfileContactsSection";
import ProfileBioSection from "./ProfileBioSection";
import ProfileJobSection from "./ProfileJobSection";
import { ContactType } from "@/types/contact";

interface ProfileTabsProps {
  contact: ContactType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  newsItems: {
    id: string;
    logo: string;
    color: string;
    textColor: string;
    content: string;
  }[];
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ 
  contact, 
  activeTab, 
  setActiveTab, 
  newsItems 
}) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
    >
      <div className="border-b">
        <TabsList className="bg-transparent p-0 h-auto px-4">
          <TabsTrigger 
            value="details" 
            className="py-3 px-0 mr-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="bio" 
            className="py-3 px-0 mr-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Bio & News
          </TabsTrigger>
          <TabsTrigger 
            value="job" 
            className="py-3 px-0 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
          >
            Job history
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="p-4">
        <TabsContent value="details" className="mt-0">
          <div className="space-y-10">
            <ProfileAboutSection contact={contact} />
            <ProfileContactsSection contact={contact} />
          </div>
        </TabsContent>

        <TabsContent value="bio" className="mt-0">
          <ProfileBioSection contact={contact} newsItems={newsItems} />
        </TabsContent>

        <TabsContent value="job" className="mt-0">
          <ProfileJobSection contact={contact} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
