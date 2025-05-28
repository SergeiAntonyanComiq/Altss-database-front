import { Calendar, SearchIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  SavedFiltersType,
  SavedSearchType,
} from "@/services/savedFiltersService.ts";

export interface FamilyOfficeContactFiltersProps {
  filter: SavedFiltersType;
  handleUseSearch: (filter: SavedFiltersType) => void;
  handleDeleteSearch: (id: number, query: string) => void;
}

export const FamilyOfficeContactFilters = ({
  filter,
  handleUseSearch,
  handleDeleteSearch,
}: FamilyOfficeContactFiltersProps) => (
  <div key={filter.id} className="p-4 hover:bg-gray-50 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center">
          <div className="font-medium text-gray-800">{filter.filterText}</div>
          <div className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
            Saved Search
          </div>
        </div>

        <div className="mt-3 flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
          Saved on {new Date(filter.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUseSearch(filter)}
        >
          <SearchIcon className="h-4 w-4 mr-1" />
          Use Search
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => handleDeleteSearch(filter.id, filter.filterText)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
