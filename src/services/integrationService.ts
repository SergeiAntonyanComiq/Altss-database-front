import apiClient from "@/lib/axios.ts";
import { Deals, InvestmentFocusResponse } from "./familyOfficesService.ts";

export interface IntegrationOfficesList {
  company_id: string;
  firm_name: string;
}

export interface IntegrationOffice {
  company_id: string;
  firm_name: string;
  firm_type: string;
  city: string;
  country: string;
  region?: string | null;
  aum?: string | number | null;
  year_founded?: string | number | null;
  website: string;
  linkedin_url: string;
  twitter_url: string;
  description: string;
  logo: string;
  deals?: Deals[];
  investment_focus?: InvestmentFocusResponse;
}

export interface IntegrationOfficesResponse {
  data: IntegrationOfficesList[];
  metadata: {
    total: number;
    limit: number;
    offset: number;
    returned: number;
  };
}

export const fetchIntegrationOfficeList = async (
  params: Record<string, string> = {}
): Promise<IntegrationOfficesResponse> => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const url = `companies/list?${
    searchParams.toString() ? searchParams.toString() : ""
  }`;

  const response = await apiClient.get<IntegrationOfficesResponse>(url);

  const data = response.data.data;

  return {
    data,
    metadata: response.data.metadata,
  };
};

export const fetchIntegrationOfficeById = async (
  id: string
): Promise<IntegrationOffice> => {
  try {
    const { data } = await apiClient.get<IntegrationOffice>(`companies/${id}`);

    return data;
  } catch (error) {
    new Error(error.message);
  }
};

export const deleteIntegrationOfficeById = async (
  id: string
): Promise<void> => {
  try {
    await apiClient.delete(`companies/${id}`);
  } catch (error) {
    throw new Error(error.message || "Failed to delete integration office");
  }
};

export const addNewOffice = async (
  officeData: Omit<IntegrationOffice, "company_id">
): Promise<void> => {
  try {
    await apiClient.post(`/companies`, officeData);
  } catch (error) {
    throw new Error(error.message || "Failed to create new integration office");
  }
};

export const updateOffice = async (
  id: string,
  officeData: Omit<IntegrationOffice, "company_id">
): Promise<void> => {
  try {
    await apiClient.patch(`/companies/${id}`, officeData);
  } catch (error) {
    throw new Error(error.message || "Failed to create new integration office");
  }
};
