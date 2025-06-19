import React, { useEffect, useState } from "react";
import { EmptyDetailsPage, FieldsRenderer } from "@/components/common";
import {
  fetchInvestmentFocus,
  InvestmentFocusResponse,
} from "@/services/familyOfficesService.ts";
import { Loading } from "@/utils.tsx";

export const InvestmentFocus = ({ id }: { id: string }) => {
  const [focus, setFocus] = useState<InvestmentFocusResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInvestmentFocus(id);

        setFocus(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await fetchData();
    })();
  }, [id]);

  if (!focus && !isLoading) {
    return <EmptyDetailsPage pageName={"Investment Focus"} />;
  }

  const investmentFields = [
    { label: "Company type", value: focus?.company_type },
    { label: "Geo Focus", value: focus?.regional_focus },
    { label: "Technology & Vertical", value: focus?.technological_focus },
    { label: "Industries", value: focus?.industry_focus },
  ];

  return (
    <div className="mb-6">
      <Loading show={isLoading} />
      <h2 className="font-semibold text-xl py-2 mb-2">Focus</h2>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="flex space-x-[120px]">
        <div className="space-y-[24px]">
          {investmentFields
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer key={f.label} label={f.label} />
            ))}
        </div>
        <div className="space-y-[24px]">
          {investmentFields
            .filter((f) => f.value)
            .map((f) => (
              <FieldsRenderer
                key={f.label}
                value={f.value}
                modalHeader={f.label}
                isBadge={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
