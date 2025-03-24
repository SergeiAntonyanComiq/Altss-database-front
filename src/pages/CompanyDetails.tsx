
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
import { 
  Building2, Globe, Mail, MapPin, Phone, Users, Calendar, 
  DollarSign, Briefcase, FileText, Globe2, Building, Landmark, 
  Hash, AlertCircle, Award, TrendingUp, Wallet, 
  BarChart4, PieChart, CreditCard
} from "lucide-react";

const API_BASE_URL = "https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu";

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
    setError(null);
    
    fetchCompanyDetails(id);
  }, [id, navigate, toast]);

  const [error, setError] = useState<string | null>(null);

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
        industry: data.firm_type
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

  // Helper function to display field if it exists
  const renderField = (label: string, value: any, icon: React.ReactNode) => {
    if (value === undefined || value === null || value === '') return null;
    
    return (
      <div className="flex items-start gap-2">
        {icon}
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-sm">{value}</p>
        </div>
      </div>
    );
  };

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
                <h1 className="text-2xl font-bold">{company.firm_name}</h1>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  company.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {company.status}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Export</Button>
                <Button>Contact</Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="investment">Investment Details</TabsTrigger>
                <TabsTrigger value="additional">Additional Info</TabsTrigger>
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
                        {company.background && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Background</h3>
                            <p className="text-sm">{company.background}</p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          {renderField("Industry", company.firm_type, <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Staff Count", company.total_staff, <Users className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Founded Year", company.year_est, <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Location", `${company.city || 'N/A'}, ${company.state_county || 'N/A'}`, <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Country", company.country, <Globe2 className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Region", company.region, <Building className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Address", company.address, <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Zip Code", company.zip_code, <Hash className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Secondary Locations", company.secondary_locations, <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Management Team", company.management_team_staff, <Users className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Investment Team", company.investment_team_staff, <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Main Currency", company.firm_s_main_currency, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Currency of Funds", company.currency_of_funds_managed, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Women Led Firm", company.women_led_firm, <Users className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Minority Led Firm", company.minority_led_firm, <Users className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Firm Ownership", company.firm_ownership, <Landmark className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Listed", company.listed, <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Ticker Symbol", company.ticker_symbol, <Hash className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          {renderField("Stock Exchange", company.stock_exchange, <TrendingUp className="h-5 w-5 text-gray-400 mt-0.5" />)}
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
                        {renderField("Website", 
                          company.website ? (
                            <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {company.website}
                            </a>
                          ) : null,
                          <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                        )}
                        
                        {renderField("Email", 
                          company.email ? (
                            <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">
                              {company.email}
                            </a>
                          ) : null,
                          <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                        )}
                        
                        {renderField("Phone", 
                          company.tel ? (
                            <a href={`tel:${company.tel}`} className="text-blue-600 hover:underline">
                              {company.tel}
                            </a>
                          ) : null,
                          <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                        )}
                        
                        {renderField("Fax", company.fax, <Phone className="h-5 w-5 text-gray-400 mt-0.5" />)}
                        
                        {company.local_language_firm_name && (
                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-1">Local Language Name</p>
                            <p className="text-sm">{company.local_language_firm_name}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>                  
                </div>
              </TabsContent>
              
              <TabsContent value="financial">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField("Total Assets Under Management (USD)", 
                                  company.total_assets_under_management_usd_mn ? `$${company.total_assets_under_management_usd_mn}M` : null, 
                                  <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("Total Assets Under Management (EUR)", 
                                  company.total_assets_under_management_eur_mn ? `€${company.total_assets_under_management_eur_mn}M` : null, 
                                  <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("Total Assets Under Management (Local)", 
                                  company.total_assets_under_management_curr_mn ? `${company.total_assets_under_management_curr_mn}M` : null, 
                                  <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("Asset Management Date", 
                                  company.total_assets_under_management_date, 
                                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("Alternatives AUM (USD)", 
                                  company.alternatives_assets_under_management_usd_mn ? `$${company.alternatives_assets_under_management_usd_mn}M` : null, 
                                  <BarChart4 className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("Alternatives AUM (EUR)", 
                                  company.alternatives_assets_under_management_eur_mn ? `€${company.alternatives_assets_under_management_eur_mn}M` : null, 
                                  <BarChart4 className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("Alternatives AUM (Local)", 
                                  company.alternatives_assets_under_management_curr_mn ? `${company.alternatives_assets_under_management_curr_mn}M` : null, 
                                  <BarChart4 className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("PE AUM (USD)", 
                                  company.pe_assets_under_management_usd_mn ? `$${company.pe_assets_under_management_usd_mn}M` : null, 
                                  <PieChart className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("PE AUM (EUR)", 
                                  company.pe_assets_under_management_eur_mn ? `€${company.pe_assets_under_management_eur_mn}M` : null, 
                                  <PieChart className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      
                      {renderField("PE AUM (Local)", 
                                  company.pe_assets_under_management_curr_mn ? `${company.pe_assets_under_management_curr_mn}M` : null, 
                                  <PieChart className="h-5 w-5 text-gray-400 mt-0.5" />)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="investment">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField("Main Strategy", company.pe_main_firm_strategy, <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Geographic Exposure", company.pe_geographic_exposure, <Globe className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Industries", company.pe_industries, <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Industry Verticals", company.pe_industry_verticals, <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Dry Powder (USD)", company.pe_estimated_dry_powder_usd_mn ? `$${company.pe_estimated_dry_powder_usd_mn}M` : null, <Wallet className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Dry Powder (EUR)", company.pe_estimated_dry_powder_eur_mn ? `€${company.pe_estimated_dry_powder_eur_mn}M` : null, <Wallet className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Funds Raised (10y, USD)", company.pe_total_funds_raised_last_10_years_usd_mn ? `$${company.pe_total_funds_raised_last_10_years_usd_mn}M` : null, <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Funds Raised (10y, EUR)", company.pe_total_funds_raised_last_10_years_eur_mn ? `€${company.pe_total_funds_raised_last_10_years_eur_mn}M` : null, <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Strategies", company.pe_strategies, <Award className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Co-investment Rights", company.pe_investor_co_investment_rights, <Users className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Company Size", company.pe_company_size, <Building className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Company Situation", company.pe_company_situation, <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Investment Stage", company.pe_investment_stage, <TrendingUp className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("GP Position", company.pe_gp_position_in_investment, <Users className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Board Representation", company.pe_board_representation, <Users className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Share Holding", company.pe_share_holding, <PieChart className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Applied Strategies", company.pe_main_applied_strategies, <Award className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Expertise Provided", company.pe_main_expertise_provided, <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      {renderField("Sources of Capital", company.pe_sources_of_capital, <Wallet className="h-5 w-5 text-gray-400 mt-0.5" />)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="additional">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Criteria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {renderField("Min Holding Period (Years)", company.pe_minimum_holding_period_years, <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />)}
                        {renderField("Max Holding Period (Years)", company.pe_maximum_holding_period_years, <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />)}
                        {renderField("Total Funds In Market", company.pe_total_no_of_funds_in_market, <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />)}
                        {renderField("Total Funds Closed", company.pe_total_no_of_funds_closed, <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Company Criteria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">EBITDA Range</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {renderField("Min EBITDA", company.pe_portfolio_company_minimum_ebitda_usd_mn ? `$${company.pe_portfolio_company_minimum_ebitda_usd_mn}M` : null, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                            {renderField("Max EBITDA", company.pe_portfolio_company_maximum_ebitda_usd_mn ? `$${company.pe_portfolio_company_maximum_ebitda_usd_mn}M` : null, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Annual Revenue Range</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {renderField("Min Revenue", company.pe_portfolio_company_minimum_annual_revenue_usd_mn ? `$${company.pe_portfolio_company_minimum_annual_revenue_usd_mn}M` : null, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                            {renderField("Max Revenue", company.pe_portfolio_company_maximum_annual_revenue_usd_mn ? `$${company.pe_portfolio_company_maximum_annual_revenue_usd_mn}M` : null, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Transaction Size Range</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {renderField("Min Transaction", company.pe_minimum_transaction_size_usd_mn ? `$${company.pe_minimum_transaction_size_usd_mn}M` : null, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                            {renderField("Max Transaction", company.pe_maximum_transaction_size_usd_mn ? `$${company.pe_maximum_transaction_size_usd_mn}M` : null, <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDetails;
