
import { useState } from 'react';
import { CompanyType } from "@/types/company";

export function useCompanySelection() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const toggleCompanySelection = (id: string) => {
    setSelectedCompanies(prev => 
      prev.includes(id)
        ? prev.filter(companyId => companyId !== id)
        : [...prev, id]
    );
  };

  const toggleAllCompanies = (companies: CompanyType[]) => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(companies.map(company => company.id || ''));
    }
  };

  const isCompanySelected = (id: string | undefined) => id ? selectedCompanies.includes(id) : false;

  const toggleFavorite = (id: string, event: React.MouseEvent, companies: CompanyType[], setCompanies: React.Dispatch<React.SetStateAction<CompanyType[]>>) => {
    event.stopPropagation();
    setCompanies(prev => prev.map(company => 
      company.id === id ? { ...company, isFavorite: !company.isFavorite } : company
    ));
  };

  return {
    selectedCompanies,
    toggleCompanySelection,
    toggleAllCompanies,
    isCompanySelected,
    toggleFavorite
  };
}
