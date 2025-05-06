import { useEffect, useState } from "react";

export interface Investor {
  firm_id: string;
  firm_name: string;
  firm_type: string[];
  city?: string;
  country?: string;
  region?: string;
  aum?: string;
  funds_count?: string;
  year_est?: string;
  website?: string;
}

interface Filters {
  firmName?: string;
  firmType?: string;
  firmTypes?: string[];
  city?: string;
  country?: string;
  region?: string;
}

interface InvestorsDataResult {
  investors: Investor[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
}

export function useInvestorsData(
  currentPage: number,
  itemsPerPage: number,
  searchQuery: string,
  filters: Filters,
): InvestorsDataResult {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchInvestors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.append("limit", itemsPerPage.toString());
        params.append("offset", ((currentPage - 1) * itemsPerPage).toString());
        if (searchQuery) params.append("firm_name", searchQuery);
        if (Array.isArray(filters.firmTypes) && filters.firmTypes.length > 0) {
          params.append("firm_type", filters.firmTypes.join(","));
        } else if (filters.firmType) {
          params.append("firm_type", filters.firmType);
        }
        if (filters.firmName) params.append("firm_name", filters.firmName);
        if (filters.city) params.append("city", filters.city);
        if (filters.country) params.append("country", filters.country);
        if (filters.region) params.append("region", filters.region);

        const url =
          "https://altss.azurewebsites.net/api/investors?code=E8kuF1EHQtKtyg3ds9odDSRroXwflBC6gZt4zlpnJKWPAzFuUFsZ1g==&" +
          params.toString();

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Error fetching investors: ${res.statusText}`);
        }
        const json = await res.json();
        const data: Investor[] = json.data || [];
        const metadata = json.metadata || { total: data.length };
        setInvestors(
          data.map((item) => ({
            ...item,
            firm_type: Array.isArray(item.firm_type)
              ? item.firm_type
              : [item.firm_type],
          })),
        );
        setTotalItems(metadata.total || data.length);
        setTotalPages(
          Math.ceil((metadata.total || data.length) / itemsPerPage),
        );
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestors();
  }, [currentPage, itemsPerPage, searchQuery, filters]);

  return { investors, isLoading, error, totalPages, totalItems };
}
