import {
  fetchFullenrichByContactId,
  fetchPersonalContactById,
} from "@/services/familyOfficeContactsService";

export const enrichWorkDetails = async (
  contact_id: string,
  setEmail: (v: string[]) => void,
  setPhone: (v: string[]) => void
) => {
  const result = await fetchFullenrichByContactId(contact_id);
  if (result) {
    setEmail(result.work_email ?? []);
    setPhone(result.work_phone ?? []);
  }
};

export const getPersonalDetails = async (
  contact_id: string,
  setPersonalEmail: (v: string[]) => void,
  setPersonalPhone: (v: string[]) => void
) => {
  const result = await fetchPersonalContactById(contact_id);
  if (result) {
    setPersonalEmail(result.personal_email ?? []);
    setPersonalPhone(result.personal_phone ?? []);
  }
};
