
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface PersonsSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch?: (params: { name: string; investor: string; firm_type: string }) => void;
  isSearching?: boolean;
  isInDialog?: boolean;
  onReset?: () => void;
}

const PersonsSearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch,
  isSearching = false,
  isInDialog = false,
  onReset
}: PersonsSearchBarProps) => {
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
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
        
        <div className="flex justify-end gap-2">
          {onReset && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onReset}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonsSearchBar;
