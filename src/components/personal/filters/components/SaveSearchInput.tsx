
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookmarkPlus } from "lucide-react";
import { saveSearch } from "@/services/savedSearchesService";
import { useToast } from "@/components/ui/use-toast";

interface SaveSearchInputProps {
  selectedTypes: string[];
  searchQuery?: string;
  onSaved?: () => void;
}

const SaveSearchInput: React.FC<SaveSearchInputProps> = ({ 
  selectedTypes, 
  searchQuery = "",
  onSaved 
}) => {
  const [showInput, setShowInput] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveSearch = async () => {
    if (!searchName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your search",
        variant: "destructive",
      });
      return;
    }

    if (selectedTypes.length === 0 && !searchQuery?.trim()) {
      toast({
        title: "No filters applied",
        description: "Please apply at least one filter or search query before saving",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const result = await saveSearch(searchName, {
        firmTypes: selectedTypes,
        searchQuery: searchQuery?.trim() || undefined
      });
      
      if (result) {
        setSearchName('');
        setShowInput(false);
        if (onSaved) onSaved();
      }
    } catch (error) {
      console.error('Error saving search:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!showInput) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => setShowInput(true)}
      >
        <BookmarkPlus className="mr-2 h-4 w-4" />
        Save this search
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Enter search name"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
        className="flex-1"
      />
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="default"
          onClick={handleSaveSearch}
          disabled={isSaving || !searchName.trim()}
        >
          Save
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => {
            setShowInput(false);
            setSearchName('');
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SaveSearchInput;
