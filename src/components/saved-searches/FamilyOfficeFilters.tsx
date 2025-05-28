import { Calendar, SearchIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import React from "react";
import { SavedFiltersType } from "@/services/savedFiltersService.ts";

export interface FamilyOfficeFiltersProps {
  query: SavedFiltersType;
  handleUseSearch: (search: SavedFiltersType) => void;
  handleDeleteFilter: (id: number, filter: string) => void;
}

export const FamilyOfficeFilters = ({
  query,
  handleUseSearch,
  handleDeleteFilter,
}: FamilyOfficeFiltersProps) => (
  <div key={query.id} className="p-4 hover:bg-gray-50 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center">
          <div className="font-medium text-gray-800">{query.filterText}</div>
          <div className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
            Saved Search
          </div>
        </div>

        <div className="mt-3 flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
          Saved on {new Date(query.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUseSearch(query)}
        >
          <SearchIcon className="h-4 w-4 mr-1" />
          Use Search
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => handleDeleteFilter(query.id, query.filterText)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
