
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SavedSearches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const savedSearches = [
    { id: 1, name: "Venture Capital Firms in California", date: "2023-06-15", count: 245 },
    { id: 2, name: "FinTech CEOs", date: "2023-07-22", count: 178 },
    { id: 3, name: "Healthcare Startups", date: "2023-08-05", count: 312 },
    { id: 4, name: "Tech Companies with Female Leadership", date: "2023-09-10", count: 94 },
  ];
  
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold font-montserrat mb-6">Saved Searches</h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search saved items"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full border-gray-200"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                <Button variant="outline" className="border-gray-200">
                  Clear filters
                </Button>
              </div>
              
              {savedSearches.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left p-3 font-medium text-gray-500">Name</th>
                        <th className="text-left p-3 font-medium text-gray-500">Date Saved</th>
                        <th className="text-left p-3 font-medium text-gray-500">Results Count</th>
                        <th className="text-right p-3 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedSearches.map((search) => (
                        <tr key={search.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="11" cy="11" r="7" stroke="#3B82F6" strokeWidth="2"/>
                                  <path d="M20 20L16 16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                              </div>
                              <span className="font-medium">{search.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-gray-500">{search.date}</td>
                          <td className="p-3 text-gray-500">{search.count} results</td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                              View Results
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="bg-gray-100 p-4 inline-flex rounded-full mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="7" stroke="#64748B" strokeWidth="2"/>
                      <path d="M20 20L16 16" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No saved searches</h3>
                  <p className="text-gray-500 mb-4">Save your searches to quickly access them later</p>
                  <Button>Create your first search</Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SavedSearches;
