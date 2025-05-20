import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompaniesError from "./CompaniesError";
import { useCompaniesData } from "@/hooks/useCompaniesData";
import { useCompanySelection } from "./useCompanySelection";
import { useToast } from "@/components/ui/use-toast";
import CustomPagination from "@/components/ui/CustomPagination.tsx";
import { companiesColumns } from "@/components/columns-bucket";

import { DataTable } from "@/components/ui/DataTable.tsx";
import { Loading } from "@/utils.tsx";

interface CompaniesListProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  filterId?: string | null;
}

const CompaniesList = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  filterId,
}: CompaniesListProps) => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFilter = async () => {
      if (!filterId) return;

      const currentUrl = new URL(window.location.href);
      const searchParams = new URLSearchParams(currentUrl.search);
      if (searchParams.has("filter")) {
        searchParams.delete("filter");
        navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
          replace: true,
        });
      }
    };

    (async () => {
      await loadFilter();
    })();
  }, [filterId, toast, navigate, onPageChange]);

  const { companies, isLoading, error, totalPages, totalItems } =
    useCompaniesData(currentPage, itemsPerPage, "");

  const { toggleCompanySelection, toggleAllCompanies, toggleFavorite } =
    useCompanySelection();

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

    toggleFavorite(id, companies, () => {
      const updatedCompanies = companies.map((company) =>
        company.id === id
          ? { ...company, isFavorite: !company.isFavorite }
          : company
      );
      if (updatedCompanies.some((c) => c.id === id)) {
        companies.splice(0, companies.length, ...updatedCompanies);
      }
    });
  };

  useEffect(() => {
    if (companies) {
      const initialFavorites: Record<number, boolean> = {};
      companies.forEach((fo) => {
        initialFavorites[fo.id] = fo.isFavorite;
      });

      setFavorites(initialFavorites);
    }
  }, [companies]);

  return (
    <>
      <div className="bg-[#FEFEFE] w-full min-h-screen flex flex-col py-8 px-4 md:px-6 lg:px-8">
        <Loading show={isLoading} />
        <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
          Companies
        </h1>

        <div className="flex-grow mt-8">
          {error ? (
            <CompaniesError errorMessage={error} />
          ) : (
            <DataTable
              columns={companiesColumns(
                favorites,
                handleToggleFavorite,
                toggleAllCompanies,
                toggleCompanySelection
              )}
              data={companies}
            />
          )}
        </div>

        <div className="mt-6">
          <CustomPagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            totalItems={totalItems}
            disabled={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default CompaniesList;
