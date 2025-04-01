
import React from "react";

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
    <div className="flex items-center justify-between my-4">
      <div className="text-lg font-semibold flex items-center gap-2">
        {isLoading ? (
          <span>Loading persons...</span>
        ) : (
          <>
            <span>Person List</span>
            <span className="text-gray-500">({totalContacts} persons)</span>
            {hasActiveFilters && (
              <span className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full">
                Filtered
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PersonsListHeader;
