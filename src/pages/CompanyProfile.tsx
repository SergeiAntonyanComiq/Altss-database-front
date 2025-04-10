import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import CompanyProfileHeader from "@/components/company/CompanyProfileHeader";
import CompanyProfileTabs from "@/components/company/CompanyProfileTabs";
import CompanyProfileSkeleton from "@/components/company/CompanyProfileSkeleton";
import CompanyNotFound from "@/components/company/CompanyNotFound";
import { CompanyType } from "@/types/company";
import { fetchFundManagerById } from "@/services/fundManagersService";

const CompanyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState<CompanyType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Company profile page loaded with ID:", id);
    
    if (!id) {
      toast({
        title: "Error",
        description: "No company ID provided",
        variant: "destructive",
      });
      navigate("/companies");
      return;
    }
    
    const fetchCompanyData = async () => {
      setIsLoading(true);
      try {
        const fetchedCompany = await fetchFundManagerById(id);
        
        if (fetchedCompany) {
          console.log("Fetched company:", fetchedCompany);
          setCompany(fetchedCompany);
        } else {
          toast({
            title: "Company not found",
            description: `We couldn't find details for the company with ID: ${id}`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        toast({
          title: "Error",
          description: "Failed to load company details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [id, navigate, toast]);

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
              <CompanyProfileHeader 
                company={{
                  name: company.name || company.firm_name || "",
                  last_updated: company.last_updated || "N/A"
                }} 
              />
              <CompanyProfileTabs 
                company={company} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
              />
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CompanyProfile;
