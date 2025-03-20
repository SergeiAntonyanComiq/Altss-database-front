
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
          value="bio" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Bio & News
        </TabsTrigger>
        <TabsTrigger 
          value="job" 
          className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
        >
          Job history
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="pt-6">
        <div className="space-y-8">
          <ProfileAboutSection contact={contact} />
          <ProfileContactsSection contact={contact} />
        </div>
      </TabsContent>

      <TabsContent value="bio" className="pt-6">
        <ProfileBioSection contact={contact} newsItems={newsItems} />
      </TabsContent>

      <TabsContent value="job" className="pt-6">
        <ProfileJobSection contact={contact} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
