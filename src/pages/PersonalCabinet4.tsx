
import React, { useState } from "react";
import { Building2, Users, ShoppingBag, Heart, Search, Filter, Save, ChevronLeft, ChevronDown, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PersonalCabinet4 = () => {
  const [activeSection, setActiveSection] = useState<string>("persons");
  const [selectedRows, setSelectedRows] = useState<number[]>([1, 6]);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id) 
        : [...prev, id]
    );
  };

  const toggleFavorite = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id) 
        : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === mockData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockData.map(item => item.id));
    }
  };

  // Mock data for the table
  const mockData = [
    { id: 1, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum", "+1"] },
    { id: 2, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
    { id: 3, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
    { id: 4, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
    { id: 5, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
    { id: 6, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
    { id: 7, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
    { id: 8, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
    { id: 9, name: "Lorem Ipsum inc", area: "Investment", linkedin: "/lorem_ipsu..", location: "NYC, US", companies: ["Optimum"] },
  ];

  const renderSidebar = () => (
    <div className="w-64 bg-[#1A1F2C] h-full flex flex-col border-r border-[#2A2F3C]">
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
          <ChevronDown className="h-4 w-4 ml-auto" />
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
          <ChevronDown className="h-4 w-4 ml-auto" />
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
  );

  const renderPersonsContent = () => (
    <div className="p-6 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <ChevronLeft className="h-5 w-5 text-gray-400 mr-2" />
        <h1 className="text-2xl font-semibold">Persons</h1>
      </div>

      {/* Search and filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Input 
            type="text" 
            placeholder="Search the company" 
            className="w-full pl-3 pr-10 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 bg-white">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 bg-gray-100">
          <Save className="h-4 w-4" />
          <span>Save this Search</span>
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 bg-white">
          <Heart className="h-4 w-4" />
          <span>Add to Favorites</span>
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">
                <Checkbox 
                  checked={selectedRows.length === mockData.length} 
                  onCheckedChange={toggleAllRows}
                  className="h-4 w-4"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Full Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Area of responsibility</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">LinkedIn</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Resident Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Current Companies</th>
              <th className="px-4 py-3 text-left">
                <Plus className="h-4 w-4 text-blue-600 bg-blue-50 rounded-full p-0.5" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockData.map((row) => (
              <tr 
                key={row.id} 
                className={`hover:bg-blue-50 ${selectedRows.includes(row.id) ? 'bg-blue-50' : ''}`}
                onClick={() => toggleRowSelection(row.id)}
              >
                <td className="px-4 py-3">
                  <Checkbox 
                    checked={selectedRows.includes(row.id)} 
                    className="h-4 w-4"
                    // onCheckedChange handled by row click
                  />
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center">
                    {row.name}
                    <button 
                      className="ml-2 focus:outline-none" 
                      onClick={(e) => toggleFavorite(row.id, e)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${favorites.includes(row.id) ? "text-purple-500 fill-purple-500" : "text-gray-300"}`} 
                      />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge className="bg-blue-100 text-blue-800 font-normal rounded-full px-3 py-1">{row.area}</Badge>
                </td>
                <td className="px-4 py-3 text-sm text-blue-600">{row.linkedin}</td>
                <td className="px-4 py-3 text-sm">{row.location}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {row.companies.map((company, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-800 font-normal rounded-full px-3 py-1">{company}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded border border-gray-300 flex items-center justify-center">
            <span className="sr-only">First page</span>
            <span className="flex items-center">≪</span>
          </button>
          <button className="p-1 rounded border border-gray-300 flex items-center justify-center">
            <span className="sr-only">Previous page</span>
            <span className="flex items-center">＜</span>
          </button>
          <button className="p-2 rounded border border-gray-300 min-w-[2rem] text-center">1</button>
          <button className="p-2 rounded bg-blue-600 text-white min-w-[2rem] text-center">2</button>
          <button className="p-2 rounded border border-gray-300 min-w-[2rem] text-center">3</button>
          <button className="p-2 rounded border border-gray-300 min-w-[2rem] text-center">4</button>
          <button className="p-2 rounded border border-gray-300 min-w-[2rem] text-center">5</button>
          <span className="px-2">...</span>
          <button className="p-2 rounded border border-gray-300 min-w-[2rem] text-center">12</button>
          <button className="p-1 rounded border border-gray-300 flex items-center justify-center">
            <span className="sr-only">Next page</span>
            <span className="flex items-center">＞</span>
          </button>
          <button className="p-1 rounded border border-gray-300 flex items-center justify-center">
            <span className="sr-only">Last page</span>
            <span className="flex items-center">≫</span>
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex items-center px-3 py-1 border border-gray-300 rounded-md">
            <span>50 results per page</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderContent = (title: string) => (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "persons":
        return renderPersonsContent();
      case "companies":
        return renderPlaceholderContent("Companies");
      case "orders":
        return renderPlaceholderContent("My Orders");
      case "favorites":
        return renderPlaceholderContent("Favorites");
      case "saved":
        return renderPlaceholderContent("Saved Searches");
      default:
        return renderPersonsContent();
    }
  };

  return (
    <div 
      className="flex w-full bg-background relative" 
      style={{ 
        width: "1440px", 
        height: "900px",
        margin: "0 auto",
        position: "relative"
      }}
    >
      {renderSidebar()}
      <main className="flex-1 bg-[#F6F6F7] h-full overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default PersonalCabinet4;
