
import React from "react";
import { CompanyType } from "@/types/company";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import TeamMemberCard from "../team/TeamMemberCard";
import TeamLoadingSkeleton from "../team/TeamLoadingSkeleton";
import { useTeamMembers } from "@/hooks/useTeamMembers";

interface CompanyTeamTabProps {
  company: CompanyType;
}

const CompanyTeamTab: React.FC<CompanyTeamTabProps> = ({ company }) => {
  const { primaryContact, otherMembers, isLoading, error } = useTeamMembers(company.firm_id);

  if (isLoading) {
    return <TeamLoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
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
              <TeamMemberCard key={member.contact_id} contact={member} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No additional team members information available.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyTeamTab;
