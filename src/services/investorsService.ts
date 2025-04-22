import { InvestorType } from "@/types/investor";

const BASE_URL = "https://altss.azurewebsites.net/api/investors?code=E8kuF1EHQtKtyg3ds9odDSRroXwflBC6gZt4zlpnJKWPAzFuUFsZ1g==";

export async function fetchInvestorById(id: string): Promise<InvestorType | null> {
  try {
    const url = `${BASE_URL}&firm_id=${encodeURIComponent(id)}&limit=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data: InvestorType[] = json.data || [];
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Error fetching investor", err);
    return null;
  }
} 