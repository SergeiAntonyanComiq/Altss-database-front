
import React from "react";
import { UsersRound } from "lucide-react";

interface PersonsListHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalContacts: number;
  isLoading: boolean;
  hasActiveFilters?: boolean;
}

const PersonsListHeader: React.FC<PersonsListHeaderProps> = ({
  totalContacts,
  isLoading,
  hasActiveFilters = false
}) => {
  return (
    <div className="flex items-center justify-end my-4">
      <div className="flex items-center gap-2 text-gray-600">
        <UsersRound size={18} />
        <span className="font-medium">
          {isLoading ? "..." : totalContacts} persons
        </span>
        {hasActiveFilters && (
          <span className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full ml-2">
            Filtered
          </span>
        )}
      </div>
    </div>
  );
};

export default PersonsListHeader;
