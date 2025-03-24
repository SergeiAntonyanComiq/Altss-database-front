
import React, { useState } from "react";
import PersonsList2 from "@/components/personal/PersonsList2";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const PersonalCabinet3 = () => {
  const [activeSection, setActiveSection] = useState<string>("persons");
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "persons":
        return <PersonsList2 />;
      case "favorites":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Favorites</h2></div>;
      case "saved":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Saved Searches</h2></div>;
      default:
        return <PersonsList2 />;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7]">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PersonalCabinet3;
