
import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Linkedin, Mail, Phone, Eye, EyeOff } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockPersons } from "@/data/mockPersons";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactType } from "@/types/contact";
import { supabase } from "@/integrations/supabase/client";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// Sample news items for the Bio tab
const newsItems = [
  {
    id: "1",
    logo: "FT",
    color: "#FBE4CF",
    textColor: "#333333",
    content: "Federal Reserve live: US central bank cuts growth forecast and boosts inflation outlook. Bank's latest projections show officials expect GDP to expand by 1.7 per cent this year.",
  },
  {
    id: "2",
    logo: "Y",
    color: "#FF6600",
    textColor: "#FFFFFF",
    content: "Federal Reserve live: US central bank cuts growth forecast and boosts inflation outlook. Bank's latest projections show officials expect GDP to expand by 1.7 per cent this year.",
  },
  {
    id: "3",
    logo: "WSJ",
    color: "#FFFFFF",
    textColor: "#333333",
    content: "Federal Reserve live: US central bank cuts growth forecast and boosts inflation outlook. Bank's latest projections show officials expect GDP to expand by 1.7 per cent this year.",
  },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<ContactType | null>(null);
  const { toast } = useToast();
  
  const [showEmails, setShowEmails] = useState({
    work: false,
    personal: false
  });

  // For demonstration purposes, we'll use a mock contact with the same structure as the example
  const mockContacts: ContactType[] = [
    {
      id: 2,
      firm_id: 4,
      contact_id: 59246,
      investor: "3i",
      firm_type: "Fund Manager",
      title: "Mr.",
      name: "Rémi Carnimolla",
      alternative_name: "",
      role: "Investment Team",
      job_title: "Senior Partner, Managing Director, Global Head of Services & Software Sector and Member of the Investment Committee",
      asset_class: "PE,INF,NR",
      email: "remi.carnimolla@3i.com",
      tel: "+33 (0)1 7315 1100",
      city: "Paris",
      state: "",
      country_territory: "France",
      zip_code: "75008",
      linkedin: "www.linkedin.com/in/rémi-carnimolla-4227873/",
      favorite: false
    },
    // Add more mock contacts as needed
    {
      id: 3,
      firm_id: 5,
      contact_id: 60123,
      investor: "Blackstone",
      firm_type: "Fund Manager",
      title: "Ms.",
      name: "Sarah Williams",
      alternative_name: "",
      role: "Investment Team",
      job_title: "M&A Director",
      asset_class: "PE,RE",
      email: "sarah.williams@blackstone.com",
      tel: "+1 212 555 1234",
      city: "New York",
      state: "NY",
      country_territory: "USA",
      zip_code: "10022",
      linkedin: "www.linkedin.com/in/sarah-williams/",
      favorite: true
    }
  ];

  useEffect(() => {
    console.log("Profile page loaded with ID:", id);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      try {
        // For now, use mockContacts instead of actual API call
        const numericId = parseInt(id || "0", 10);
        const foundContact = mockContacts.find(c => c.id === numericId);
        
        if (foundContact) {
          setContact(foundContact);
        } else {
          console.error("Contact not found with ID:", id);
          toast({
            title: "Error",
            description: "Contact not found with provided ID",
            variant: "destructive",
          });
          // You could redirect to a 404 page here
          // navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        toast({
          title: "Error",
          description: "Failed to load contact data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id, navigate, toast]);

  const toggleEmailVisibility = (emailType: 'work' | 'personal') => {
    setShowEmails(prev => ({
      ...prev,
      [emailType]: !prev[emailType]
    }));
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6 flex items-center">
                <Skeleton className="h-4 w-24 mr-2" />
                <Skeleton className="h-4 w-4 mx-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              
              {/* Loading skeleton */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-8 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
                
                <div className="flex gap-2 mb-6">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
                
                <div className="border-b border-gray-200 mb-6">
                  <Skeleton className="h-10 w-full" />
                </div>
                
                <div className="space-y-8">
                  <div>
                    <Skeleton className="h-6 w-24 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  </div>
                  
                  <div>
                    <Skeleton className="h-6 w-24 mb-4" />
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (!contact) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
            <div className="max-w-6xl mx-auto text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Contact Not Found</h1>
              <p className="text-gray-600 mb-6">We couldn't find the contact you're looking for.</p>
              <Button onClick={() => navigate("/cabinet3")}>
                Return to Contacts List
              </Button>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const hiddenEmail = contact.email ? contact.email.replace(/(.{2})(.*)(@.*)/, '$1••••••$3') : '••••••••••••@••.•••';

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex items-center text-gray-500 text-sm">
              <Link to="/cabinet3" className="flex items-center hover:text-blue-600">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Contacts</span>
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700 font-medium">{contact.name}</span>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{contact.name}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-gray-600">
                    Claim a mistake
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 text-gray-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 12V8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 4V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12V16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 20V16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 8V4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Order Enrich
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <Button variant="outline" className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3]">
                  My List
                </Button>
                <Button variant="outline" className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3]">
                  Update Subscription
                </Button>
              </div>

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
                    <section>
                      <h2 className="text-xl font-medium mb-4">About</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm mb-1">Area of responsibility</span>
                          <div className="flex gap-2">
                            {contact.asset_class.split(',').map((asset, index) => (
                              <span 
                                key={index}
                                className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                              >
                                {asset}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-sm mb-1">Resident Location</span>
                          <span>{`${contact.city}${contact.state ? `, ${contact.state}` : ''}, ${contact.country_territory}`}</span>
                        </div>
                        
                        <div className="flex flex-col md:col-span-2">
                          <span className="text-gray-500 text-sm mb-1">Current Company</span>
                          <span>{contact.investor || "No data"}</span>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-medium mb-4">Contacts</h2>
                      <div className="space-y-4">
                        {contact.linkedin && (
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center mr-3">
                              <Linkedin className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-blue-600 hover:underline">
                              <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                                {contact.linkedin}
                              </a>
                            </span>
                          </div>
                        )}
                        
                        {contact.email && (
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center mr-3">
                              <Mail className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="flex items-center">
                              <span className="mr-2">
                                {showEmails.work ? contact.email : hiddenEmail}
                              </span>
                              <Button 
                                variant="ghost" 
                                onClick={() => toggleEmailVisibility('work')}
                                className="h-8 w-8 p-0"
                              >
                                {showEmails.work ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center mr-3">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                          <span>{"no personal email data"}</span>
                        </div>
                        
                        {contact.tel && (
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center mr-3">
                              <Phone className="h-5 w-5 text-blue-600" />
                            </div>
                            <span>{contact.tel}</span>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </TabsContent>

                <TabsContent value="bio" className="pt-6">
                  <div className="space-y-8">
                    <section>
                      <h2 className="text-xl font-medium mb-4">Short Bio</h2>
                      <p className="text-gray-700">
                        {contact.job_title || "No biography information available."}
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-medium mb-4">News</h2>
                      <div className="space-y-4">
                        {newsItems.map(item => (
                          <div key={item.id} className="flex gap-4">
                            <div 
                              className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold"
                              style={{ backgroundColor: item.color, color: item.textColor }}
                            >
                              {item.logo}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700">{item.content}</p>
                              <a href="#" className="text-blue-600 hover:underline mt-1 inline-block">Read more.</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </TabsContent>

                <TabsContent value="job" className="pt-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-medium mb-4">Job History</h2>
                    <p className="text-gray-700">
                      {contact.job_title || "No job history data available."}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
