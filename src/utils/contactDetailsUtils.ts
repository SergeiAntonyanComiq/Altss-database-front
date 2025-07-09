import {
  fetchFullenrichByContactId,
  fetchPersonalContactById,
} from "@/services/familyOfficeContactsService";
import { LimitErrorType } from "@/services/usersService.ts";

export const enrichWorkDetails = async (
  contact_id: string,
  setEmail: (v: string[]) => void,
  setPhone: (v: string[]) => void,
  type: "email" | "phone",
  onLimitError?: (type: LimitErrorType) => void
) => {
  try {
    const result = await fetchFullenrichByContactId(contact_id, type);
    if (result) {
      if (type === "email") {
        setEmail(result.work_email ?? []);
      } else {
        setPhone(result.work_phone ?? []);
      }
    }
  } catch (error) {
    onLimitError?.(error.response?.data.type);
  }
};

export const getPersonalDetails = async (
  contact_id: string,
  setPersonalEmail: (v: string[]) => void,
  setPersonalPhone: (v: string[]) => void,
  type: "email" | "phone",
  onLimitError?: (type: LimitErrorType) => void
) => {
  try {
    const result = await fetchPersonalContactById(contact_id, type);
    if (result) {
      if (type === "email") {
        setPersonalEmail(result.personal_email ?? []);
      } else {
        setPersonalPhone(result.personal_phone ?? []);
      }
    }
  } catch (error) {
    if (error.response?.status === 455) {
      onLimitError?.(error.response?.data.type);
    } else {
      throw new Error(error);
    }
  }
};
