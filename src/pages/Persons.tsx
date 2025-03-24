
import React, { useState } from "react";
import ContactsList from "@/components/contacts/ContactsList";
import PersonsList2 from "@/components/personal/PersonsList2";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const Persons = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>(() => {
    // Check if there's a section in the URL query params
    const params = new URLSearchParams(location.search);
    return params.get("section") || "persons";
  });
  
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "persons":
        return <PersonsList2 />;
      case "contacts":
        return <ContactsList />;
      case "companies":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Companies</h2></div>;
      case "orders":
        return <div className="p-6"><h2 className="text-2xl font-semibold">My Orders</h2></div>;
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

export default Persons;
