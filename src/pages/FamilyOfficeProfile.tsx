import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import {
  FamilyOffice,
  fetchFamilyOfficesById,
} from "@/services/familyOfficesService";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { EmptyDetailsPage, News } from "@/components/common";
import {
  Details,
  InvestmentFocus,
  Mandate,
  Team,
} from "@/components/familyoffices";

const FamilyOfficeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [familyOffice, setFamilyOffice] = useState<FamilyOffice | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "No family office ID provided",
        variant: "destructive",
      });
      navigate(from || "/familyoffices");

      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFamilyOfficesById(id);
        if (data) {
          setFamilyOffice(data);
        } else {
          toast({
            title: "Family Office not found",
            description: `No data for family office with ID: ${id}`,
            variant: "destructive",
          });
          navigate(from || "/familyoffices");

          return;
        }
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Failed to load family office details. Please try again later.",
          variant: "destructive",
        });
        navigate("/familyoffices");
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await fetchData();
    })();
  }, [id, navigate, toast]);

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-500">Loading...</div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (!familyOffice) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-lg text-red-500">Family Office not found</div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const contactLike = {
    id: 0,
    firm_id: familyOffice.company_id ? Number(familyOffice.company_id) : 0,
    contact_id: 0,
    investor: "",
    firm_type: Array.isArray(familyOffice.firm_type)
      ? familyOffice.firm_type.join(", ")
      : familyOffice.firm_type || "",
    title: Array.isArray(familyOffice.firm_type)
      ? familyOffice.firm_type.join(", ")
      : familyOffice.firm_type || "",
    name: familyOffice.firm_name,
    alternative_name: "",
    role: "",
    job_title: "",
    asset_class: "",
    email: familyOffice.general_email || "",
    tel: familyOffice.office_phone || "",
    city: familyOffice.city || "",
    state: familyOffice.region || "",
    country_territory: familyOffice.country || "",
    zip_code: "",
    linkedin: familyOffice.linkedin || "",
    favorite: false,
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow min-h-[900px] p-6">
              <ProfileHeader contact={contactLike} />
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4 flex gap-6 border-b border-[#DFE4EA]">
                  <TabsList className="bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="overview"
                      className="py-3 px-0 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="investment"
                      className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      Investment focus
                    </TabsTrigger>
                    <TabsTrigger
                      value="team"
                      className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      Team
                    </TabsTrigger>
                    <TabsTrigger
                      value="deals"
                      className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      Deals
                    </TabsTrigger>
                    <TabsTrigger
                      value="gp&lp"
                      className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      GP & LP
                    </TabsTrigger>
                    <TabsTrigger
                      value="news"
                      className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      News
                    </TabsTrigger>
                    <TabsTrigger
                      value="mandate"
                      className="py-3 px-6 space-x-2 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                      >
                        <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z"></path>
                      </svg>
                      <div>Mandate</div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="serviceproviders"
                      className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                    >
                      Service Providers
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="p-4">
                  <TabsContent value="overview" className="mt-0">
                    <Details {...familyOffice} />
                  </TabsContent>
                  <TabsContent value="investment" className="mt-0">
                    <InvestmentFocus {...familyOffice} />
                  </TabsContent>
                  <TabsContent value="team" className="mt-0">
                    <Team {...familyOffice} />
                  </TabsContent>
                  <TabsContent value="deals" className="mt-0">
                    <EmptyDetailsPage pageName="Deals" />
                  </TabsContent>
                  <TabsContent value="gp&lp" className="mt-0">
                    <EmptyDetailsPage pageName="GP & LP" />
                  </TabsContent>
                  <TabsContent value="serviceproviders" className="mt-0">
                    <EmptyDetailsPage pageName="Service Providers" />
                  </TabsContent>
                  <TabsContent value="news" className="mt-0">
                    <News firmName={familyOffice.firm_name} />
                  </TabsContent>
                  <TabsContent value="mandate" className="mt-0">
                    <Mandate {...familyOffice} />
                  </TabsContent>
                  {/*TODO*/}
                  {/*<TabsContent value="transactions" className="mt-0">*/}
                  {/*  <div className="mb-6">*/}
                  {/*    <h2 className="font-semibold text-lg mb-2">*/}
                  {/*      Transactions*/}
                  {/*    </h2>*/}
                  {/*    {transactionsContent}*/}
                  {/*  </div>*/}
                  {/*</TabsContent>*/}
                </div>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FamilyOfficeProfile;
