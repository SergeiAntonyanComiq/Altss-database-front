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
import { fetchContactById } from "@/services/contactsService";

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
      navigate("/persons");
      return;
    }
    
    const loadContact = async () => {
      setIsLoading(true);
      try {
        const contactData = await fetchContactById(id);
        console.log("Contact data fetched:", contactData);
        
        if (!contactData) {
          throw new Error("Contact not found");
        }
        
        setContact(contactData);
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
    };

    loadContact();
  }, [id, navigate, toast]);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        
        <div className="flex-1 bg-gray-100">
          <div className="p-5 min-h-[900px]">
            {isLoading ? (
              <ProfileSkeleton />
            ) : !contact ? (
              <ProfileNotFound />
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <ProfileHeader contact={contact} />
                <ProfileTabs 
                  contact={contact} 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  newsItems={newsItems}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
