import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactType } from "@/types/contact";
import ProfileAboutSection from "./ProfileAboutSection";
import ProfileContactsSection from "./ProfileContactsSection";
import ProfileBioSection from "./ProfileBioSection";
import ProfileJobSection from "./ProfileJobSection";

interface ProfileTabsBaseProps {
  activeTab: string;
}

interface ProfileTabsUserProps extends ProfileTabsBaseProps {
  onTabChange: (tab: string) => void;
  contact?: never;
  setActiveTab?: never;
  newsItems?: never;
}

interface ProfileTabsContactProps extends ProfileTabsBaseProps {
  contact: ContactType;
  setActiveTab: (tab: string) => void;
  newsItems: {
    id: string;
    logo: string;
    color: string;
    textColor: string;
    content: string;
  }[];
  onTabChange?: never;
}

type ProfileTabsProps = ProfileTabsUserProps | ProfileTabsContactProps;

const ProfileTabs: React.FC<ProfileTabsProps> = (props) => {
  const isContactProfile = 'contact' in props && props.contact !== undefined;
  
  // Choose the appropriate change handler based on the props
  const handleTabChange = isContactProfile ? props.setActiveTab : props.onTabChange;
  
  return (
    <Tabs 
      value={props.activeTab} 
      onValueChange={handleTabChange}
    >
      {isContactProfile ? (
        // Person profile tabs
        <>
          <div className="px-4 flex gap-6 border-b">
            <TabsList className="bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="details" 
                className="py-3 px-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="bio" 
                className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
              >
                Bio & News
              </TabsTrigger>
              <TabsTrigger 
                value="job" 
                className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
              >
                Job history
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4">
            <TabsContent value="details" className="mt-0">
              <div className="space-y-10">
                <ProfileAboutSection contact={props.contact} />
                <ProfileContactsSection contact={props.contact} />
              </div>
            </TabsContent>

            <TabsContent value="bio" className="mt-0">
              <ProfileBioSection contact={props.contact} newsItems={props.newsItems} />
            </TabsContent>

            <TabsContent value="job" className="mt-0">
              <ProfileJobSection contact={props.contact} />
            </TabsContent>
          </div>
        </>
      ) : (
        // User profile tabs
        <div className="px-4 flex gap-6 border-b">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="general" 
              className="py-3 px-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="billing" 
              className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger 
              value="support" 
              className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
            >
              Support
            </TabsTrigger>
          </TabsList>
        </div>
      )}
    </Tabs>
  );
};

export default ProfileTabs;
