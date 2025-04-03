
// Utility functions for date formatting

/**
 * Format date to "Month Day, Year" format
 * @param dateStr Date string to format
 * @returns Formatted date string or "n/a" if invalid
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr || dateStr === "Current" || dateStr === "n/a") {
    return "n/a";
  }
  
  try {
    // Try to parse the date string
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return "n/a"; // If parsing fails, return n/a
    }
    
    // Format the date as "Month Day, Year"
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch (e) {
    return "n/a";
  }
};
