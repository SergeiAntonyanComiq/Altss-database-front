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
    "manager_maturity_preference",
  ];

  focusFields.forEach((field) => {
    if (!transformedData[field]) {
      transformedData[field] = {};
    }

    const fieldData = transformedData[field];

    Object.keys(fieldData).forEach((key) => {
      const value = fieldData[key];

      if (typeof value === "string") {
        fieldData[key] = value.split(",").map((item) => item.trim());
      }

      if (Array.isArray(fieldData[key])) {
        fieldData[key] = fieldData[key].filter((item) => item.trim() !== "");
        if (fieldData[key].length === 0) {
          delete fieldData[key];
        }
      }
    });

    if (Object.keys(fieldData).length === 0) {
      delete transformedData[field];
    }
  });

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
        range.min = parseFloat(range.min);
      }
      if (typeof range.max === "string") {
        range.max = parseFloat(range.max);
      }

      // Remove range field if both min and max are undefined/null/NaN
      const isEmpty =
        (range.min === undefined || isNaN(range.min)) &&
        (range.max === undefined || isNaN(range.max));
      if (isEmpty) {
        delete transformedData[field];
      }
    }
  });

  const flatObjectFields = ["emerging_manager_lp"];

  flatObjectFields.forEach((field) => {
    const obj = transformedData[field];
    if (
      obj &&
      typeof obj === "object" &&
      Object.values(obj).every((v) => v === "")
    ) {
      delete transformedData[field];
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
