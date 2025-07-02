export interface ContactType {
  id: string;
  firm_id: number;
  contact_id: number;
  investor: string;
  firm_type: string;
  title: string;
  name: string;
  alternative_name: string;
  role: string;
  job_title: string;
  asset_class: string;
  email: string;
  tel: string;
  city: string;
  state: string;
  country_territory: string;
  zip_code: string;
  linkedin: string;
  twitter?: string;
  sec_registration?: string;
  favorite?: boolean;
  logo_filename?: string;
  logo?: string;
  itemType?: string;
}
