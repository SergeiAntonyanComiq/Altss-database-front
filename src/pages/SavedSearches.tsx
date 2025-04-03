
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSavedFilters, deleteSavedFilter, saveDefaultFilters } from "@/services/savedFiltersService";
import { useToast } from "@/components/ui/use-toast";

interface SavedFilter {
  id: string;
  name: string;
  firmTypes: string[];
  createdAt: number;
}

const SavedSearches = () => {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load saved filters on component mount
  useEffect(() => {
    const filters = getSavedFilters();
    // If no filters exist yet, create default ones
    if (filters.length === 0) {
      saveDefaultFilters();
      setSavedFilters(getSavedFilters());
    } else {
      setSavedFilters(filters);
    }
  }, []);
  
  // Delete a filter and update state
  const handleDeleteFilter = (id: string) => {
    deleteSavedFilter(id);
    setSavedFilters(prevFilters => prevFilters.filter(filter => filter.id !== id));
    toast({
      title: "Filter Deleted",
      description: "The saved filter has been removed",
    });
  };
  
  // Apply a filter and navigate to persons page
  const handleApplyFilter = (filter: SavedFilter) => {
    // Navigate to persons page with filter params - fixed path from /app/persons to /persons
    navigate(`/persons?filter=${encodeURIComponent(filter.id)}`);
    
    toast({
      title: "Filter Applied",
      description: `Applied "${filter.name}" filter`,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 bg-[#F6F6F7] p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Saved Searches</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filter Name</TableHead>
                    <TableHead>Filter Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedFilters.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No saved searches found
                      </TableCell>
                    </TableRow>
                  ) : (
                    savedFilters.map((filter) => (
                      <TableRow key={filter.id}>
                        <TableCell className="font-medium">{filter.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {filter.firmTypes.join(", ")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(filter.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApplyFilter(filter)}
                              className="flex gap-1 items-center"
                            >
                              <Check className="h-4 w-4" />
                              Apply
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteFilter(filter.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SavedSearches;
