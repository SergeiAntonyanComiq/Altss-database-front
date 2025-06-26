import apiClient from "@/lib/axios.ts";

export type UserStatus = "active" | "pending" | "blocked";
export type UserPlan = "admin" | "trial" | "paid" | "expired";

export interface User {
  user_id: string;
  full_name: string;
  email: string;
  plan: UserPlan;
  status: UserStatus;
  sign_up_date: Date;
}

export enum LimitErrorType {
  PERSONAL_PHONE = "personal_phones_limit",
  PERSONAL_EMAIL = "personal_emails_limit",
  WORK_PHONE = "business_phones_limit",
  WORK_EMAIL = "business_emails_limit",
}

export const fetchUsers = async (
  params: Record<string, string | number | undefined>
) => {
  const response = await apiClient.get("/users", { params });
  return response.data;
};

export const registerUser = async (fullName: string, email: string) => {
  try {
    const response = await apiClient.post("/users/register", null, {
      params: {
        full_name: fullName,
        email,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserStatus = async () => {
  try {
    const response = await apiClient.get("/users/status");

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserPlan = async (id: string, plan: string) => {
  try {
    const response = await apiClient.patch(`/users/${id}/plan`, null, {
      params: {
        plan,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserStatus = async (id: string, status: string) => {
  try {
    const response = await apiClient.patch(`/users/${id}/status`, null, {
      params: {
        status,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
