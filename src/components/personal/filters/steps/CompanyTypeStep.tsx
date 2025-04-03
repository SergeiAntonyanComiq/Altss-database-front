
import React from "react";
import { ChevronLeft, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface CompanyTypeStepProps {
  onBackClick: () => void;
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  onRemoveType: (type: string) => void;
  onClearAll: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  firmTypes: string[];
  loading: boolean;
  error: string | null;
}

const CompanyTypeStep: React.FC<CompanyTypeStepProps> = ({
  onBackClick,
  selectedTypes,
  onToggleType,
  onRemoveType,
  onClearAll,
  searchTerm,
  onSearchChange,
  firmTypes,
  loading,
  error
}) => {
  // Filter the firm types based on the search term
  const filteredFirmTypes = firmTypes.filter(type => 
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBackClick}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h3 className="font-medium">Select company types</h3>
        {selectedTypes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-primary"
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search company types"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-4"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTypes.map(type => (
            <Badge key={type} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
              {type}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-transparent"
                onClick={() => onRemoveType(type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-6 w-6 border-2 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4">{error}</div>
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          {filteredFirmTypes.length === 0 ? (
            <div className="text-center text-muted-foreground p-4">No company types found</div>
          ) : (
            filteredFirmTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2 my-2">
                <Checkbox 
                  id={`type-${type}`} 
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => onToggleType(type)}
                />
                <label 
                  htmlFor={`type-${type}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {type}
                </label>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyTypeStep;
