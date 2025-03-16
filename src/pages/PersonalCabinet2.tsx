
import React, { useState } from "react";
import { Building2, Users, ShoppingBag, Heart, Search } from "lucide-react";
import PersonsList from "@/components/personal/PersonsList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PersonalCabinet2 = () => {
  const [activeSection, setActiveSection] = useState<string>("persons");

  const renderContent = () => {
    switch (activeSection) {
      case "persons":
        return <PersonsList />;
      case "companies":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Companies</h2></div>;
      case "orders":
        return <div className="p-6"><h2 className="text-2xl font-semibold">My Orders</h2></div>;
      case "favorites":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Favorites</h2></div>;
      case "saved":
        return <div className="p-6"><h2 className="text-2xl font-semibold">Saved Searches</h2></div>;
      default:
        return <PersonsList />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-background">
      <div className="w-64 bg-[#1A1F2C] min-h-screen flex flex-col border-r border-[#2A2F3C]">
        <div className="p-4 mb-6">
          <div className="bg-[#9b87f5] text-white font-bold text-xl p-2 w-12 h-12 flex items-center justify-center rounded">
            Alt
          </div>
        </div>

        <nav className="space-y-1 flex-1 px-2">
          <button
            onClick={() => setActiveSection("companies")}
            className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
              activeSection === "companies"
                ? "text-white bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                : "text-[#8E9196] hover:bg-[#2A2F3C]"
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span>Companies</span>
          </button>

          <button
            onClick={() => setActiveSection("persons")}
            className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
              activeSection === "persons"
                ? "text-white bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                : "text-[#8E9196] hover:bg-[#2A2F3C]"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Persons</span>
          </button>

          <button
            onClick={() => setActiveSection("orders")}
            className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
              activeSection === "orders"
                ? "text-white bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                : "text-[#8E9196] hover:bg-[#2A2F3C]"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>My Orders</span>
          </button>

          <button
            onClick={() => setActiveSection("favorites")}
            className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
              activeSection === "favorites"
                ? "text-white bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                : "text-[#8E9196] hover:bg-[#2A2F3C]"
            }`}
          >
            <Heart className="h-5 w-5" />
            <span>Favorites</span>
          </button>

          <button
            onClick={() => setActiveSection("saved")}
            className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
              activeSection === "saved"
                ? "text-white bg-[#6E59A5] border-l-4 border-[#9b87f5]"
                : "text-[#8E9196] hover:bg-[#2A2F3C]"
            }`}
          >
            <Search className="h-5 w-5" />
            <span>Saved Searches</span>
          </button>
        </nav>

        <div className="mt-auto p-4 border-t border-[#2A2F3C]">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/lovable-uploads/21ab7830-17e7-4b33-a70a-dfdbd7546c29.png" alt="User Profile" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <span className="text-white text-sm">User Name</span>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-[#F6F6F7]">
        {renderContent()}
      </main>
    </div>
  );
};

export default PersonalCabinet2;
