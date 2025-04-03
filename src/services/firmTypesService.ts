
/**
 * Fetches available firm/company types from the API
 * @returns Promise with the company types data
 */
export const fetchFirmTypes = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_firm_types');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch firm types: ${response.statusText}`);
    }
    
    const data = await response.json();
    // Extract just the firm_type values into an array
    return data.map((item: { firm_type: string }) => item.firm_type);
  } catch (error) {
    console.error("Error fetching firm types:", error);
    throw error;
  }
};
