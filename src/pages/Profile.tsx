import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import AccountInfo from "@/components/profile/AccountInfo";
import PasswordSection from "@/components/profile/PasswordSection";
import ActionButtons from "@/components/profile/ActionButtons";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    website: "",
    companyName: "",
    plan: "Free",
    avatar_url: "",
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
          .from("profiles")
          .select(
            "first_name, last_name, website, company_name, plan, avatar_url",
          )
          .eq("id", user.id)
          .single();

        if (error) {
          return new Error(error.message);
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
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to load profile: ${error.message}`,
          variant: "destructive",
        });
        // Set default/empty state on error
        const defaultData = {
          firstName: "",
          secondName: "",
          email: user.email || "",
          website: "",
          companyName: "",
          plan: "Free",
          avatar_url: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    if (!file) return;

    setIsLoading(true);

    // Check file type and size
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
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

    const fileExt = file.name.split(".").pop() || "png";
    const timestamp = new Date().getTime();
    const fileName = `avatar_${timestamp}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("altss")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type, // Explicitly set content type
        });

      if (uploadError) {
        return new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: urlData } = supabase.storage
        .from("altss")
        .getPublicUrl(filePath);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) {
        return new Error("Failed to get public URL for avatar.");
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (updateError) {
        return new Error(`Profile update failed: ${updateError.message}`);
      }

      const newData = { ...formData, avatar_url: publicUrl };
      setFormData(newData);
      setInitialFormData(newData);

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      toast({
        title: "Upload Error",
        description:
          error.message || "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const profileDataChanged =
      formData.firstName !== initialFormData.firstName ||
      formData.secondName !== initialFormData.secondName ||
      formData.website !== initialFormData.website ||
      formData.companyName !== initialFormData.companyName;

    if (profileDataChanged) {
      setIsLoading(true);
      try {
        const profileUpdateData = {
          first_name: formData.firstName,
          last_name: formData.secondName,
          website: formData.website,
          company_name: formData.companyName,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from("profiles")
          .update(profileUpdateData)
          .eq("id", user.id);

        if (error) {
          return new Error("throw");
        }

        setInitialFormData(formData);
        toast({
          title: "Success",
          description: "Profile updated successfully.",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Error",
          description: `Failed to update profile: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        if (!formData.newPassword) setIsLoading(false);
      }
    }

    if (
      formData.newPassword &&
      formData.newPassword === formData.confirmPassword
    ) {
      setIsLoading(true); // Indicate loading for password change too
      try {
        const { error: pwError } = await supabase.auth.updateUser({
          password: formData.newPassword,
        });

        if (pwError) {
          return new Error(pwError.message);
        }

        toast({
          title: "Password Changed",
          description: "Your password has been updated successfully.",
        });
        // Reset password fields only on successful change
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setInitialFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } catch (pwError) {
        console.error("Error changing password:", pwError);
        toast({
          title: "Password Change Error",
          description: `Failed to change password: ${pwError.message}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (formData.newPassword || formData.confirmPassword) {
      if (
        formData.newPassword !== formData.confirmPassword &&
        formData.confirmPassword !== ""
      ) {
        toast({
          title: "Password Mismatch",
          description: "New passwords do not match.",
          variant: "destructive",
        });
      }
    }

    if (!profileDataChanged) {
      setIsLoading(false);
    }
  };

  const handleUndo = () => {
    setFormData(initialFormData);
    toast({
      title: "Changes Undone",
      description: "Profile reset to last saved state.",
    });
  };

  if (isLoading && !formData.email) {
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
            <ProfileHeader
              name={`${formData.firstName} ${formData.secondName}`.trim()}
              plan={formData.plan}
            />

            <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="w-full mt-4 px-6 pb-4">
              {activeTab === "details" && (
                <>
                  <AccountInfo
                    formData={formData}
                    onChange={handleInputChange}
                    avatarUrl={formData.avatar_url}
                    onAvatarUpload={handleAvatarUpload}
                  />

                  <PasswordSection
                    formData={formData}
                    onChange={handleInputChange}
                  />

                  <ActionButtons onSave={handleSave} onUndo={handleUndo} />
                </>
              )}

              {activeTab === "billing" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[rgba(17,25,40,1)] mb-4">
                    My Subscription
                  </h2>
                  <div className="space-y-4 text-base mb-8">
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Plan
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        {formData.plan}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Expiration date
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        10 April 2025
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-[rgba(17,25,40,1)] mb-4">
                    Lifetime Statistics
                  </h2>
                  <div className="space-y-4 text-base">
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Persons found
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        12 347
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Companies found
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        456
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Enriches ordered
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        --
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Saved Search & Lists
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        14
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "support" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[rgba(17,25,40,1)] mb-4">
                    Your manager
                  </h2>
                  <div className="space-y-4 text-base mb-8">
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Name
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        Dawid Siekiera
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[rgba(99,115,129,1)] w-[180px]">
                        Email
                      </span>
                      <span className="font-medium text-[rgba(17,25,40,1)]">
                        d@atss.com
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://cal.com/dawid.s/altss-support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-stretch bg-white border gap-2.5 text-[rgba(38,101,240,1)] w-auto px-6 py-3 rounded-[50px] border-[rgba(38,101,240,1)] border-solid text-base font-medium hover:bg-gray-50 transition-colors inline-block text-center"
                  >
                    Book a call
                  </a>
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
