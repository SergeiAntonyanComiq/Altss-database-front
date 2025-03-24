
import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CompanyType } from "@/types/company";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import CompanyDetailsSection from "@/components/company/CompanyDetailsSection";
import CompanyNewsSection from "@/components/company/CompanyNewsSection";
import CompanyHistorySection from "@/components/company/CompanyHistorySection";
import CompanyProfileSkeleton from "@/components/company/CompanyProfileSkeleton";
import CompanyNotFound from "@/components/company/CompanyNotFound";

const API_BASE_URL = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu";

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Company details page loaded with ID:", id);
    
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
    setError(null);
    
    fetchCompanyDetails(id);
  }, [id, navigate, toast]);

  const fetchCompanyDetails = async (companyId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fund_managers/${companyId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Company not found",
            description: "The requested company does not exist",
            variant: "destructive",
          });
          navigate("/companies");
          return;
        }
        throw new Error(`Failed to fetch company details: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Format the data to fit our CompanyType
      const companyData: CompanyType = {
        ...data,
        id: String(data.id || ''),
        firm_name: data.firm_name || 'N/A',
        name: data.firm_name || 'N/A',
        type: data.firm_type || 'N/A',
        location: `${data.city || 'N/A'}, ${data.state_county || 'N/A'}`,
        employees: data.total_staff ? parseInt(data.total_staff) : 'N/A',
        revenue: `$${Math.floor(Math.random() * 70) + 5}M`, // Mock data as not in API
        status: Math.random() > 0.2 ? 'Active' : 'Inactive', // Mock data as not in API
        aum: data.total_assets_under_management_usd_mn || 
             data.pe_portfolio_company_maximum_value_usd_mn || 
             (Math.random() * 3000) + 100,
        foundedYear: data.year_est ? `${data.year_est}` : 'N/A',
        isFavorite: false, // Default to not favorite
        phone: data.tel,
        email: data.email,
        website: data.website,
        industry: data.firm_type,
        founded_year: data.year_est || 2005,
        headquarters: `${data.city || 'N/A'}, ${data.state_county || 'N/A'}`,
        description: data.background || "A leading investment company specializing in private equity.",
        ceo: "John Smith", // Mock data
        last_updated: "4 weeks ago", // Mock data
      };
      
      setCompany(companyData);
    } catch (err) {
      console.error("Error fetching company details:", err);
      setError("Failed to load company details. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load company details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
          {isLoading ? (
            <CompanyProfileSkeleton />
          ) : !company ? (
            <CompanyNotFound />
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb Navigation */}
              <div className="mb-6 flex items-center text-gray-500 text-sm">
                <Link to="/companies" className="flex items-center hover:text-blue-600">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span>Companies</span>
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700 font-medium">{company.firm_name}</span>
              </div>

              <div className="mb-8">
                {company.last_updated && (
                  <div className="text-sm text-gray-500 mb-2">
                    Last update: {company.last_updated}
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-semibold">{company.firm_name}</h1>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-gray-600">
                      Claim a mistake
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 text-gray-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 12V8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 4V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 12V16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 20V16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 8V4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Order Enrich
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button 
                    variant="outline" 
                    className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3] flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add to Favorites
                  </Button>
                  
                  <Button variant="outline" className="bg-[#E0F2EF] border-none text-[#03887E] hover:bg-[#C5E8E3]">
                    Order Enrich
                  </Button>
                </div>
              </div>
              
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="border-b border-gray-200"
              >
                <TabsList className="bg-transparent p-0 h-auto">
                  <TabsTrigger 
                    value="details" 
                    className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="news" 
                    className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                  >
                    News & Updates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                  >
                    Company History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="pt-6">
                  <CompanyDetailsSection company={company} />
                </TabsContent>

                <TabsContent value="news" className="pt-6">
                  <CompanyNewsSection company={company} />
                </TabsContent>

                <TabsContent value="history" className="pt-6">
                  <CompanyHistorySection company={company} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDetails;
