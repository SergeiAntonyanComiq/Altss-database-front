import { useState, useCallback } from "react";
import {
  enrichWorkDetails,
  getPersonalDetails,
} from "@/utils/contactDetailsUtils";

export const useContactDetails = (contact_id: string) => {
  const [email, setEmail] = useState<Array<string>>([]);
  const [phone, setPhone] = useState<Array<string>>([]);
  const [personalEmail, setPersonalEmail] = useState<Array<string>>([]);
  const [personalPhone, setPersonalPhone] = useState<Array<string>>([]);
  const [show, setShow] = useState({
    email: false,
    phone: false,
    personalEmail: false,
    personalPhone: false,
  });
  const [loading, setLoading] = useState({
    email: false,
    phone: false,
    personalEmail: false,
    personalPhone: false,
  });

  const loadWorkDetails = useCallback(
    async (type: "email" | "phone") => {
      setLoading((prev) => ({ ...prev, [type]: true }));
      await enrichWorkDetails(contact_id, setEmail, setPhone);
      setShow((prev) => ({ ...prev, [type]: true }));
      setLoading((prev) => ({ ...prev, [type]: false }));
    },
    [contact_id]
  );

  const loadPersonalDetails = useCallback(
    async (type: "personalEmail" | "personalPhone") => {
      setLoading((prev) => ({ ...prev, [type]: true }));
      await getPersonalDetails(contact_id, setPersonalEmail, setPersonalPhone);
      setShow((prev) => ({ ...prev, [type]: true }));
      setLoading((prev) => ({ ...prev, [type]: false }));
    },
    [contact_id]
  );

  return {
    workEmails: email,
    workPhones: phone,
    personalEmail,
    personalPhone,
    isEmailsLoading: loading.email,
    isPhoneLoading: loading.phone,
    isPersonalPhoneLoading: loading.personalPhone,
    isPersonalEmailLoading: loading.personalEmail,
    showEmail: show.email,
    showPhone: show.phone,
    showPersonalEmail: show.personalEmail,
    showPersonalPhone: show.personalPhone,
    handleShowWorkDetails: loadWorkDetails,
    handleShowPersonalDetails: loadPersonalDetails,
  };
};
