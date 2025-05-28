"use client";

import { Button } from "@/components/ui/button";
import { Filter, Save, Heart } from "lucide-react";
import React from "react";
import { SearchInput } from "./search-input.tsx";

export interface TableToolbarProps {
  searchQuery: string;
  filter: string;
  searchPlaceholder: string;
  isAddToFavoriteDisabled: boolean;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onFilterClick?: () => void;
  onSaveClick?: () => void;
  onFavoriteClick?: () => void;
}

export const TableToolbar = ({
  searchQuery,
  filter,
  searchPlaceholder,
  isAddToFavoriteDisabled,
  onSearchChange,
  onFilterClick,
  onSaveClick,
  onClear,
  onFavoriteClick,
}: TableToolbarProps) => {
  return (
    <div className="mb-8 flex gap-4 items-center flex-wrap">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />

      <Button
        variant="outline"
        className="h-11 rounded-full"
        onClick={onFilterClick}
      >
        <Filter className="mr-2 size-4.5" />
        Filters
      </Button>

      <Button
        variant="outline"
        className="h-11 rounded-full"
        onClick={onSaveClick}
        disabled={!searchQuery && !filter}
      >
        <Save className="mr-2 size-4.5" />
        Save this Search
      </Button>

      <Button
        variant="outline"
        className="h-11 rounded-full"
        onClick={onFavoriteClick}
        disabled={isAddToFavoriteDisabled}
      >
        <Heart className="mr-2 size-5" />
        Add to Favorites
      </Button>

      {filter.length > 0 && (
        <Button
          variant="outline"
          className="h-11 rounded-full"
          onClick={onClear}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};
