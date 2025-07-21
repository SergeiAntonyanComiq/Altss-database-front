import {
  Deals,
  InvestmentFocusResponse,
  TeamMember,
} from "@/services/familyOfficesService.ts";
import { GroupedTeamFormValues } from "@/services/integrationService.ts";

export const prepareFocusForSave = (data: InvestmentFocusResponse) => {
  const transformedData = { ...data };

  const focusFields = [
    "company_types",
    "technological_focuses",
    "industry_focuses",
    "regional_focuses",
  ];

  if (transformedData.company_types) {
    focusFields?.forEach((field) => {
      if (!transformedData[field]) {
        transformedData[field] = {};
      }

      Object.keys(transformedData[field]).forEach((key) => {
        const value = transformedData[field][key];
        if (typeof value === "string") {
          transformedData[field][key] = value
            .split(",")
            .map((item) => item.trim());
        }
      });
    });
  }
  if (typeof transformedData.philanthropic_themes === "string") {
    transformedData.philanthropic_themes = (
      transformedData.philanthropic_themes as string
    )
      .split(",")
      .map((item) => item.trim());
  }

  const rangeFields = [
    "ticket_size_musd",
    "preferred_fund_size_musd",
    "investment_horizon_yrs",
  ];

  rangeFields.forEach((field) => {
    const range = transformedData[field];
    if (range) {
      if (typeof range.min === "string") {
        transformedData[field].min = parseFloat(range.min);
      }
      if (typeof range.max === "string") {
        transformedData[field].max = parseFloat(range.max);
      }
    }
  });

  return transformedData;
};

export const prepareDefaultDeals = (deals: Deals[]) =>
  deals
    ? deals.map((item) => ({
        ...item,
        partner_name:
          Array.isArray(item.partner_name) && item.partner_name.length
            ? item.partner_name.join(", ")
            : item.partner_name ?? "No Investments",
      }))
    : [];

export const prepareDealsForSave = (deals: Deals[]) =>
  deals.map((item) => ({
    ...item,
    partner_name: item.partner_name.toString().split(","),
  })) ?? [];

export const prepareGroupedTeam = (
  groupedTeam: Record<string, TeamMember[]> | undefined | null
) => {
  if (!groupedTeam) {
    return [];
  }

  return Object.keys(groupedTeam).map((groupKey) => ({
    key: groupKey,
    ids: groupedTeam[groupKey].map((contact) => contact.contact_id),
  }));
};

export const prepareGroupedDataForSave = (data: GroupedTeamFormValues[]) => {
  const result: Record<string, { contact_id: string }[]> = {};

  data.forEach((item) => {
    const { key, ids } = item;

    if (!result[key]) {
      result[key] = [];
    }

    const contacts = ids.map((id) => ({ contact_id: id }));
    result[key] = [...result[key], ...contacts];
  });

  return result;
};
