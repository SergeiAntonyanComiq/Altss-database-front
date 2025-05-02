import { useEffect, useState } from "react";
import axios from "axios";
import { FamilyOfficeContact } from "@/components/familyofficescontacts/FamilyOfficesContactsList";

interface UseFamilyOfficesContactsDataResult {
  contacts: FamilyOfficeContact[] | null;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
}

export function useFamilyOfficesContactsData(
  currentPage: number,
  itemsPerPage: number
): UseFamilyOfficesContactsDataResult {
  const [contacts, setContacts] = useState<FamilyOfficeContact[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchContacts = async () => {
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const url = `https://altss.azurewebsites.net/api/familyofficescontacts?code=fNUrumNSDEUYQh-R_E76Zr5W2Yg869Wsp7J0rXGRmqbDAzFuYgolFw==&limit=${itemsPerPage}&offset=${offset}`;
        const response = await axios.get(url);
        // The API returns { data: [...], metadata: {...} }
        const apiData = response.data as { data: FamilyOfficeContact[]; metadata: { total: number } };
        setContacts(apiData.data);
        setTotalItems(apiData.metadata?.total || 0);
        setTotalPages(apiData.metadata?.total ? Math.ceil(apiData.metadata.total / itemsPerPage) : 1);
      } catch (err: any) {
        setError(err.message || "Failed to fetch contacts");
        setContacts(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [currentPage, itemsPerPage]);

  return { contacts, isLoading, error, totalPages, totalItems };
}
