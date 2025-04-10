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
import { fetchFundManagerById } from "@/services/fundManagersService";

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
    
    const fetchCompanyData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedCompany = await fetchFundManagerById(id);
        
        if (fetchedCompany) {
          console.log("Fetched company details:", fetchedCompany);
          setCompany({
            ...fetchedCompany,
            last_updated: fetchedCompany.last_updated || "Recently updated"
          });
        } else {
          toast({
            title: "Company not found",
            description: `We couldn't find details for the company with ID: ${id}`,
            variant: "destructive",
          });
          navigate("/companies");
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
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
    
    fetchCompanyData();
  }, [id, navigate, toast]);

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
                    name: company.name || company.firm_name || "",
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
