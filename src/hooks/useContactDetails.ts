import { useState, useCallback, useEffect } from "react";
import {
  enrichWorkDetails,
  getPersonalDetails,
} from "@/utils/contactDetailsUtils";
import { LimitErrorType } from "@/services/usersService.ts";

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

  const [limitErrorType, setLimitErrorType] = useState<LimitErrorType | null>(
    null
  );

  const loadWorkDetails = useCallback(
    async (type: "email" | "phone") => {
      setLoading((prev) => ({ ...prev, [type]: true }));
      await enrichWorkDetails(contact_id, setEmail, setPhone, type, (type) =>
        setLimitErrorType(type)
      );
      setShow((prev) => ({ ...prev, [type]: true }));
      setLoading((prev) => ({ ...prev, [type]: false }));
    },
    [contact_id]
  );

  const loadPersonalDetails = useCallback(
    async (type: "personalEmail" | "personalPhone") => {
      setLoading((prev) => ({ ...prev, [type]: true }));

      await getPersonalDetails(
        contact_id,
        setPersonalEmail,
        setPersonalPhone,
        type === "personalEmail" ? "email" : "phone",
        (type) => setLimitErrorType(type)
      );
      setShow((prev) => ({ ...prev, [type]: true }));
      setLoading((prev) => ({ ...prev, [type]: false }));
    },
    [contact_id]
  );

  useEffect(() => {
    setShow((prevState) => ({
      email: prevState.email && limitErrorType !== LimitErrorType.WORK_EMAIL,
      phone: prevState.phone && limitErrorType !== LimitErrorType.WORK_PHONE,
      personalEmail:
        prevState.personalEmail &&
        limitErrorType !== LimitErrorType.PERSONAL_EMAIL,
      personalPhone:
        prevState.personalPhone &&
        limitErrorType !== LimitErrorType.PERSONAL_PHONE,
    }));
  }, [limitErrorType]);

  return {
    workEmails: email,
    workPhones: phone,
    personalEmail,
    personalPhone,
    limitErrorType,
    setLimitErrorType,
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
