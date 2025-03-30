
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

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<ContactType | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    console.log("Profile page loaded with ID:", id);
    
    if (!id) {
      toast({
        title: "Error",
        description: "No contact ID provided",
        variant: "destructive",
      });
      navigate("/cabinet3");
      return;
    }
    
    setIsLoading(true);
    
    // Fetch contact data from API
    fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/${id}`)
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
  }, [id, navigate, toast]);

  return (
    <div className="overflow-hidden">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[19%] max-md:w-full">
          <AppSidebar />
        </div>
        
        <div className="w-[81%] ml-5 max-md:w-full max-md:ml-0">
          <div className="bg-gray-100 p-5 min-h-[900px]">
            {isLoading ? (
              <ProfileSkeleton />
            ) : !contact ? (
              <ProfileNotFound />
            ) : (
              <>
                <ProfileHeader contact={contact} />
                <div className="bg-white shadow rounded-lg p-4">
                  <ProfileTabs 
                    contact={contact} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    newsItems={newsItems}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
