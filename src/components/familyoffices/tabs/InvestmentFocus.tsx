import React, { useEffect, useState } from "react";
import { EmptyDetailsPage } from "@/components/common";
import {
  fetchInvestmentFocus,
  FocusData,
  InvestmentFocusResponse,
} from "@/services/familyOfficesService.ts";
import { Loading } from "@/utils.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { withTooltipRenderer } from "@/components/ui/withTooltipRenderer.tsx";

const FocusSection = ({ label, data }: { label: string; data: FocusData }) => (
  <>
    <div className="font-semibold text-lg mb-4">{label}</div>
    {Object.keys(data)
      .reverse()
      .map((key) => {
        const values = data[key];

        if (values.length > 0) {
          return (
            <div key={key} className="mb-4">
              <div className="font-medium text-md mb-2">{key}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {values.map((value) =>
                  withTooltipRenderer(
                    <Badge
                      key={value}
                      variant="default"
                      className="flex items-center justify-center"
                    >
                      {value}
                    </Badge>,
                    value
                  )
                )}
              </div>
            </div>
          );
        }
        return null;
      })}
    <hr className="border-t border-gray-200 my-4" />
  </>
);

export const InvestmentFocus = ({ id }: { id: string }) => {
  const [focus, setFocus] = useState<InvestmentFocusResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInvestmentFocus(id);
        const hasAnyData = Object.values(data).some((value) => {
          if (Array.isArray(value)) return value?.length > 0;
          return value !== null && value !== undefined;
        });
        setFocus(hasAnyData ? data : null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!focus && !isLoading) {
    return <EmptyDetailsPage pageName={"Investment Focus"} />;
  }

  return (
    <div className="mb-6">
      <Loading show={isLoading} />
      <h2 className="font-semibold text-2xl py-2 mb-2">Focus</h2>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="flex flex-col">
        {focus?.company_types && (
          <FocusSection label="Company Type" data={focus?.company_types} />
        )}
        {focus?.technological_focuses && (
          <FocusSection
            label="Technological Focuses"
            data={focus?.technological_focuses}
          />
        )}
        {focus?.industry_focuses && (
          <FocusSection
            label="Industry Focuses"
            data={focus?.industry_focuses}
          />
        )}
        {focus?.regional_focuses && (
          <FocusSection
            label="Regional Focuses"
            data={focus?.regional_focuses}
          />
        )}
        {focus?.manager_maturity_preference && (
          <FocusSection
            label="Manager Maturity Preference"
            data={focus?.manager_maturity_preference}
          />
        )}

        {focus?.emerging_manager_lp && (
          <>
            <div className="font-semibold text-lg mb-4">Emerging Manager</div>
            <div className="mb-4">
              <div className="font-medium text-md mb-2">
                {focus?.emerging_manager_lp?.confidence}
              </div>
              <div className="text-md mb-2">
                {focus?.emerging_manager_lp?.notes}
              </div>
            </div>
            <hr className="border-t border-gray-200 my-4" />
          </>
        )}

        {focus?.ticket_size_musd && (
          <>
            <div className="flex space-x-8 items-center">
              <div className="font-semibold text-lg">Ticket Size</div>
              <div className="">
                <div>
                  {`$${focus.ticket_size_musd.min}M - $${focus.ticket_size_musd.max}M`}
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200 my-4" />
          </>
        )}
        {focus?.preferred_fund_size_musd && (
          <>
            <div className="flex space-x-8 items-center">
              <div className="font-semibold text-lg">Preferred Fund Size</div>
              <div className="">
                <div>
                  {`$${focus.preferred_fund_size_musd.min}M - $${focus.preferred_fund_size_musd.max}M`}
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200 my-4" />
          </>
        )}
        {focus?.investment_horizon_yrs && (
          <>
            <div className="flex space-x-8 items-center">
              <div className="font-semibold text-lg">
                Investment Horizontal Years
              </div>
              <div className="">
                <div>
                  {`${focus.investment_horizon_yrs.min}Y - ${focus.investment_horizon_yrs.max}Y`}
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200 my-4" />
          </>
        )}
        {focus?.philanthropic_themes && (
          <>
            <div className="font-semibold text-lg mb-4">
              Philanthropic Themes
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {focus.philanthropic_themes.map((theme) => (
                <Badge
                  key={theme}
                  variant="default"
                  className="flex items-center justify-center"
                >
                  {theme}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
