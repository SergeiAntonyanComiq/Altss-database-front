
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, RotateCcw } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch?: (params: { name: string; investor: string; firm_type: string }) => void;
  onReset?: () => void;
  isSearching?: boolean;
}

const PersonsSearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch,
  onReset,
  isSearching = false
}: PersonsSearchBarProps) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      investor: "",
      firm_type: ""
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form submitted with data:", data);
    if (onSearch) {
      onSearch(data);
      setOpen(false); // Close dialog after search
    }
  });

  // Handle quick search when pressing Enter in the quick search field
  const handleQuickSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      console.log("Quick search with query:", searchQuery);
      onSearch({ 
        name: searchQuery,
        investor: "",
        firm_type: ""
      });
    }
  };

  // Handle click on search icon
  const handleSearchIconClick = () => {
    if (onSearch) {
      console.log("Search icon clicked with query:", searchQuery);
      onSearch({ 
        name: searchQuery,
        investor: "",
        firm_type: ""
      });
    }
  };

  // Handle reset
  const handleReset = () => {
    setSearchQuery("");
    form.reset();
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="mb-6">
      {/* Basic search bar */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative grow">
          <Input
            type="text"
            placeholder="Quick search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleQuickSearch}
            className="pl-3 pr-10"
          />
          <div 
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={handleSearchIconClick}
          >
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Advanced Search Options</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Search by name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="investor"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Search by investor" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="firm_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Search by firm type" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="gap-2 sm:justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleReset}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset Filters
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSearching}
                    >
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PersonsSearchBar;
