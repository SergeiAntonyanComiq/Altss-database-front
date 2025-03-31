
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Bookmark, Heart, Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch?: (params: { name: string; investor: string; firm_type: string }) => void;
  isSearching?: boolean;
}

const PersonsSearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch,
  isSearching = false
}: PersonsSearchBarProps) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
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

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
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
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={toggleAdvancedSearch}
        >
          <Filter className="h-4 w-4" />
          {showAdvancedSearch ? "Hide Filters" : "Show Filters"}
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Bookmark className="h-4 w-4" />
          Save this Search
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Add to Favorites
        </Button>
      </div>
      
      {/* Advanced search fields */}
      {showAdvancedSearch && (
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PersonsSearchBar;
