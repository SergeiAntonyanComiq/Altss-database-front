import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import { fetchFamilyOffices, FamilyOffice } from "@/services/familyOfficesService";
import { fetchFamilyOfficeContacts, FamilyOfficeContact } from "@/services/familyOfficeContactsService";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";

const FamilyOfficeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [familyOffice, setFamilyOffice] = useState<FamilyOffice | null>(null);
  const [contacts, setContacts] = useState<FamilyOfficeContact[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "No family office ID provided",
        variant: "destructive",
      });
      navigate("/familyoffices");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch family office by company_id
        const res = await fetchFamilyOffices({ company_id: id });
        if (res.data && res.data.length > 0) {
          setFamilyOffice(res.data[0]);
        } else {
          toast({
            title: "Family Office not found",
            description: `No data for family office with ID: ${id}`,
            variant: "destructive",
          });
          navigate("/familyoffices");
          return;
        }
        // Fetch contacts for this family office
        const contactsRes = await fetchFamilyOfficeContacts({ company_id: id });
        setContacts(contactsRes.data || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load family office details. Please try again later.",
          variant: "destructive",
        });
        navigate("/familyoffices");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  // --- Profile Header using shared component for parity ---
  const contactLike = {
    id: 0,
    firm_id: familyOffice.company_id ? Number(familyOffice.company_id) : 0,
    contact_id: 0,
    investor: "",
    firm_type: Array.isArray(familyOffice.firm_type) ? familyOffice.firm_type.join(", ") : familyOffice.firm_type || "",
    title: Array.isArray(familyOffice.firm_type) ? familyOffice.firm_type.join(", ") : familyOffice.firm_type || "",
    name: familyOffice.firm_name,
    alternative_name: "",
    role: "",
    job_title: "",
    asset_class: "",
    email: (familyOffice as any).general_email || "",
    tel: (familyOffice as any).office_phone || "",
    city: familyOffice.city || "",
    state: familyOffice.region || "",
    country_territory: familyOffice.country || "",
    zip_code: "",
    linkedin: (familyOffice as any).linkedin || "",
    favorite: false,
  };

  // --- Tab Content ---
  const overviewFields = [
    { label: "Firm Type", value: Array.isArray(familyOffice.firm_type) ? familyOffice.firm_type.join(", ") : familyOffice.firm_type },
    { label: "City", value: familyOffice.city },
    { label: "Country", value: familyOffice.country },
    { label: "Region", value: familyOffice.region },
    { label: "AUM", value: familyOffice.aum },
    { label: "Year Founded", value: familyOffice.year_founded },
    { label: "Wealth Creator", value: (familyOffice as any).wealth_creator },
    { label: "Industry Wealth Origin", value: (familyOffice as any).industry_wealth_origin },
    { label: "Office Phone", value: (familyOffice as any).office_phone },
    { label: "General Email", value: (familyOffice as any).general_email },
    { label: "Website", value: (familyOffice as any).website },
    { label: "SEC Registered", value: (familyOffice as any).sec_registered },
  ];

  // Parse allocation_preferences and investor_profile as arrays if possible
  let allocationPreferences: string[] = [];
  let investorProfile: string[] = [];
  try {
    const rawAlloc = (familyOffice as any).allocation_preferences;
    if (typeof rawAlloc === "string" && rawAlloc.trim().startsWith("[")) {
      allocationPreferences = JSON.parse(rawAlloc);
    } else if (Array.isArray(rawAlloc)) {
      allocationPreferences = rawAlloc;
    }
    const rawInv = (familyOffice as any).investor_profile;
    if (typeof rawInv === "string" && rawInv.trim().startsWith("[")) {
      investorProfile = JSON.parse(rawInv);
    } else if (Array.isArray(rawInv)) {
      investorProfile = rawInv;
    }
  } catch (e) {
    // fallback: show as string if parsing fails
    allocationPreferences = [];
    investorProfile = [];
  }

  const investmentFields = [
    { label: "Emerging Manager Interest", value: (familyOffice as any).emerging_manager_interest },
    { label: "Emerging Markets", value: (familyOffice as any).emerging_markets },
    { label: "Geographic Focus", value: (familyOffice as any).geographic_focus },
    { label: "Emerging Manager Allocator", value: (familyOffice as any).emerging_manager_allocator },
    { label: "Impact Investor", value: (familyOffice as any).impact_investor },
  ];

  const newsContent = Array.isArray((familyOffice as any).company_news)
    ? (
      <div className="flex flex-col gap-4">
        {(familyOffice as any).company_news.map((news: any, idx: number) => (
          <div key={idx} className="bg-[#F6F8FC] rounded-xl p-4 flex flex-col md:flex-row gap-4 border">
            {news.publisher_logo && (
              <img
                src={news.publisher_logo}
                alt={news.publisher}
                className="w-12 h-12 object-contain rounded"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  {news.title}
                </a>
                {news.type && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                    {news.type}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mb-1">
                {news.date} {news.publisher && <>| {news.publisher}</>}
              </div>
              <div className="text-sm text-gray-900 whitespace-pre-line mb-1">{news.content}</div>
            </div>
          </div>
        ))}
      </div>
    )
    : <div className="text-gray-500">No news available.</div>;

  const transactionsContent = Array.isArray((familyOffice as any).company_transactions)
    ? (
      <div className="flex flex-col gap-4">
        {(familyOffice as any).company_transactions.map((tx: any, idx: number) => (
          <div key={idx} className="bg-[#F6F8FC] rounded-xl p-4 flex flex-col md:flex-row gap-4 border">
            {tx.company_logo ? (
              <img
                src={tx.company_logo}
                alt={tx.company}
                className="w-12 h-12 object-contain rounded"
              />
            ) : (
              <div className="w-12 h-12 rounded bg-[#E5EAF2] flex items-center justify-center text-lg font-bold text-[#637381]">
                {tx.company && tx.company.length > 0
                  ? tx.company
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                  : "?"}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-semibold text-gray-900">{tx.company}</span>
                {tx.round && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                    {tx.round}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mb-1">
                {tx.date} {tx.country && <>| {tx.country}</>}
              </div>
              <div className="text-sm text-gray-900 mb-1">{tx.industry}</div>
              {tx.size && (
                <div className="text-sm text-gray-700 mb-1">Deal Size: <span className="font-medium">{tx.size}</span></div>
              )}
              {tx.press_release && (
                <a
                  href={tx.press_release}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Press Release
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    )
    : <div className="text-gray-500">No transactions available.</div>;

  // --- Contacts Section ---
  const contactsSection = contacts.length ? (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-2">Contacts</h3>
      <div className="divide-y border rounded-lg overflow-hidden">
        {contacts.map(contact => (
          <div key={contact.contact_id} className="flex flex-col md:flex-row items-start md:items-center gap-2 px-4 py-3">
            <div className="flex-1">
              <div className="font-medium">{contact.full_name}</div>
              <div className="text-xs text-gray-500">{contact.title}</div>
              <div className="text-xs text-gray-500">{contact.email}</div>
              <div className="text-xs text-gray-500">{contact.phone}</div>
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                  LinkedIn
                </a>
              )}
              {contact.notes && (
                <div className="text-xs text-gray-400 mt-1">{contact.notes}</div>
              )}
            </div>
            {contact.avatar_filename && (
              <img
                src={contact.avatar_filename}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;

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
                    <TabsTrigger value="overview" className="py-3 px-0 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="investment" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
                      Investment focus
                    </TabsTrigger>
                    <TabsTrigger value="team" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
                      Team
                    </TabsTrigger>
                    <TabsTrigger value="news" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
                      News
                    </TabsTrigger>
                    <TabsTrigger value="transactions" className="py-3 px-6 rounded-none text-gray-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium">
                      Transactions
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="p-4">
                  <TabsContent value="overview" className="mt-0">
                    <div className="mb-6">
                      <h2 className="font-semibold text-lg mb-2">About</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {overviewFields.filter(f => f.value).map(f => (
                          <ProfileField key={f.label} label={f.label} value={f.value} />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="investment" className="mt-0">
                    <div className="mb-6">
                      <h2 className="font-semibold text-lg mb-2">Investment Focus</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {investmentFields.filter(f => f.value).map(f => (
                          <ProfileField key={f.label} label={f.label} value={f.value} />
                        ))}
                      </div>
                      {allocationPreferences.length > 0 && (
                        <div className="mt-6">
                          <div className="text-xs text-gray-400 mb-1">Allocation Preferences</div>
                          <ul className="list-disc pl-5 text-base text-gray-900">
                            {allocationPreferences.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(investorProfile) && investorProfile.length > 0 && (
                        <div className="mt-6">
                          <div className="text-xs text-gray-400 mb-1">Investor Profile</div>
                          <ul className="list-disc pl-5 text-base text-gray-900">
                            {investorProfile.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="team" className="mt-0">
                    <div className="mb-6">
                      <h2 className="font-semibold text-lg mb-2">Team</h2>
                      <div className="flex flex-col gap-6">
                        {/* Primary Contact */}
                        {contacts.length > 0 && (
                          <div className="bg-[#F6F8FC] rounded-xl p-6 mb-4">
                            <div className="font-semibold mb-2">Primary Contact</div>
                            <TeamMemberCard contact={contacts[0]} primary />
                          </div>
                        )}
                        {/* Team Members */}
                        {contacts.length > 1 && (
                          <div>
                            <div className="font-semibold mb-2">Team Members</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {contacts.slice(1).map((contact) => (
                                <TeamMemberCard key={contact.contact_id} contact={contact} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="news" className="mt-0">
                    <div className="mb-6">
                      <h2 className="font-semibold text-lg mb-2">News</h2>
                      {newsContent}
                    </div>
                  </TabsContent>
                  <TabsContent value="transactions" className="mt-0">
                    <div className="mb-6">
                      <h2 className="font-semibold text-lg mb-2">Transactions</h2>
                      {transactionsContent}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const ProfileField: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-base text-gray-900">{value}</div>
    </div>
  );
};

// Card for a team member (matches company profile style)
const TeamMemberCard: React.FC<{ contact: FamilyOfficeContact; primary?: boolean }> = ({ contact, primary }) => {
  // Initials for avatar fallback
  const initials = contact.full_name
    ? contact.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  // Parse tags from other_fields if present
  let tags: string[] = [];
  if (contact.other_fields && typeof contact.other_fields === "object") {
    if (Array.isArray(contact.other_fields.tags)) {
      tags = contact.other_fields.tags;
    }
  }

  return (
    <div className={`bg-white rounded-xl border border-[#DFE4EA] p-4 flex flex-col gap-2 ${primary ? "shadow" : ""}`}>
      <div className="flex items-center gap-3">
        {contact.avatar_filename ? (
          <img
            src={`https://sinerg.blob.core.windows.net/main/img/avatars/${contact.avatar_filename}`}
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover border"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#E5EAF2] flex items-center justify-center text-lg font-bold text-[#637381]">
            {initials}
          </div>
        )}
        <div>
          <div className="font-medium text-base">{contact.full_name}</div>
          <div className="text-xs text-gray-500">{contact.title}</div>
          {primary && (
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded ml-2 align-middle">
              Primary
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-[#F3F6F9] text-[#2665F0] text-xs font-medium px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      {contact.email && (
        <div className="text-xs text-[#2665F0] break-all">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      )}
      {contact.phone && (
        <div className="text-xs text-gray-700">{contact.phone}</div>
      )}
      {contact.linkedin && (
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
      )}
      {contact.notes && (
        <div className="text-xs text-gray-400 mt-1">{contact.notes}</div>
      )}
    </div>
  );
};

export default FamilyOfficeProfile;
