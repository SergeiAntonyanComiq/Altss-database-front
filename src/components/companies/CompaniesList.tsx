
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Search,
  MoreHorizontal,
  Plus,
  MapPin,
  Users,
  Globe,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  employees: number;
  website: string;
  phone: string;
  status: "active" | "inactive" | "pending";
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Corporation",
    logo: "/lovable-uploads/44bd3280-5f80-43d1-b2cd-fd82e9d73c34.png",
    industry: "Technology",
    location: "New York, USA",
    employees: 500,
    website: "www.acmecorp.com",
    phone: "+1 (555) 123-4567",
    status: "active",
  },
  {
    id: "2",
    name: "Globex Industries",
    logo: "/lovable-uploads/789cfd5d-d179-4c0b-8ee6-68da45fa9ff3.png",
    industry: "Manufacturing",
    location: "Chicago, USA",
    employees: 1200,
    website: "www.globex.com",
    phone: "+1 (555) 987-6543",
    status: "active",
  },
  {
    id: "3",
    name: "Stark Enterprises",
    logo: "/lovable-uploads/d93bfc50-1e23-41d9-a778-41f673f31cb0.png",
    industry: "Technology",
    location: "Los Angeles, USA",
    employees: 350,
    website: "www.starkent.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
  },
  {
    id: "4",
    name: "Wayne Innovations",
    industry: "Research",
    location: "Gotham City, USA",
    employees: 780,
    website: "www.wayneinnovations.com",
    phone: "+1 (555) 789-0123",
    status: "pending",
  },
  {
    id: "5",
    name: "Umbrella Corp",
    industry: "Pharmaceuticals",
    location: "Raccoon City, USA",
    employees: 1500,
    website: "www.umbrellacorp.com",
    phone: "+1 (555) 321-9876",
    status: "active",
  },
];

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || company.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search companies..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            <span>Add Company</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Card key={company.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 bg-[#9b87f5] h-16"></div>
                <div className="px-6 pt-6 pb-4 relative">
                  <Avatar className="h-16 w-16 absolute -top-8 border-4 border-white bg-white">
                    {company.logo ? (
                      <AvatarImage src={company.logo} alt={company.name} />
                    ) : (
                      <AvatarFallback className="bg-[#D6BCFA] text-[#6E59A5]">
                        {getInitials(company.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex justify-between items-start mt-4">
                    <div>
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {company.industry}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(company.status)}
                      >
                        {company.status.charAt(0).toUpperCase() +
                          company.status.slice(1)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Company</DropdownMenuItem>
                          <DropdownMenuItem>View Employees</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{company.employees} employees</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{company.website}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{company.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t p-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    View Employees
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center p-12 text-muted-foreground">
            No companies found
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesList;
