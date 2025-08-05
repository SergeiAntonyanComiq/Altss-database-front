import apiClient from "@/lib/axios.ts";

export interface FamilyOffice {
  company_id: string;
  firm_name: string;
  firm_type: string[];
  isFavorite: boolean;
  city: string;
  country: string;
  region: string;
  aum: string;
  year_founded: string;
  last_updated: string;
  logo_filename: string;
  wealth_creator?: string;
  industry_wealth_origin?: string;
  sec_registered?: string;
  office_phone?: string;
  website?: string;
  general_email?: string;
  twitter_url?: string;
  linkedin?: string;
  linkedin_url?: string;
  websites_linkedin?: string;
  websites_linkedin_canonical?: string;
  geographic_focus?: string;
  emerging_markets?: string;
  allocation_preferences?: string;
  investor_profile?: string;
  industry?: string;
  technologies?: string;
  description?: string;
  websites_main?: string;
  websites_main_original?: string;
  logo?: string;
}

export interface FamilyOfficesResponse {
  data: FamilyOffice[];
  metadata: {
    total: number;
    limit: number;
    offset: number;
    returned: number;
  };
}

export interface FocusData {
  Confirmed?: string[];
  Pipeline?: string[];
  Indicated?: string[];
  Negative?: string[];
}

export interface RangeData {
  min: number;
  max: number;
}

export interface InvestmentFocusResponse {
  company_types: FocusData;
  technological_focuses: FocusData;
  industry_focuses: FocusData;
  regional_focuses: FocusData;
  ticket_size_musd?: RangeData;
  preferred_fund_size_musd?: RangeData;
  investment_horizon_yrs?: RangeData;
  philanthropic_themes?: string[];
}

export interface Deals {
  role: string;
  type: string;
  notes: string;
  currency: string;
  deal_amount: number;
  partner_name: string | string[];
  investment_date: string;
}

export interface TeamMember {
  contact_id: string;
  full_name: string;
  title: string;
  picture: string;
}

export interface PrimaryContact {
  contact_id: string;
  full_name: string;
  title: string;
  picture: string;
  work_emails: string[];
}

export interface GroupedTeam {
  [group: string]: TeamMember[];
}

export interface FamilyOfficeTeamResponse {
  groupedTeam: GroupedTeam;
  primaryContact: PrimaryContact;
}

export const fetchFamilyOfficeTeam = async (
  id: string
): Promise<FamilyOfficeTeamResponse> => {
  try {
    const { data } = await apiClient.get<FamilyOfficeTeamResponse>(
      `family-offices/${id}/team`
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchInvestmentFocus = async (
  id: string
): Promise<InvestmentFocusResponse> => {
  try {
    const { data } = await apiClient.get<{
      investment_focus: InvestmentFocusResponse;
    }>(`family-offices/${id}/investment-focus`);
    return {
      ...data.investment_focus,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchDeals = async (id: string): Promise<Deals[]> => {
  try {
    const { data } = await apiClient.get<{ deals: Deals[] }>(
      `family-offices/${id}/deals`
    );

    return data.deals;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchFamilyOfficesById = async (
  id: string
): Promise<FamilyOffice> => {
  try {
    const { data } = await apiClient.get<FamilyOffice>(`family-offices/${id}`);

    return {
      ...data,
      firm_type: Array.isArray(data.firm_type)
        ? data.firm_type
        : [data.firm_type],
    };
  } catch (error) {
    new Error(error.message);
  }
};

export const fetchFamilyOffices = async (
  params: Record<string, string> = {}
): Promise<FamilyOfficesResponse> => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const url = `family-offices?${
    searchParams.toString() ? searchParams.toString() : ""
  }`;

  const response = await apiClient.get<FamilyOfficesResponse>(url);

  const data = response.data.data.map((item) => ({
    ...item,
    firm_type: Array.isArray(item.firm_type)
      ? item.firm_type
      : [item.firm_type],
  }));

  return {
    data,
    metadata: response.data.metadata,
  };
};
