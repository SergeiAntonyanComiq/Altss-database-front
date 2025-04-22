import React from "react";
import { InvestorType } from "@/types/investor";
import CompanyNewsSection from "@/components/company/CompanyNewsSection";

interface Props { investor: InvestorType; }

const InvestorNewsSection: React.FC<Props> = ({ investor }) => {
  // reuse company news section component by passing object with name field only
  return <CompanyNewsSection company={{ firm_name: investor.firm_name } as any} />;
};

export default InvestorNewsSection; 