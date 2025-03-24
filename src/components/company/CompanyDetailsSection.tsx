
import React from "react";
import { Linkedin, Twitter, Mail, Phone, Globe, Fax } from "lucide-react";
import { CompanyType } from "@/types/company";

interface CompanyDetailsSectionProps {
  company: CompanyType;
}

const CompanyDetailsSection: React.FC<CompanyDetailsSectionProps> = ({ company }) => {
  // Basic company information
  const hasBasicInfo = company.firm_type || 
    company.city || company.state_county || 
    company.year_est || 
    company.total_staff ||
    company.firm_ownership || company.listed || 
    company["women-led_firm"] || company["minority-led_firm"] ||
    company.address;

  // Financial information
  const hasFinancialInfo = company.total_assets_under_management_usd_mn ||
    company.pe_estimated_dry_powder_usd_mn || 
    company.pe_total_funds_raised_last_10_years_usd_mn ||
    company.pe_portfolio_company_maximum_annual_revenue_usd_mn ||
    company.pe_portfolio_company_maximum_value_usd_mn;

  // Investment strategy
  const hasInvestmentStrategy = company.pe_main_firm_strategy || 
    company.pe_strategies || 
    company.pe_geographic_exposure || 
    company.pe_industries ||
    company.pe_industry_verticals ||
    company.pe_company_size ||
    company.pe_company_situation ||
    company.pe_main_expertise_provided;

  // Investment details
  const hasInvestmentDetails = 
    (company.pe_initial_minimum_equity_investment_size_usd_mn && company.pe_initial_maximum_equity_investment_size_usd_mn) ||
    (company.pe_minimum_transaction_size_usd_mn && company.pe_maximum_transaction_size_usd_mn) ||
    (company.pe_minimum_holding_period_years && company.pe_maximum_holding_period_years) ||
    company.pe_gp_position_in_investment ||
    company.pe_board_representation ||
    company.pe_share_holding ||
    company.pe_investor_co_investment_rights;
  
  // Contact information
  const hasContactInfo = company.website || 
    company.email || 
    company.tel || 
    company.fax;

  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      {hasBasicInfo && (
        <section>
          <h2 className="text-xl font-medium mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {company.firm_type && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Industry</span>
                <div className="flex gap-2">
                  <span 
                    className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {company.firm_type}
                  </span>
                </div>
              </div>
            )}
            
            {(company.city || company.state_county) && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Headquarters</span>
                <span>
                  {company.city ? `${company.city}${company.state_county ? `, ${company.state_county}` : ''}` : company.state_county}
                </span>
              </div>
            )}
            
            {company.address && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Address</span>
                <span>{company.address}</span>
              </div>
            )}
            
            {company.year_est && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Founded</span>
                <span>{company.year_est}</span>
              </div>
            )}
            
            {company.total_staff && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Employees</span>
                <span>{company.total_staff}</span>
              </div>
            )}
            
            {company.firm_ownership && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Ownership</span>
                <span>{company.firm_ownership}</span>
              </div>
            )}
            
            {company.listed && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Listed</span>
                <span>{company.listed}</span>
              </div>
            )}
            
            {company["women-led_firm"] && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Women-led Firm</span>
                <span>{company["women-led_firm"]}</span>
              </div>
            )}
            
            {company["minority-led_firm"] && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Minority-led Firm</span>
                <span>{company["minority-led_firm"]}</span>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Financial Information Section */}
      {hasFinancialInfo && (
        <section>
          <h2 className="text-xl font-medium mb-4">Financial Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {company.total_assets_under_management_usd_mn && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Assets Under Management (USD)</span>
                <span>${company.total_assets_under_management_usd_mn}M</span>
              </div>
            )}
            
            {company.pe_estimated_dry_powder_usd_mn && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Estimated Dry Powder (USD)</span>
                <span>${company.pe_estimated_dry_powder_usd_mn}M</span>
              </div>
            )}
            
            {company.pe_total_funds_raised_last_10_years_usd_mn && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Total Funds Raised (Last 10 Years, USD)</span>
                <span>${company.pe_total_funds_raised_last_10_years_usd_mn}M</span>
              </div>
            )}
            
            {company.pe_portfolio_company_maximum_annual_revenue_usd_mn && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Portfolio Company Max Revenue (USD)</span>
                <span>${company.pe_portfolio_company_maximum_annual_revenue_usd_mn}M</span>
              </div>
            )}
            
            {company.pe_portfolio_company_maximum_value_usd_mn && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Portfolio Company Max Value (USD)</span>
                <span>${company.pe_portfolio_company_maximum_value_usd_mn}M</span>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Investment Strategy Section */}
      {hasInvestmentStrategy && (
        <section>
          <h2 className="text-xl font-medium mb-4">Investment Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {company.pe_main_firm_strategy && (
              <div className="flex flex-col md:col-span-2">
                <span className="text-gray-500 text-sm mb-1">Main Strategy</span>
                <span>{company.pe_main_firm_strategy}</span>
              </div>
            )}
            
            {company.pe_strategies && (
              <div className="flex flex-col md:col-span-2">
                <span className="text-gray-500 text-sm mb-1">Strategies</span>
                <div className="flex flex-wrap gap-2">
                  {company.pe_strategies.split(',').map((strategy, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {strategy.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {company.pe_geographic_exposure && (
              <div className="flex flex-col md:col-span-2">
                <span className="text-gray-500 text-sm mb-1">Geographic Exposure</span>
                <div className="flex flex-wrap gap-2">
                  {company.pe_geographic_exposure.split(',').map((geo, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {geo.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {company.pe_industries && (
              <div className="flex flex-col md:col-span-2">
                <span className="text-gray-500 text-sm mb-1">Industries</span>
                <div className="flex flex-wrap gap-2">
                  {company.pe_industries.split(',').map((industry, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                    >
                      {industry.trim().replace(/\\u0026/g, '&')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {company.pe_industry_verticals && (
              <div className="flex flex-col md:col-span-2">
                <span className="text-gray-500 text-sm mb-1">Industry Verticals</span>
                <div className="flex flex-wrap gap-2">
                  {company.pe_industry_verticals.split(',').map((vertical, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
                    >
                      {vertical.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {company.pe_company_size && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Company Size Focus</span>
                <span>{company.pe_company_size}</span>
              </div>
            )}
            
            {company.pe_company_situation && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Company Situation Focus</span>
                <span>{company.pe_company_situation}</span>
              </div>
            )}
            
            {company.pe_main_expertise_provided && (
              <div className="flex flex-col md:col-span-2">
                <span className="text-gray-500 text-sm mb-1">Main Expertise Provided</span>
                <span>{company.pe_main_expertise_provided}</span>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Investment Details Section */}
      {hasInvestmentDetails && (
        <section>
          <h2 className="text-xl font-medium mb-4">Investment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {(company.pe_initial_minimum_equity_investment_size_usd_mn && company.pe_initial_maximum_equity_investment_size_usd_mn) && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Equity Investment Size (USD)</span>
                <span>${company.pe_initial_minimum_equity_investment_size_usd_mn}M - ${company.pe_initial_maximum_equity_investment_size_usd_mn}M</span>
              </div>
            )}
            
            {(company.pe_minimum_transaction_size_usd_mn && company.pe_maximum_transaction_size_usd_mn) && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Transaction Size (USD)</span>
                <span>${company.pe_minimum_transaction_size_usd_mn}M - ${company.pe_maximum_transaction_size_usd_mn}M</span>
              </div>
            )}
            
            {(company.pe_minimum_holding_period_years && company.pe_maximum_holding_period_years) && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Holding Period</span>
                <span>{company.pe_minimum_holding_period_years} - {company.pe_maximum_holding_period_years} years</span>
              </div>
            )}
            
            {company.pe_gp_position_in_investment && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Position in Investment</span>
                <span>{company.pe_gp_position_in_investment}</span>
              </div>
            )}
            
            {company.pe_board_representation && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Board Representation</span>
                <span>{company.pe_board_representation}</span>
              </div>
            )}
            
            {company.pe_share_holding && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Share Holding</span>
                <span>{company.pe_share_holding}</span>
              </div>
            )}
            
            {company.pe_investor_co_investment_rights && (
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Co-Investment Rights</span>
                <span>{company.pe_investor_co_investment_rights}</span>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Contact Information Section */}
      {hasContactInfo && (
        <section>
          <h2 className="text-xl font-medium mb-4">Contact Information</h2>
          <div className="space-y-4">
            {company.website && (
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-blue-600 hover:underline">
                  <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </span>
              </div>
            )}

            {company.email && (
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <span>{company.email}</span>
              </div>
            )}

            {company.tel && (
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <span>{company.tel}</span>
              </div>
            )}
            
            {company.fax && (
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <Fax className="h-5 w-5 text-blue-600" />
                </div>
                <span>{company.fax}</span>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Company Background */}
      {company.background && (
        <section>
          <h2 className="text-xl font-medium mb-4">Background</h2>
          <p className="text-gray-700">{company.background.replace(/\\u0027/g, "'")}</p>
        </section>
      )}
    </div>
  );
};

export default CompanyDetailsSection;
