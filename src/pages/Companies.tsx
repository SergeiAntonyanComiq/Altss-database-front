
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import ProfileNotFound from "@/components/profile/ProfileNotFound";
import { newsItems } from "@/components/profile/newsItems";

const Companies: React.FC = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<ContactType | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    console.log("Companies page loaded");
    
    // For demonstration, we'll fetch the first contact
    const contactId = "1";
    
    setIsLoading(true);
    
    // Fetch contact data from API
    fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/${contactId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Contact data fetched:", data);
        setContact(data);
      })
      .catch(error => {
        console.error("Error fetching contact:", error);
        toast({
          title: "Error",
          description: "Failed to load contact data",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [toast]);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
          {isLoading ? (
            <ProfileSkeleton />
          ) : !contact ? (
            <ProfileNotFound />
          ) : (
            <div className="max-w-6xl mx-auto">
              <ProfileHeader contact={contact} />
              <ProfileTabs 
                contact={contact} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                newsItems={newsItems}
              />
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Companies;
