
import React, { useState, useEffect } from "react";
import { CompanyType } from "@/types/company";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import TeamMemberCard from "../team/TeamMemberCard";
import TeamLoadingSkeleton from "../team/TeamLoadingSkeleton";

interface CompanyTeamTabProps {
  company: CompanyType;
}

const CompanyTeamTab: React.FC<CompanyTeamTabProps> = ({ company }) => {
  const [teamMembers, setTeamMembers] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      // Use firm_id instead of id
      if (!company.firm_id) {
        setError("Firm ID not available");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching team members for company firm_id:", company.firm_id);
        
        // Fix the URL to match the working endpoint format from the screenshot
        const response = await fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts?firm_id=${company.firm_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch team members: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Team members fetched:", data);
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Failed to load team members. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load team members. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, [company.firm_id, toast]);

  // Find primary contact (assuming it's the first one with a specific role or just the first one)
  const primaryContact = teamMembers.length > 0 ? teamMembers[0] : null;
  const otherMembers = teamMembers.length > 1 ? teamMembers.slice(1) : [];

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

export default CompanyTeamTab;
