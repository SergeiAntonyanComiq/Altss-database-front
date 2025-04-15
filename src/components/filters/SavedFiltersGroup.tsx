import React from 'react';
import { SavedSearchType } from '@/services/savedFiltersService';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface SavedFiltersGroupProps {
  filters: SavedSearchType[];
  onApplyFilter: (filter: SavedSearchType) => void;
  onDeleteFilter: (id: string) => void;
  currentActiveFilter: string[];
  onClearFilter: () => void;
}

const SavedFiltersGroup: React.FC<SavedFiltersGroupProps> = ({
  filters,
  onApplyFilter,
  onDeleteFilter,
  currentActiveFilter,
  onClearFilter,
}) => {
  const renderFilterItem = (filter: SavedSearchType, isCurrentSection: boolean) => (
    <div
      key={filter.id}
      className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 ${!isCurrentSection ? 'opacity-60' : ''}`}
    >
      <button
        className={`text-left flex-1 ${
          JSON.stringify(currentActiveFilter) === JSON.stringify(filter.firmTypes)
            ? 'text-primary font-medium'
            : ''
        }`}
        onClick={() => onApplyFilter(filter)}
      >
        {filter.name}
      </button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onDeleteFilter(filter.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderSection = (title: string, sectionFilters: SavedSearchType[], isCurrentSection: boolean) => {
    if (sectionFilters.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">{title}</h3>
        <div className="space-y-1">
          {sectionFilters.map(filter => renderFilterItem(filter, isCurrentSection))}
        </div>
      </div>
    );
  };

  if (filters.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No saved filters yet
      </div>
    );
  }

  // Group filters by type
  const personFilters = filters.filter(filter => filter.type === 'person');
  const companyFilters = filters.filter(filter => filter.type === 'company');

  return (
    <div className="p-4">
      {renderSection('Persons', personFilters, !window.location.pathname.includes('/companies'))}
      {companyFilters.length > 0 && personFilters.length > 0 && (
        <div className="border-t my-4" />
      )}
      {renderSection('Companies', companyFilters, window.location.pathname.includes('/companies'))}
      
      {currentActiveFilter.length > 0 && (
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onClearFilter}
          >
            Clear Active Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedFiltersGroup;
