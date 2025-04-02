
import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useParams, useNavigate } from "react-router-dom";
import { CompanyType } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";
import CompanyProfileSkeleton from "@/components/company/CompanyProfileSkeleton";
import CompanyNotFound from "@/components/company/CompanyNotFound";
import CompanyProfileTabs from "@/components/company/CompanyProfileTabs";
import CompanyProfileHeader from "@/components/company/CompanyProfileHeader";

const API_BASE_URL = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu";

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
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
      // For IDs 1-60, try to fetch from enriched endpoint first
      const numericId = parseInt(companyId);
      let response;
      
      if (!isNaN(numericId) && numericId >= 1 && numericId <= 60) {
        // Try enriched endpoint first for IDs 1-60
        response = await fetch(`${API_BASE_URL}/enrich_final/${companyId}`);
        
        // If not found in enriched, fall back to regular endpoint
        if (response.status === 404) {
          console.log(`Company ${companyId} not found in enriched endpoint, trying regular endpoint`);
          response = await fetch(`${API_BASE_URL}/fund_managers/${companyId}`);
        }
      } else {
        // For IDs > 60, use the regular endpoint directly
        response = await fetch(`${API_BASE_URL}/fund_managers/${companyId}`);
      }
      
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
      console.log("Fetched company data:", data);
      
      // Format the data to fit our CompanyType, only using actual data
      const companyData: CompanyType = {
        ...data,
        id: String(data.id || ''),
        firm_id: data.firm_id || data.id || companyId,  // Ensure firm_id is preserved
        firm_name: data.firm_name?.trim() || 'N/A',
        name: data.firm_name?.trim() || 'N/A',
        type: data.firm_type || '',
        location: data.city && data.state_county ? `${data.city}, ${data.state_county}` : (data.city || data.state_county || ''),
        employees: data.total_staff || '',
        employees_count: data.total_staff || '',
        aum: data.total_assets_under_management_usd_mn || undefined,
        foundedYear: data.year_est || '',
        founded_year: data.year_est || '',
        isFavorite: false, // Default value
        last_updated: "4 weeks ago" // Mock data as not in API
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
        <div className="flex-1 bg-gray-100">
          <div className="p-5 min-h-[900px]">
            {isLoading ? (
              <CompanyProfileSkeleton />
            ) : !company ? (
              <CompanyNotFound />
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <CompanyProfileHeader 
                  company={{
                    name: company.firm_name,
                    last_updated: company.last_updated
                  }} 
                />
                <CompanyProfileTabs 
                  company={company}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDetails;
