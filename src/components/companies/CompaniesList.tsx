
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowDownUp, Eye, RefreshCcw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for companies
const mockCompanies = [
  { 
    id: "1", 
    name: "Altss Technology", 
    type: "IT",
    location: "San Francisco, CA",
    employees: 250,
    revenue: "$25M",
    status: "Active"
  },
  { 
    id: "2", 
    name: "Nexus Solutions", 
    type: "Software",
    location: "Boston, MA",
    employees: 120,
    revenue: "$12M",
    status: "Active"
  },
  { 
    id: "3", 
    name: "Global Connect", 
    type: "Telecommunications",
    location: "Chicago, IL",
    employees: 500,
    revenue: "$40M",
    status: "Inactive"
  },
  { 
    id: "4", 
    name: "Summit Enterprises", 
    type: "Finance",
    location: "New York, NY",
    employees: 340,
    revenue: "$32M",
    status: "Active"
  },
  { 
    id: "5", 
    name: "Vertex Manufacturing", 
    type: "Manufacturing",
    location: "Detroit, MI",
    employees: 780,
    revenue: "$65M",
    status: "Active"
  }
];

const CompaniesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleViewCompany = (id: string) => {
    navigate(`/company/${id}`);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {mockCompanies.length} items
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow p-4 mb-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search companies..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <ArrowDownUp className="h-4 w-4" />
            Sort
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-medium">Company Name</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Location</TableHead>
              <TableHead className="font-medium">Employees</TableHead>
              <TableHead className="font-medium">Revenue</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCompanies.map((company) => (
              <TableRow key={company.id} className="border-t border-gray-200">
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.type}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.employees}</TableCell>
                <TableCell>{company.revenue}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    company.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {company.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewCompany(company.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesList;
