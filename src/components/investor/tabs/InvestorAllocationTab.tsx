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

// Helper to group related allocation fields
const renderAllocationGroup = (label: string, base?: string | null, ...rest: (string | null)[]) => {
  const values = [base, ...rest].filter(Boolean);
  if (values.length === 0) return null;
  return <Field label={label} value={values.join(", ")} />;
};

const InvestorAllocationTab: React.FC<Props> = ({ investor }) => {
  const hasAnyAllocationData = [
    investor.allocation_alternatives, investor.allocation_alternatives_1, investor.allocation_alternatives_2, investor.allocation_alternatives_3,
    investor.allocation_equities, investor.allocation_equities_1, investor.allocation_equities_2, investor.allocation_equities_3,
    investor.allocation_fixed_income, investor.allocation_fixed_income_1, investor.allocation_fixed_income_2, investor.allocation_fixed_income_3,
    investor.allocation_cash, investor.allocation_cash_1, investor.allocation_cash_2, investor.allocation_cash_3,
    investor.allocation_other, investor.allocation_other_1, investor.allocation_other_2, investor.allocation_other_3
  ].some(Boolean);

  const hasAnyTargetAllocationData = [
    investor.target_allocation_alternatives, investor.target_allocation_alternatives_1, /* ...add others up to 7 */
    investor.target_allocation_equities, investor.target_allocation_equities_1, /* ...add others up to 7 */
    investor.target_allocation_fixed_income, investor.target_allocation_fixed_income_1, /* ...add others up to 7 */
    investor.target_allocation_cash, investor.target_allocation_cash_1, /* ...add others up to 7 */
    investor.target_allocation_other, investor.target_allocation_other_1 /* ...add others up to 7 */
  ].some(Boolean);

  return (
    <div className="space-y-8">
      {/* Current Allocation */}
      {hasAnyAllocationData && (
        <section>
          <h2 className="text-xl font-bold mb-2">Current Allocation</h2>
          <hr className="mb-4" />
          <div className="grid grid-cols-[180px_auto] gap-x-8 gap-y-4 text-base">
            {renderAllocationGroup("Alternatives", investor.allocation_alternatives, investor.allocation_alternatives_1, investor.allocation_alternatives_2, investor.allocation_alternatives_3)}
            {renderAllocationGroup("Equities", investor.allocation_equities, investor.allocation_equities_1, investor.allocation_equities_2, investor.allocation_equities_3)}
            {renderAllocationGroup("Fixed Income", investor.allocation_fixed_income, investor.allocation_fixed_income_1, investor.allocation_fixed_income_2, investor.allocation_fixed_income_3)}
            {renderAllocationGroup("Cash", investor.allocation_cash, investor.allocation_cash_1, investor.allocation_cash_2, investor.allocation_cash_3)}
            {renderAllocationGroup("Other", investor.allocation_other, investor.allocation_other_1, investor.allocation_other_2, investor.allocation_other_3)}
          </div>
        </section>
      )}

      {/* Target Allocation */}
      {hasAnyTargetAllocationData && (
        <section>
          <h2 className="text-xl font-bold mb-2">Target Allocation</h2>
          <hr className="mb-4" />
          <div className="grid grid-cols-[180px_auto] gap-x-8 gap-y-4 text-base">
            {/* Render target fields similarly, including all 7 fields */}
            <Field label="Target Alternatives" value={investor.target_allocation_alternatives} />
            <Field label="Target Equities" value={investor.target_allocation_equities} />
            <Field label="Target Fixed Income" value={investor.target_allocation_fixed_income} />
            <Field label="Target Cash" value={investor.target_allocation_cash} />
            <Field label="Target Other" value={investor.target_allocation_other} />
            {/* Add fields target_allocation_..._1 through _7 for each category here if needed */}
          </div>
        </section>
      )}

      {!hasAnyAllocationData && !hasAnyTargetAllocationData && (
        <p className="text-gray-500 text-base">No allocation data available.</p>
      )}
    </div>
  );
};

export default InvestorAllocationTab; 