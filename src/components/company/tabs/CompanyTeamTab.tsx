
import React, { useState, useEffect } from "react";
import { CompanyType } from "@/types/company";
import { ContactType } from "@/types/contact";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CompanyTeamTabProps {
  company: CompanyType;
}

const getAvatarFallback = (name: string) => {
  const nameParts = name.split(' ');
  return nameParts[0]?.charAt(0) + (nameParts[1]?.charAt(0) || '');
};

const CompanyTeamTab: React.FC<CompanyTeamTabProps> = ({ company }) => {
  const [teamMembers, setTeamMembers] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!company.id) {
        setError("Company ID not available");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching team members for company ID:", company.id);
        
        const response = await fetch("https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firm_id: parseInt(company.id)
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch team members: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Team members fetched:", data);
        setTeamMembers(data);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Failed to load team members. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, [company.id]);

  // Find primary contact (assuming it's the first one with a specific role or just the first one)
  const primaryContact = teamMembers.length > 0 ? teamMembers[0] : null;
  const otherMembers = teamMembers.length > 1 ? teamMembers.slice(1) : [];

  if (isLoading) {
    return <TeamLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Contact</h3>
        {primaryContact ? (
          <TeamMemberCard contact={primaryContact} isPrimary={true} />
        ) : (
          <p className="text-sm text-gray-500">No primary contact information available.</p>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
        
        {otherMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherMembers.map((member) => (
              <TeamMemberCard key={member.id} contact={member} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No additional team members information available.</p>
        )}
      </div>
    </div>
  );
};

interface TeamMemberCardProps {
  contact: ContactType;
  isPrimary?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ contact, isPrimary = false }) => {
  return (
    <div className={`flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-white ${isPrimary ? 'border-blue-300 shadow-sm' : ''}`}>
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage 
          src="/lovable-uploads/fed0ab22-4812-4812-9ed8-1094621576ed.png" 
          alt={contact.name} 
        />
        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
          {getAvatarFallback(contact.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <Link to={`/profile/${contact.contact_id}`} className="font-medium text-blue-600 hover:underline">
              {contact.title} {contact.name}
            </Link>
            {isPrimary && (
              <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                Primary
              </Badge>
            )}
            <p className="text-sm text-gray-500">{contact.job_title || contact.role}</p>
          </div>
        </div>
        
        {contact.asset_class && (
          <div className="mt-2 flex flex-wrap gap-1">
            {contact.asset_class.split(',').map((asset, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100"
              >
                {asset.trim()}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-2 text-sm text-gray-600">
          {contact.email && <p className="truncate">{contact.email}</p>}
          {contact.tel && <p>{contact.tel}</p>}
        </div>
      </div>
    </div>
  );
};

const TeamLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Contact</h3>
        <div className="flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTeamTab;
