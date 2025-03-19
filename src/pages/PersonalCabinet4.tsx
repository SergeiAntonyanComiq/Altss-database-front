import React, { useState } from "react";
import { Filter, Save, ChevronLeft, ChevronDown, Plus, Heart, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const PersonalCabinet4 = () => {
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

  return (
    <SidebarProvider>
      <div className="flex w-full bg-background min-h-screen">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] overflow-auto">
          {renderPersonsContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PersonalCabinet4;
