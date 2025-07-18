import { PrimaryContactForm } from "@/components/integration/team/PrimaryContactForm.tsx";
import { GroupedTeamsForm } from "@/components/integration/team/GroupedTeamsForm.tsx";
import { ContactOption } from "@/components/ui/dropdown-search.tsx";

export const Team = ({
  isEditable,
  contacts,
}: {
  isEditable: boolean;
  contacts: ContactOption[];
}) => {
  return (
    <div>
      <PrimaryContactForm contacts={contacts} isEditable={isEditable} />
      <GroupedTeamsForm contacts={contacts} isEditable={isEditable} />
    </div>
  );
};
