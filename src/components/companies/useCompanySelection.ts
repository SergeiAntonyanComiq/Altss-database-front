import { useState, useCallback } from "react";
import { CompanyType } from "@/types/company";
import { toast } from "@/components/ui/use-toast";

export function useCompanySelection() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const toggleCompanySelection = (id: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(id)
        ? prev.filter((companyId) => companyId !== id)
        : [...prev, id]
    );
  };

  const toggleAllCompanies = (companies: CompanyType[]) => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(companies.map((company) => company.id || ""));
    }
  };

  const isCompanySelected = (id: string | undefined) =>
    id ? selectedCompanies.includes(id) : false;

  const toggleFavorite = useCallback(
    async (id: string, companies: CompanyType[], updateCompany: () => void) => {
      const company = companies.find((c) => c.id === id);
      if (!company) return;

      const isCurrentlyFavorite = company.isFavorite;

      updateCompany();

      try {
        if (isCurrentlyFavorite) {
          toast({
            title: "Removed from favorites",
            description: `${
              company.name || company.firm_name
            } has been removed from your favorites`,
          });
        } else {
          const companyId =
            typeof company.firm_id === "string"
              ? parseInt(company.firm_id, 10)
              : company.firm_id;
          if (isNaN(companyId)) {
            toast({
              title: "Error",
              description: "Invalid company ID",
              variant: "destructive",
            });
            return;
          }

          toast({
            title: "Added to favorites",
            description: `${
              company.name || company.firm_name
            } has been added to your favorites`,
          });
        }

        // Dispatch event to update sidebar
        const event = new CustomEvent("favoritesUpdated");
        window.dispatchEvent(event);
      } catch (error) {
        console.error("Error toggling favorite:", error);
        toast({
          title: "Error",
          description: "There was a problem updating your favorites",
          variant: "destructive",
        });
        // Revert optimistic update
        updateCompany();
      }
    },
    []
  );

  return {
    selectedCompanies,
    toggleCompanySelection,
    toggleAllCompanies,
    isCompanySelected,
    toggleFavorite,
  };
}
