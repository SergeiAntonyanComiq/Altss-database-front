
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export interface SavedSearch {
  id: string;
  name: string;
  user_id: string;
  filter_data: {
    firmTypes: string[];
    searchQuery?: string;
  };
  created_at: string;
}

/**
 * Saves the current search filters to the user's saved searches
 */
export const saveSearch = async (
  name: string, 
  filterData: { firmTypes: string[], searchQuery?: string }
): Promise<SavedSearch | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save searches",
        variant: "destructive",
      });
      return null;
    }

    const { data, error } = await supabase
      .from('saved_searches')
      .insert({
        name,
        user_id: user.id,
        filter_data: filterData
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving search:', error);
      toast({
        title: "Failed to save search",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Search saved",
      description: `"${name}" has been saved to your searches`,
    });

    return data;
  } catch (err) {
    console.error('Unexpected error saving search:', err);
    toast({
      title: "Failed to save search",
      description: "An unexpected error occurred",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Gets all saved searches for the current user
 */
export const getSavedSearches = async (): Promise<SavedSearch[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved searches:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching saved searches:', err);
    return [];
  }
};

/**
 * Deletes a saved search by ID
 */
export const deleteSavedSearch = async (id: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }

    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id); // Ensure user can only delete their own searches

    if (error) {
      console.error('Error deleting saved search:', error);
      toast({
        title: "Failed to delete search",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Search deleted",
      description: "The saved search has been removed",
    });

    return true;
  } catch (err) {
    console.error('Unexpected error deleting saved search:', err);
    return false;
  }
};
