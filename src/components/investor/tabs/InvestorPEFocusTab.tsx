import React from "react";
import { InvestorType } from "@/types/investor";

interface Props { investor: InvestorType; }

// Helper component to render label and value only if value exists
const Field: React.FC<{ label: string; value: string | number | null | undefined }> = ({ label, value }) => {
  if (value === null || value === undefined || value === "") return null;
  return (
    <>
      <span className="text-gray-600 font-medium">{label}</span>
      <span>{value}</span>
    </>
  );
};

const InvestorPEFocusTab: React.FC<Props> = ({ investor }) => {
  const hasPEData = [
    investor.investing_in_pe, investor.pe_allocation, investor.pe_target_allocation,
    investor.pe_allocation_primary, investor.pe_allocation_secondary, investor.pe_allocation_direct,
    investor.pe_strategy_preferences, investor.pe_geographic_preferences, investor.pe_industries,
    investor.pe_industry_verticals, investor.pe_typical_investment, investor.pe_first_time_funds,
    investor.pe_co_invest, investor.pe_first_close_investor, investor.pe_separate_accounts,
    investor.pe_buyout_fund_preferences, investor.pe_other_manager_requirements,
    investor.pe_investment_currency_in_china, investor.pe_next_12_mths, investor.pe_next_12_mths_strategies,
    investor.pe_next_12_mths_regions, investor.pe_next_12_mths_industries,
    investor.pe_preferred_method_of_initial_contact, investor.pe_consultant
  ].some(Boolean);

  if (!hasPEData) {
    return <p className="text-gray-500 text-base">No Private Equity focus data available.</p>;
  }

  return (
    <div className="space-y-8">
      {/* PE Allocation & Strategy */}
      <section>
        <h2 className="text-xl font-bold mb-2">PE Allocation & Strategy</h2>
        <hr className="mb-4 border-t border-[#DFE4EA]" />
        <div className="grid grid-cols-[250px_auto] gap-x-8 gap-y-4 text-base">
          <Field label="Investing in PE?" value={investor.investing_in_pe} />
          <Field label="Current PE Allocation" value={investor.pe_allocation} />
          <Field label="Target PE Allocation" value={investor.pe_target_allocation} />
          <Field label="Primary Allocation" value={investor.pe_allocation_primary} />
          <Field label="Secondary Allocation" value={investor.pe_allocation_secondary} />
          <Field label="Direct Allocation" value={investor.pe_allocation_direct} />
          <Field label="Strategy Preferences" value={investor.pe_strategy_preferences} />
          <Field label="Geographic Preferences" value={investor.pe_geographic_preferences} />
          <Field label="Industry Preferences" value={investor.pe_industries} />
          <Field label="Industry Verticals" value={investor.pe_industry_verticals} />
        </div>
      </section>

      {/* PE Investment Criteria */}
      <section>
        <h2 className="text-xl font-bold mb-2">PE Investment Criteria</h2>
        <hr className="mb-4 border-t border-[#DFE4EA]" />
        <div className="grid grid-cols-[250px_auto] gap-x-8 gap-y-4 text-base">
          <Field label="Typical Investment Size" value={investor.pe_typical_investment} />
          <Field label="Invests in First Time Funds?" value={investor.pe_first_time_funds} />
          <Field label="Co-Invests?" value={investor.pe_co_invest} />
          <Field label="First Close Investor?" value={investor.pe_first_close_investor} />
          <Field label="Uses Separate Accounts?" value={investor.pe_separate_accounts} />
          <Field label="Buyout Fund Preferences" value={investor.pe_buyout_fund_preferences} />
          <Field label="Other Manager Requirements" value={investor.pe_other_manager_requirements} />
          <Field label="Investment Currency in China" value={investor.pe_investment_currency_in_china} />
        </div>
      </section>

      {/* PE Future Plans (Next 12 Months) */}
      <section>
        <h2 className="text-xl font-bold mb-2">PE Future Plans (Next 12 Months)</h2>
        <hr className="mb-4 border-t border-[#DFE4EA]" />
        <div className="grid grid-cols-[250px_auto] gap-x-8 gap-y-4 text-base">
          <Field label="Plans" value={investor.pe_next_12_mths} />
          <Field label="Min/Max Funds" value={investor.pe_next_12_mths_no_funds_min ? `${investor.pe_next_12_mths_no_funds_min} - ${investor.pe_next_12_mths_no_funds_max}` : null} />
          <Field label="Min/Max Investment" value={investor.pe_next_12_mths_min ? `${investor.pe_next_12_mths_min} - ${investor.pe_next_12_mths_max}` : null} />
          <Field label="Strategies" value={investor.pe_next_12_mths_strategies} />
          <Field label="Buyout Preferences" value={investor.pe_next_12_mths_buyout_pref} />
          <Field label="Regions" value={investor.pe_next_12_mths_regions} />
          <Field label="Industries" value={investor.pe_next_12_mths_industries} />
          <Field label="Industry Verticals" value={investor.pe_next_12_mths_industry_verticals} />
          <Field label="Date of Plans" value={investor.pe_next_12_mths_date_of_plans} />
          <Field label="GP Relationships" value={investor.pe_next_12_mths_gp_relationships} />
        </div>
      </section>

      {/* PE Contact Preferences */}
      <section>
        <h2 className="text-xl font-bold mb-2">PE Contact Preferences</h2>
        <hr className="mb-4 border-t border-[#DFE4EA]" />
        <div className="grid grid-cols-[250px_auto] gap-x-8 gap-y-4 text-base">
          <Field label="Preferred Method" value={investor.pe_preferred_method_of_initial_contact} />
          <Field label="Preferred Email" value={investor.pe_preferred_initial_contact_email} />
          <Field label="Priority Contact Name" value={investor.pe_priority_contact_name} />
          <Field label="Priority Contact Title" value={investor.pe_priority_contact_job_title} />
          <Field label="Priority Contact Email" value={investor.pe_priority_contact_email} />
          <Field label="Priority Contact Phone" value={investor.pe_priority_contact_phone} />
          <Field label="Consultant" value={investor.pe_consultant} />
        </div>
      </section>
    </div>
  );
};

export default InvestorPEFocusTab; 