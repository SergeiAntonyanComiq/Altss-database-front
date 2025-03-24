
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import CompanyProfileHeader from "@/components/company/CompanyProfileHeader";
import CompanyProfileTabs from "@/components/company/CompanyProfileTabs";
import CompanyProfileSkeleton from "@/components/company/CompanyProfileSkeleton";
import CompanyNotFound from "@/components/company/CompanyNotFound";

interface CompanyType {
  id: string;
  name: string;
  industry: string;
  location: string;
  founded_year: number;
  description: string;
  website: string;
  linkedin: string;
  twitter: string;
  employees_count: string;
  revenue: string;
  ceo: string;
  headquarters: string;
  registration_id: string;
  last_updated: string;
}

const mockCompanyData: CompanyType = {
  id: "1",
  name: "ACME Long Name Super Long Inc.",
  industry: "Technology",
  location: "San Francisco, USA",
  founded_year: 2005,
  description: "A leading technology company specializing in innovative solutions.",
  website: "https://www.acme.com",
  linkedin: "linkedin.com/lorem-ipsum-2025",
  twitter: "x.com/lorem-ipsum-2025",
  employees_count: "1000-5000",
  revenue: "$100M-$500M",
  ceo: "John Smitty",
  headquarters: "San Francisco, California",
  registration_id: "ID Number",
  last_updated: "4 weeks ago"
};

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
    
    setIsLoading(true);
    
    // Simulate API fetch - replace with actual API call in production
    setTimeout(() => {
      setCompany(mockCompanyData);
      setIsLoading(false);
    }, 1000);
    
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
              <CompanyProfileHeader company={company} />
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
