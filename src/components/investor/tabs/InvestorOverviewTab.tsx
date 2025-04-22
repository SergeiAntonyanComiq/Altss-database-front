import React from "react";
import { InvestorType } from "@/types/investor";
import { Globe, Mail, Phone, Linkedin, Twitter, Facebook, MapPin, Building, Calendar, Briefcase, Hash, Info } from "lucide-react";

interface Props { investor: InvestorType; }

const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2">{children}</h2>
);

const DataGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-[200px_auto] gap-x-8 gap-y-4 text-base">
    {children}
  </div>
);

const DataItem: React.FC<{ icon?: React.ReactNode, label: string, value?: string | null | number, link?: string, children?: React.ReactNode }> = ({ icon, label, value, link, children }) => {
  if (!value && !children) return null;
  return (
    <>
      <span className="flex items-center gap-2 text-gray-600 font-medium">
        {icon}
        {label}
      </span>
      {children ? (
        <div className="flex flex-col gap-1">{children}</div>
      ) : link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
          {value}
        </a>
      ) : (
        <span className="text-gray-800 break-words">{value}</span>
      )}
    </>
  );
};

const formatUrl = (url?: string | null) => {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `https://${url}`;
}

const InvestorOverviewTab: React.FC<Props> = ({ investor }) => {
  const fullAddress = [investor.address, investor.city, investor.state_county, investor.country, investor.zip_code]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-8 text-sm">
      {/* About section */}
      <section>
        <SectionTitle>About</SectionTitle>
        <DataGrid>
          <DataItem icon={<Building className="w-4 h-4" />} label="Investor type">
            {investor.firm_type && (
              <span className="bg-blue-100 text-blue-800 px-3 py-0.5 rounded-full text-sm w-fit">
                {investor.firm_type}
              </span>
            )}
          </DataItem>
          <DataItem icon={<Calendar className="w-4 h-4" />} label="Founded Year" value={investor.year_est} />
          <DataItem icon={<Hash className="w-4 h-4" />} label="AUM ($, mln)" value={investor.aum} />
          <DataItem icon={<Info className="w-4 h-4" />} label="Background" value={investor.background} />
          <DataItem icon={<Briefcase className="w-4 h-4" />} label="Employees" value={investor.employees} />
          <DataItem icon={<Hash className="w-4 h-4" />} label="Status" value={investor.status} />
          <DataItem icon={<Hash className="w-4 h-4" />} label="RIA" value={investor.ria} />
          <DataItem icon={<Hash className="w-4 h-4" />} label="General Consultant" value={investor.general_consultant} />
          <DataItem icon={<Hash className="w-4 h-4" />} label="Latest Fund Name" value={investor.latest_fund_name} />
        </DataGrid>
      </section>

      {/* Location section */}
      <section>
        <SectionTitle>Location</SectionTitle>
        <DataGrid>
          <DataItem icon={<MapPin className="w-4 h-4" />} label="Primary HQ" value={fullAddress || "-"} />
          <DataItem icon={<MapPin className="w-4 h-4" />} label="Secondary Locations" value={investor.secondary_locations} />
        </DataGrid>
      </section>

      {/* Contacts section */}
      <section>
        <SectionTitle>Contacts</SectionTitle>
        <DataGrid>
          <DataItem icon={<Globe className="w-4 h-4" />} label="Website" value={investor.website} link={formatUrl(investor.website)} />
          <DataItem icon={<Mail className="w-4 h-4" />} label="Work Emails" value={investor.email} />
          <DataItem icon={<Phone className="w-4 h-4" />} label="Phone number" value={investor.tel} />
          <DataItem icon={<Phone className="w-4 h-4" />} label="Fax" value={investor.fax} />
          <DataItem icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" value={investor.linkedin_url} link={formatUrl(investor.linkedin_url)} />
          <DataItem icon={<Twitter className="w-4 h-4" />} label="X (Twitter)" value={investor.twitter_url} link={formatUrl(investor.twitter_url)} />
          <DataItem icon={<Facebook className="w-4 h-4" />} label="Facebook" value={investor.facebook_url} link={formatUrl(investor.facebook_url)} />
        </DataGrid>
      </section>
    </div>
  );
};

export default InvestorOverviewTab; 