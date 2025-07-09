import React, { useState, useEffect, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useToast } from "@/components/ui/use-toast";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Details, Billing, Support } from "@/components/profile";
import {
  getUserById,
  updateUser,
  uploadUserAvatar,
} from "@/services/usersService.ts";
import apiClient from "@/lib/axios.ts";

export interface ProfileFormValues {
  full_name: string;
  email: string;
  website: string;
  companyName: string;
  plan: string;
  avatar_url: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const defaultValues = useMemo(
    () => ({
      full_name: "",
      email: "",
      website: "",
      companyName: "",
      plan: "Free",
      avatar_url: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }),
    []
  );
  const { user, userPlan, userPlanExpirationDate } = useAuth();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ProfileFormValues>();
  const [initialFormData, setInitialFormData] =
    useState<ProfileFormValues>(defaultValues);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getUserById(user.sub);

        const loadedData = {
          full_name: data.full_name || "",
          email: user.email || "",
          website: data?.website || "",
          companyName: data?.company_name || "",
          plan: data?.plan || "Free",
          avatar_url: data?.avatar_url || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        };

        setFormData(loadedData);
        setInitialFormData(loadedData);
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to load profile: ${error.message}`,
          variant: "destructive",
        });

        const defaultData: ProfileFormValues = {
          ...defaultValues,
          email: user.email || "",
        };

        setFormData(defaultData);
        setInitialFormData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await fetchProfile();
    })();
  }, [user, toast, defaultValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user || !file) return;

    setIsLoading(true);

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024;

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

    try {
      const avatarUrl = await uploadUserAvatar(file, user.sub);

      const newData = {
        ...formData,
        avatar_url: avatarUrl,
        updatedAt: Date.now(),
      };
      setFormData(newData);
      setInitialFormData(newData);

      await updateUser(user.sub, { avatar_url: avatarUrl });

      toast({
        title: "Avatar Uploaded",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      toast({
        title: "Upload Error",
        description:
          error.message || "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });

      setFormData((prevState) => ({
        ...prevState,
        avatar_url: initialFormData.avatar_url,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const profileDataChanged =
      formData.full_name !== initialFormData.full_name ||
      formData.website !== initialFormData.website ||
      formData.companyName !== initialFormData.companyName;

    if (profileDataChanged) {
      setIsLoading(true);
      try {
        const profileUpdateData = {
          full_name: formData.full_name,
          website: formData.website,
          company: formData.companyName,
          updated_at: new Date().toISOString(),
        };

        await updateUser(user.sub, profileUpdateData);

        setInitialFormData(formData);
        toast({
          title: "Success",
          description: "Profile updated successfully.",
        });
      } catch (error) {
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
      setIsLoading(true);
      try {
        await apiClient.patch("/auth/change-password", {
          userId: user.sub,
          email: user.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });

        toast({
          title: "Password Changed",
          description: "Your password has been updated successfully.",
        });

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

    if (!profileDataChanged && !formData.newPassword) {
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

  if (isLoading && !formData?.email) {
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
            <ProfileHeader name={formData.full_name} plan={userPlan} />

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4 flex gap-6 border-b border-[#DFE4EA]">
                <TabsList className="bg-transparent p-0 h-auto">
                  <TabsTrigger
                    value="details"
                    className="py-3 px-0 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                  >
                    General Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="py-3 px-6 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                  >
                    Billing
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className="py-3 px-0 rounded-none text-[#637381] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:font-medium"
                  >
                    Support
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="p-4">
                <TabsContent value="details" className="mt-0">
                  <Details
                    formData={formData}
                    handleUndo={handleUndo}
                    handleSave={handleSave}
                    handleAvatarUpload={handleAvatarUpload}
                    handleInputChange={handleInputChange}
                  />
                </TabsContent>
                <TabsContent value="billing" className="mt-0">
                  <Billing
                    plan={userPlan}
                    expirationDate={userPlanExpirationDate}
                  />
                </TabsContent>
                <TabsContent value="support" className="mt-0">
                  <Support />
                </TabsContent>
              </div>
            </Tabs>
          </section>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
