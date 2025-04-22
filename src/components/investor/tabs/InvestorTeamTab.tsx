import React from "react";
import { InvestorType } from "@/types/investor";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import TeamMemberCard from "@/components/company/team/TeamMemberCard";
import TeamLoadingSkeleton from "@/components/company/team/TeamLoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props { investor: InvestorType; }

const InvestorTeamTab: React.FC<Props> = ({ investor }) => {
  const { primaryContact, otherMembers, isLoading, error } = useTeamMembers(investor.firm_id);

  if (isLoading) return <TeamLoadingSkeleton />;
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
          <TeamMemberCard contact={primaryContact} isPrimary />
        ) : (
          <p className="text-sm text-gray-500">No primary contact information available.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
        {otherMembers.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherMembers.map((m) => (
              <TeamMemberCard key={m.contact_id} contact={m} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No additional team members information available.</p>
        )}
      </div>
    </div>
  );
};

export default InvestorTeamTab; 