import apiClient from "@/lib/axios.ts";
import { FamilyOffice } from "@/services/familyOfficesService.ts";

export interface FamilyOfficeContactOtherFields {
  avatar_filename: string;
  family_office: string;
  office_tag: string;
}

export interface ExperienceData {
  title: string;
  order_in_profile: number;
  duration_months: number;
  company_name: string;
  company_id: string;
  company_industry: string;
  location?: string;
  date_from: string;
  department?: string;
  date_to: string;
  job_time_period?: string;
  company_logo_url?: string;
  description?: string;
}

export interface FamilyOfficeContact {
  contact_id: string;
  company_id: string;
  full_name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  notes: string;
  isFavorite: boolean;
  other_fields: FamilyOfficeContactOtherFields;
  avatar_filename: string;
  general_email?: string;
  office_phone?: string;
  location_country?: string;
  location_raw_address?: string;
  location_regions?: string[];
  description?: string;
  experience_data?: ExperienceData[];
  picture_url?: string;
}

export interface FamilyOfficeContactsResponse {
  data: FamilyOfficeContact[];
  metadata: {
    total: number;
    limit: number;
    offset: number;
    returned: number;
  };
}

export const fetchFamilyOfficesContactsById = async (
  id: string
): Promise<FamilyOfficeContact> => {
  try {
    const { data } = await apiClient.get<FamilyOfficeContact>(
      `family-offices-contacts/${id}`
    );

    return data;
  } catch (error) {
    if (error.response?.status === 455) {
      throw error;
    }

    new Error(error.message);
  }
};

export const fetchFullenrichByContactId = async (
  contactId: string,
  type: "email" | "phone"
) => {
  const response = await apiClient.post(
    `fullenrich/enrich?contact_id=${contactId}&type=${type}`
  );

  return response.data ?? [];
};

export const fetchPersonalContactById = async (
  contact_id: string,
  type: "email" | "phone"
): Promise<{ personal_email: string[]; personal_phone: string[] }> => {
  const response = await apiClient.get("/forager/personal-contacts", {
    params: { contact_id, type },
  });
  return response.data ?? [];
};

export const fetchFamilyOfficeContacts = async (
  params: Record<string, string> = {}
): Promise<FamilyOfficeContactsResponse> => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const url = `family-offices-contacts?${
    searchParams.toString() ? searchParams.toString() : ""
  }`;

  const response = await apiClient.get<FamilyOfficeContactsResponse>(url);

  return response.data;
};
