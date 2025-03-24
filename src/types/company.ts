
export interface CompanyType {
  id: string;
  name: string;
  type: string;
  description?: string;
  website?: string;
  industry?: string;
  founded?: string;
  headquarters?: string;
  location: string;
  phone?: string;
  email?: string;
  logo?: string;
  employees: number;
  revenue: string;
  status: string;
  team?: string[];
  aum?: number;
  foundedYear?: string;
  isFavorite?: boolean;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  contactPerson?: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
}
