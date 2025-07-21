import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import {
  FamilyOfficeContact,
  fetchFamilyOfficesContactsById,
} from "@/services/familyOfficeContactsService";
import ProfileHeader from "@/components/profile/ProfileHeader";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import {
  BioAndNews,
  Details,
  JobHistory,
} from "@/components/familyofficescontacts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

const FamilyOfficesContactsProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<FamilyOfficeContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [trialError, setTrialError] = useState(false);
  const [trialErrorMessage, setTrialErrorMessage] = useState(null);

  const profileHeaderContacts = useMemo(
    () => ({
      id: contact?.contact_id,
      firm_id: Number(contact?.company_id) || 0,
      contact_id: 0,
      investor: "",
      firm_type: "",
      title: contact?.title ?? "",
      name: contact?.full_name ?? "",
      alternative_name: "",
      role: "",
      job_title: contact?.title ?? "",
      asset_class: "",
      email: contact?.email ?? "",
      tel: contact?.phone ?? "",
      city: "",
      state: "",
      country_territory: "",
      zip_code: "",
      linkedin: contact?.linkedin ?? "",
      favorite: contact?.isFavorite,
      itemType: "family_office_contacts",
    }),
    [contact]
  );

  useEffect(() => {
    const fetchContact = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFamilyOfficesContactsById(id);

        setContact(data);
      } catch (error) {
        if (error?.response?.status === 455) {
          setTrialError(true);
          setTrialErrorMessage(error?.response?.data?.message);
        } else {
          setContact(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      (async () => {
        await fetchContact();
      })();
    }
  }, [id]);

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 bg-gray-100 flex items-center justify-center">
            <p>Loading contact profile...</p>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (!contact && !trialError) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 bg-gray-100 flex items-center justify-center">
            <p>Contact not found.</p>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (trialError) {
    return (
      <Dialog open={true}>
        <DialogContent
          className="text-center [&>button:last-of-type]:hidden"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Access Restricted</DialogTitle>
            <DialogDescription className="mt-2">
              {trialErrorMessage}
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={() => (window.location.href = "/")}
            className="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Back to Home
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex-1 bg-gray-100 overflow-auto p-8">
          <section className="bg-white shadow w-full rounded-lg px-6 pt-4 pb-4">
            <ProfileHeader contact={profileHeaderContacts} />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4 flex gap-6 border-b border-[#DFE4EA]">
                <TabsList className="bg-transparent p-0 h-auto">
                  <TabsTrigger
                    value="details"
                    className="py-3 px-0 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="bio&news"
                    className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                  >
                    Bio & News
                  </TabsTrigger>
                  <TabsTrigger
                    value="jobhistory"
                    className="py-3 px-0 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                  >
                    Job History
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="p-4">
                <TabsContent value="details" className="mt-0">
                  <Details {...contact} />
                </TabsContent>

                <TabsContent value="bio&news" className="mt-0">
                  <BioAndNews {...contact} />
                </TabsContent>

                <TabsContent value="jobhistory" className="mt-0">
                  <JobHistory experiences={contact.experience_data} />
                </TabsContent>
              </div>
            </Tabs>
          </section>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FamilyOfficesContactsProfile;
