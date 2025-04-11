
import { ContactType } from "@/types/contact";

/**
 * Fetches a contact by ID from the API
 * @param contactId The ID of the contact to fetch
 * @returns Promise with the contact data
 */
export const fetchContactById = async (contactId: number): Promise<ContactType> => {
  try {
    const response = await fetch(`https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts/${contactId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch contact: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

/**
 * Fetches the total count of contacts from the API
 * @returns Promise with the total count
 */
export const fetchContactsCount = async (): Promise<number> => {
  try {
    const response = await fetch('https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_count');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch total contacts count: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Raw contacts count response:", data);
    
    // Access the COUNT property from the response
    return data.COUNT || 0;
  } catch (error) {
    console.error("Error fetching contacts count:", error);
    throw error;
  }
};

/**
 * Fetches contacts with optional filters
 * @param page The page number to fetch
 * @param limit The number of contacts per page
 * @param firmTypes Optional array of firm types to filter by
 * @returns Promise with the contacts data
 */
export const fetchContacts = async (
  page: number = 1,
  limit: number = 10,
  firmTypes: string[] = []
): Promise<ContactType[]> => {
  try {
    // Build the URL with query parameters
    let url = `https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts?page=${page}&limit=${limit}`;
    
    // Add firm_type filter if provided
    if (firmTypes.length > 0) {
      // This is a simplified approach - actual API may have different filter mechanism
      const firmTypesParam = firmTypes.join(',');
      url += `&firm_types=${encodeURIComponent(firmTypesParam)}`;
    }
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

/**
 * Interface for contacts filter parameters
 */
interface ContactsFilterParams {
  firm_type?: string;
  name?: string;
  investor?: string;
}

/**
 * Fetches contacts filtered by various parameters
 * @param filters The filter parameters (firm_type, name, investor)
 * @returns Promise with the filtered contacts data
 */
export const fetchFilteredContacts = async (filters: ContactsFilterParams): Promise<ContactType[]> => {
  try {
    console.log(`Fetching contacts with filters:`, filters);
    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (filters.firm_type) {
      params.append('firm_type', filters.firm_type);
    }
    
    if (filters.name) {
      params.append('name', filters.name);
    }
    
    if (filters.investor) {
      params.append('investor', filters.investor);
    }
    
    // Create URL with query parameters
    const url = `https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_0?${params.toString()}`;
    console.log(`Request URL: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch filtered contacts: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Received ${data.length} contacts with applied filters`);
    return data;
  } catch (error) {
    console.error("Error fetching filtered contacts:", error);
    throw error;
  }
};

/**
 * Fetches contacts filtered by firm type
 * @param firmType The firm type to filter contacts by
 * @returns Promise with the filtered contacts data
 * @deprecated Use fetchFilteredContacts instead
 */
export const fetchContactsByFirmType = async (firmType: string): Promise<ContactType[]> => {
  return fetchFilteredContacts({ firm_type: firmType });
};

/**
 * Searches contacts by name
 * @param name The name to search for
 * @returns Promise with the search results
 */
export const searchContactsByName = async (name: string): Promise<ContactType[]> => {
  try {
    console.log(`Searching contacts with name: ${name}`);
    
    // Fixed: Use GET with query parameters instead of POST for this endpoint
    const url = `https://x1r0-gjeb-bouz.n7d.xano.io/api:fljcbPEu/contacts_0?name=${encodeURIComponent(name)}`;
    console.log(`Search request URL: ${url}`);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error searching contacts: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Search returned ${data.length} results`);
    return data || [];
  } catch (error) {
    console.error('Error searching contacts:', error);
    throw error;
  }
};
