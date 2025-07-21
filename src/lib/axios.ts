import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken, triggerLogin } from "@/auth/auth0Client";
import { triggerWaitingApprovalModal } from "@/utils/waitingApprovalModalController.ts";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      triggerLogin();
    }

    if (error.response?.status === 456) {
      triggerWaitingApprovalModal();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
