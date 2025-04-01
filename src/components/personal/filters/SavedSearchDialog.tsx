
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SavedSearch, getSavedSearches, deleteSavedSearch } from "@/services/savedSearchesService";
import { Tag, Trash2, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavedSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (search: SavedSearch) => void;
  currentFirmTypes: string[];
  currentSearchQuery?: string;
}

const SavedSearchDialog: React.FC<SavedSearchDialogProps> = ({
  isOpen,
  onClose,
  onApply,
  currentFirmTypes,
  currentSearchQuery = ""
}) => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved searches when dialog opens
  useEffect(() => {
    const loadSavedSearches = async () => {
      if (isOpen) {
        setIsLoading(true);
        try {
          const searches = await getSavedSearches();
          setSavedSearches(searches);
        } catch (error) {
          console.error('Error fetching saved searches:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadSavedSearches();
  }, [isOpen]);

  const handleDelete = async (id: string) => {
    const success = await deleteSavedSearch(id);
    if (success) {
      setSavedSearches(prev => prev.filter(search => search.id !== id));
    }
  };

  const isSearchActive = (search: SavedSearch) => {
    // Check if current filters match this saved search
    const firmTypesMatch = 
      search.filter_data.firmTypes.length === currentFirmTypes.length && 
      search.filter_data.firmTypes.every(type => currentFirmTypes.includes(type));
    
    const queryMatch = 
      (search.filter_data.searchQuery || '') === currentSearchQuery;
    
    return firmTypesMatch && queryMatch;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Saved Searches</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : savedSearches.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              You don't have any saved searches yet.
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {savedSearches.map(search => (
                <div 
                  key={search.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md border",
                    isSearchActive(search) ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-muted-foreground" />
                      <span className="font-medium">{search.name}</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground pl-6">
                      {search.filter_data.firmTypes.length > 0 && (
                        <div>
                          <span className="font-medium">Firm Types:</span> {search.filter_data.firmTypes.join(", ")}
                        </div>
                      )}
                      {search.filter_data.searchQuery && (
                        <div>
                          <span className="font-medium">Search:</span> "{search.filter_data.searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={isSearchActive(search) ? "default" : "outline"}
                      size="sm" 
                      onClick={() => {
                        onApply(search);
                        onClose();
                      }}
                    >
                      {isSearchActive(search) ? (
                        <>
                          <Check size={14} className="mr-1" /> Applied
                        </>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(search.id)}
                      title="Delete search"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavedSearchDialog;
