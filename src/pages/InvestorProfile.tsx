import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import InvestorProfileHeader from "@/components/investor/InvestorProfileHeader";
import InvestorProfileTabs from "@/components/investor/InvestorProfileTabs";
import CompanyProfileSkeleton from "@/components/company/CompanyProfileSkeleton";
import CompanyNotFound from "@/components/company/CompanyNotFound";
import { InvestorType } from "@/types/investor";
import { fetchInvestorById } from "@/services/investorsService";

const InvestorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [investor, setInvestor] = useState<InvestorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) {
      toast({ title: "Error", description: "No investor ID", variant: "destructive" });
      navigate("/investors");
      return;
    }
    const load = async () => {
      setIsLoading(true);
      const inv = await fetchInvestorById(id);
      if (!inv) {
        toast({ title: "Investor not found", description: id, variant: "destructive" });
      }
      setInvestor(inv);
      setIsLoading(false);
    };
    load();
  }, [id, toast, navigate]);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-[#F6F6F7]">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          {isLoading ? (
            <CompanyProfileSkeleton />
          ) : !investor ? (
            <CompanyNotFound />
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <InvestorProfileHeader investor={investor} />
                <InvestorProfileTabs investor={investor} activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default InvestorProfile; 