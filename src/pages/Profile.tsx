import React, { useState, useEffect, useRef } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import AccountInfo from "@/components/profile/AccountInfo";
import PasswordSection from "@/components/profile/PasswordSection";
import ActionButtons from "@/components/profile/ActionButtons";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { supabase } from "@/integrations/supabase/client"; // Correct path to supabase client
import { useToast } from "@/components/ui/use-toast"; // For feedback

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    website: "",
    companyName: "",
    plan: "Free", // Default plan
    avatar_url: "", // Add avatar_url
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [initialFormData, setInitialFormData] = useState(formData); // To enable Undo

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, website, company_name, plan, avatar_url') // Fetch all profile fields and plan
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is okay
          throw error;
        }

        const loadedData = {
          firstName: data?.first_name || "",
          secondName: data?.last_name || "",
          email: user.email || "",
          website: data?.website || "", // Load from DB
          companyName: data?.company_name || "", // Load from DB
          plan: data?.plan || "Free", // Load plan or default to Free
          avatar_url: data?.avatar_url || "", // Load avatar_url
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        };
        
        setFormData(loadedData);
        setInitialFormData(loadedData); // Set initial state for Undo
        
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: `Failed to load profile: ${error.message}`,
          variant: "destructive",
        });
        // Set default/empty state on error
        const defaultData = {
          firstName: "", secondName: "", email: user.email || "", 
          website: "", companyName: "", plan: "Free", avatar_url: "",
          currentPassword: "", newPassword: "", confirmPassword: ""
        };
        setFormData(defaultData);
        setInitialFormData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    if (!file) return;

    setIsLoading(true); 
    
    // Check file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or GIF image.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    const fileExt = file.name.split('.').pop() || 'png';
    // Add a timestamp to prevent caching issues
    const timestamp = new Date().getTime();
    const fileName = `avatar_${timestamp}.${fileExt}`;
    // Use user.id as the folder name according to RLS policy
    const filePath = `${user.id}/${fileName}`;

    try {
      console.log("Starting avatar upload to path:", filePath);
      
      // 1. Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('altss')
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type // Explicitly set content type
        });

      if (uploadError) {
        console.error("Upload error details:", uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      console.log("Upload successful:", uploadData);

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('altss')
        .getPublicUrl(filePath);
        
      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) {
        throw new Error("Failed to get public URL for avatar.")
      }
      
      console.log("Public URL generated:", publicUrl);

      // 3. Update profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (updateError) {
        console.error("Profile update error:", updateError);
        throw new Error(`Profile update failed: ${updateError.message}`);
      }
      
      console.log("Profile updated with new avatar URL");

      // 4. Update local state
      const newData = { ...formData, avatar_url: publicUrl };
      setFormData(newData);
      setInitialFormData(newData); // Update undo state as well

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated.",
      });

    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    // Check if profile data actually changed before saving
    const profileDataChanged = formData.firstName !== initialFormData.firstName ||
                               formData.secondName !== initialFormData.secondName ||
                               formData.website !== initialFormData.website ||
                               formData.companyName !== initialFormData.companyName;

    if (profileDataChanged) {
        setIsLoading(true);
        try {
          const profileUpdateData: any = {
            first_name: formData.firstName,
            last_name: formData.secondName,
            website: formData.website,
            company_name: formData.companyName,
            updated_at: new Date().toISOString(), 
          };
    
          const { error } = await supabase
            .from('profiles')
            .update(profileUpdateData)
            .eq('id', user.id);
    
          if (error) throw error;
    
          setInitialFormData(formData); 
          toast({
            title: "Success",
            description: "Profile updated successfully.",
          });
          
        } catch (error: any) {
          console.error("Error updating profile:", error);
          toast({
            title: "Error",
            description: `Failed to update profile: ${error.message}`,
            variant: "destructive",
          });
        } finally {
          // We might set loading false later if password change happens
          if (!formData.newPassword) setIsLoading(false);
        }
    } else {
        // If only password might change, don't show profile saved message
    }
    
    // Handle password change
    if (formData.newPassword && formData.newPassword === formData.confirmPassword) {
      console.log("Password change requested");
      setIsLoading(true); // Indicate loading for password change too
      try {
        const { error: pwError } = await supabase.auth.updateUser({ password: formData.newPassword });
        
        if (pwError) throw pwError;

        toast({
          title: "Password Changed",
          description: "Your password has been updated successfully.",
        });
        // Reset password fields only on successful change
        setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
        setInitialFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));

      } catch (pwError: any) {
        console.error("Error changing password:", pwError);
        toast({
          title: "Password Change Error",
          description: `Failed to change password: ${pwError.message}`,
          variant: "destructive",
        });
        // Optionally reset fields even on error, or leave them for user to correct
        // setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      } finally {
        // Potentially need separate loading state if profile save can happen concurrently?
        // For now, assume sequential, so this isLoading handles both.
        setIsLoading(false); 
      }

    } else if (formData.newPassword || formData.confirmPassword) {
        if (formData.newPassword !== formData.confirmPassword && formData.confirmPassword !== '') { // Only show mismatch if confirm has been typed into
            toast({ title: "Password Mismatch", description: "New passwords do not match.", variant: "destructive" });
        }
    }

    // Ensure loading is false if only password was attempted (or nothing changed)
    if (!profileDataChanged) {
        setIsLoading(false);
    }
  };

  const handleUndo = () => {
    setFormData(initialFormData);
    toast({ title: "Changes Undone", description: "Profile reset to last saved state." });
  };

  // Display loading state or the form
  if (isLoading && !formData.email) { // Show loading only initially
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 bg-gray-100 overflow-auto p-8 flex items-center justify-center">
            <p>Loading profile...</p> 
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        
        <div className="flex-1 bg-gray-100 overflow-auto p-8">
          <section className="bg-[rgba(254,254,254,1)] shadow-[0px_1px_3px_rgba(166,175,195,0.4)] w-full rounded-lg px-6 pt-4 pb-4">
            {/* Pass potentially empty names, header should handle it */}
            <ProfileHeader 
              name={`${formData.firstName} ${formData.secondName}`.trim()} 
              plan={formData.plan} // Pass plan prop
            /> 
            
            <ProfileTabs 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
            
            <div className="w-full mt-4 px-6 pb-4">
              {activeTab === "general" && (
                <>
                  <AccountInfo 
                    formData={formData}
                    onChange={handleInputChange}
                    avatarUrl={formData.avatar_url} // Pass avatar URL
                    onAvatarUpload={handleAvatarUpload} // Pass upload handler
                  />
                  
                  <PasswordSection 
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  
                  <ActionButtons 
                    onSave={handleSave}
                    onUndo={handleUndo}
                    // Disable buttons while loading/saving?
                  />
                </>
              )}
              
              {activeTab === "billing" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[rgba(17,25,40,1)] mb-4">My Subscription</h2>
                  <div className="space-y-4 text-base mb-8">
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Plan</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">{formData.plan}</span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Expiration date</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">10 April 2025</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-[rgba(17,25,40,1)] mb-4">Lifetime Statistics</h2>
                  <div className="space-y-4 text-base">
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Persons found</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">12 347</span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Companies found</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">456</span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Enriches ordered</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">--</span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Saved Search & Lists</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">14</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "support" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[rgba(17,25,40,1)] mb-4">Your manager</h2>
                  <div className="space-y-4 text-base mb-8">
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Name</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">Jonny Doe</span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">Email</span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">jonny@comiq.com</span>
                    </div>
                  </div>
                  <button 
                    className="self-stretch bg-white border gap-2.5 text-[rgba(38,101,240,1)] w-auto px-6 py-3 rounded-[50px] border-[rgba(38,101,240,1)] border-solid text-base font-medium hover:bg-gray-50 transition-colors"
                  >
                    Book a call
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile; 