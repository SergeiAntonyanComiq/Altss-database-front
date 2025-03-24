
import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useParams, useNavigate } from "react-router-dom";
import { CompanyType } from "@/types/company";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Building2, Globe, Mail, MapPin, Phone, Users, Calendar, DollarSign, Briefcase } from "lucide-react";

// Mock detailed data for companies
const mockCompanyDetails: Record<string, CompanyType> = {
  "1": {
    id: "1", 
    name: "Altss Technology", 
    firm_name: "Altss Technology",
    type: "IT",
    description: "Altss Technology is a leading IT company specializing in software development, cloud solutions, and digital transformation services for enterprise clients.",
    website: "https://altstechnology.com",
    industry: "Information Technology",
    founded: "2010",
    headquarters: "San Francisco",
    location: "San Francisco, CA",
    phone: "+1 (415) 555-1234",
    email: "contact@altstechnology.com",
    logo: "/lovable-uploads/21ab7830-17e7-4b33-a70a-dfdbd7546c29.png",
    employees: 250,
    revenue: "$25M",
    status: "Active",
    social: {
      linkedin: "https://linkedin.com/company/altss",
      twitter: "https://twitter.com/altsstech",
    },
    contactPerson: {
      name: "Sarah Johnson",
      title: "Chief Operations Officer",
      phone: "+1 (415) 555-5678",
      email: "s.johnson@altstechnology.com"
    }
  },
  "2": { 
    id: "2", 
    name: "Nexus Solutions", 
    firm_name: "Nexus Solutions",
    type: "Software",
    description: "Nexus Solutions develops enterprise software solutions focusing on business intelligence, data analytics, and workflow optimization.",
    website: "https://nexussolutions.com",
    industry: "Software Development",
    founded: "2015",
    headquarters: "Boston",
    location: "Boston, MA",
    phone: "+1 (617) 555-9876",
    email: "info@nexussolutions.com",
    employees: 120,
    revenue: "$12M",
    status: "Active",
    contactPerson: {
      name: "Michael Chen",
      title: "CEO",
      phone: "+1 (617) 555-1122",
      email: "m.chen@nexussolutions.com"
    }
  },
  "3": { 
    id: "3", 
    name: "Global Connect", 
    firm_name: "Global Connect",
    type: "Telecommunications",
    description: "Global Connect provides telecommunications infrastructure and services to businesses worldwide, specializing in network solutions and connectivity.",
    industry: "Telecommunications",
    founded: "2005",
    location: "Chicago, IL",
    phone: "+1 (312) 555-3344",
    email: "contact@globalconnect.com",
    employees: 500,
    revenue: "$40M",
    status: "Inactive"
  },
  "4": { 
    id: "4", 
    name: "Summit Enterprises", 
    firm_name: "Summit Enterprises",
    type: "Finance",
    description: "Summit Enterprises offers financial services including investment management, financial planning, and wealth management for individuals and businesses.",
    location: "New York, NY",
    employees: 340,
    revenue: "$32M",
    status: "Active"
  },
  "5": { 
    id: "5", 
    name: "Vertex Manufacturing", 
    firm_name: "Vertex Manufacturing",
    type: "Manufacturing",
    description: "Vertex Manufacturing specializes in precision engineering and manufacturing of components for aerospace, automotive, and medical industries.",
    location: "Detroit, MI",
    employees: 780,
    revenue: "$65M",
    status: "Active"
  }
};

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "No company ID provided",
        variant: "destructive",
      });
      navigate("/companies");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API fetch
    setTimeout(() => {
      const companyData = mockCompanyDetails[id];
      if (companyData) {
        setCompany(companyData);
      } else {
        toast({
          title: "Error",
          description: "Company not found",
          variant: "destructive",
        });
        navigate("/companies");
      }
      setIsLoading(false);
    }, 500);
    
  }, [id, navigate, toast]);

  const handleGoBack = () => {
    navigate("/companies");
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 bg-[#F6F6F7] p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <Button variant="outline" onClick={handleGoBack}>
                  Back
                </Button>
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (!company) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 bg-[#F6F6F7] p-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center p-12">
                <h2 className="text-2xl font-semibold mb-2">Company Not Found</h2>
                <p className="text-gray-500 mb-6">The company you're looking for doesn't exist or has been removed.</p>
                <Button onClick={handleGoBack}>Go to Companies</Button>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleGoBack}>
                  Back
                </Button>
                <h1 className="text-2xl font-bold">{company.name}</h1>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  company.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {company.status}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Edit</Button>
                <Button>Contact</Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Main Information */}
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Company Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {company.description && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                            <p className="text-sm">{company.description}</p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <div className="flex items-start gap-2">
                            <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Industry</p>
                              <p className="text-sm">{company.industry || company.type}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Employees</p>
                              <p className="text-sm">{company.employees}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Founded</p>
                              <p className="text-sm">{company.founded || "N/A"}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Revenue</p>
                              <p className="text-sm">{company.revenue}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Location</p>
                              <p className="text-sm">{company.location}</p>
                            </div>
                          </div>
                          
                          {company.headquarters && (
                            <div className="flex items-start gap-2">
                              <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">Headquarters</p>
                                <p className="text-sm">{company.headquarters}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {company.website && (
                          <div className="flex items-start gap-2">
                            <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Website</p>
                              <a 
                                href={company.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {company.website}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {company.email && (
                          <div className="flex items-start gap-2">
                            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <a 
                                href={`mailto:${company.email}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {company.email}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {company.phone && (
                          <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <a 
                                href={`tel:${company.phone}`}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {company.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {company.contactPerson && (
                          <>
                            <Separator className="my-4" />
                            
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-2">Primary Contact</p>
                              
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                                  <div>
                                    <p className="text-sm">{company.contactPerson.name}</p>
                                    <p className="text-xs text-gray-500">{company.contactPerson.title}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                                  <div>
                                    <a 
                                      href={`mailto:${company.contactPerson.email}`}
                                      className="text-sm text-blue-600 hover:underline"
                                    >
                                      {company.contactPerson.email}
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                  <div>
                                    <a 
                                      href={`tel:${company.contactPerson.phone}`}
                                      className="text-sm text-blue-600 hover:underline"
                                    >
                                      {company.contactPerson.phone}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                </div>
              </TabsContent>
              
              <TabsContent value="contacts">
                <Card>
                  <CardHeader>
                    <CardTitle>Contacts</CardTitle>
                    <CardDescription>
                      People associated with {company.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">No contacts available at the moment.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Documents and files related to {company.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">No documents available at the moment.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDetails;
