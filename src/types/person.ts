export interface PersonType {
  id: string;
  name: string;
  favorite: boolean;
  responsibilities: string[];
  linkedin: string;
  linkedinHandle?: string;
  location: string;
  companies: string[];
  profileImage?: string;
  shortBio?: string;
  currentPosition?: string;
  jobHistory?: string;
  news?: string;
  lastUpdate?: string;
  email?: string; // Adding email property
  phone?: string; // Adding phone property
}
