import { CompanyType } from "@/types/company";

// New Azure API endpoint
const API_BASE_URL = "https://altss.azurewebsites.net/api/fundmanagers?code=9bpcjYBrbDCq_DBrlf-m81jEOYP0y6ceGk451tuHJkwqAzFuJT7xgg==";

/**
 * Fetches a fund manager by ID from the API
 * @param firmId The ID of the fund manager to fetch
 * @returns Promise with the fund manager data
 */
export const fetchFundManagerById = async (firmId: string): Promise<CompanyType | null> => {
  try {
    // Use the same API endpoint as in fetchFilteredFundManagers but with firm_id filter
    const params = new URLSearchParams({
      firm_id: firmId
    });
    
    const response = await fetch(
      `${API_BASE_URL}&${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch fund manager: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fund manager fetch response:', result);
    
    // The API returns an array in data, we need the first item
    if (result.data && result.data.length > 0) {
      return result.data[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching fund manager:", error);
    throw error;
  }
};

/**
 * Fetches the total count of fund managers from the API
 * @returns Promise with the total count
 */
export const fetchFundManagersCount = async (): Promise<number> => {
  try {
    // Using the base URL without filters to get total count from metadata
    const response = await fetch(`${API_BASE_URL}&limit=1`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch total fund managers count: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Raw fund managers count response:", data);
    
    // Access the total count from the metadata
    return data.metadata.total || 0;
  } catch (error) {
    console.error("Error fetching fund managers count:", error);
    throw error;
  }
};

/**
 * Fetches fund managers with pagination
 * @param page The page number to fetch
 * @param limit The number of fund managers per page
 * @returns Promise with the fund managers data
 */
export const fetchFundManagers = async (
  page: number = 1,
  limit: number = 10
): Promise<CompanyType[]> => {
  try {
    const offset = (page - 1) * limit;
    // Build the URL with pagination parameters and default sorting by name
    const url = `${API_BASE_URL}&limit=${limit}&offset=${offset}&sortBy=firm_name`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch fund managers: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Map API response to CompanyType objects
    return data.data.map((item: any) => mapToCompanyType(item));
  } catch (error) {
    console.error("Error fetching fund managers:", error);
    throw error;
  }
};

/**
 * Interface for fund managers filter parameters
 */
interface FundManagersFilterParams {
  firm_id?: string;
  firm_name?: string;
  city?: string;
  country?: string;
  region?: string;
  firm_type?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  [key: string]: string | number | undefined; // Allow any parameter
}

/**
 * Response structure for paginated fund managers data
 */
export interface FundManagersResponse {
  data: CompanyType[];
  total: number;
}

/**
 * Fetch filtered fund managers from the API using provided parameters
 * @param filters Filter parameters for fund managers
 * @returns Filtered fund managers data
 */
export const fetchFilteredFundManagers = async (
  filters: Record<string, any> = {}
): Promise<FundManagersResponse> => {
  try {
    const params = new URLSearchParams();
    
    // Add filter parameters if they exist
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });
    
    // Ensure pagination parameters are set
    if (!params.has('limit')) {
      params.append('limit', '10');
    }
    
    if (!params.has('offset')) {
      params.append('offset', '0');
    }
    
    console.log('Fetching fund managers with params:', Object.fromEntries(params.entries()));
    
    const response = await fetch(
      `${API_BASE_URL}&${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch fund managers: ${response.status}`);
    }

    const result = await response.json();
    console.log('Filtered fund managers response:', result);
    
    // Map the data to CompanyType objects
    const mappedData = result.data ? result.data.map((item: any) => mapToCompanyType(item)) : [];
    
    return {
      data: mappedData,
      total: result.metadata?.total || 0, // Use metadata.total from API response
    };
  } catch (error) {
    console.error('Error fetching fund managers:', error);
    throw error;
  }
};

/**
 * Searches fund managers by name
 * @param name The name to search for
 * @param page The page number
 * @param limit Items per page
 * @returns Promise with the search results and total count
 */
export const searchFundManagersByName = async (
  name: string,
  page: number = 1,
  limit: number = 10
): Promise<FundManagersResponse> => {
  try {
    console.log(`Searching fund managers with name: ${name}, page: ${page}, limit: ${limit}`);
    
    return fetchFilteredFundManagers({
      firm_name: name,
      limit,
      offset: (page - 1) * limit,
      sortBy: "firm_name"
    });
  } catch (error) {
    console.error('Error searching fund managers:', error);
    throw error;
  }
};

/**
 * Helper function to map API response to CompanyType
 * @param data Raw data from API
 * @returns Mapped CompanyType object
 */
const mapToCompanyType = (data: any): CompanyType => {
  return {
    id: data.firm_id || '',
    firm_id: data.firm_id || '',
    firm_name: data.firm_name || 'N/A',
    name: data.firm_name || 'N/A',
    city: data.city || '',
    background: data.background || '',
    country: data.country || '',
    region: data.region || '',
    address: data.address || '',
    state_county: data.state_county || '',
    zip_code: data.zip_code || '',
    website: data.website || '',
    email: data.email || '',
    tel: data.tel || '',
    fax: data.fax || '',
    local_language_firm_name: data.local_language_firm_name || '',
    secondary_locations: data.secondary_locations || '',
    firm_type: data.firm_type || '',
    type: data.firm_type || 'N/A',
    year_est: data.year_est ? Number(data.year_est) : undefined,
    total_staff: data.total_staff || '',
    management_team_staff: data.management_team_staff || '',
    investment_team_staff: data.investment_team_staff || '',
    firm_s_main_currency: data.firm_s_main_currency || '',
    currency_of_funds_managed: data.currency_of_funds_managed || '',
    women_led_firm: data.women_led_firm || '',
    minority_led_firm: data.minority_led_firm || '',
    firm_ownership: data.firm_ownership || '',
    listed: data.listed || '',
    ticker_symbol: data.ticker_symbol || '',
    stock_exchange: data.stock_exchange || '',
    total_assets_under_management_curr_mn: data.total_assets_under_management_curr_mn || '',
    total_assets_under_management_usd_mn: data.total_assets_under_management_usd_mn || '',
    total_assets_under_management_eur_mn: data.total_assets_under_management_eur_mn || '',
    total_assets_under_management_date: data.total_assets_under_management_date || '',
    pe_main_firm_strategy: data.pe_main_firm_strategy || '',
    pe_geographic_exposure: data.pe_geographic_exposure || '',
    pe_industries: data.pe_industries || '',
    pe_industry_verticals: data.pe_industry_verticals || '',
    pe_strategies: data.pe_strategies || '',
    pe_company_size: data.pe_company_size || '',
    pe_company_situation: data.pe_company_situation || '',
    pe_investment_stage: data.pe_investment_stage || '',
    pe_main_applied_strategies: data.pe_main_applied_strategies || '',
    pe_main_expertise_provided: data.pe_main_expertise_provided || '',
    
    // Форматированные поля для UI
    location: `${data.city || ''}, ${data.country || ''}`.replace(/, $|^, /g, ''),
    employees: data.total_staff ? Number(data.total_staff) : 'N/A',
    foundedYear: data.year_est ? `${data.year_est}` : 'N/A',
    aum: data.total_assets_under_management_usd_mn ? 
         Number(data.total_assets_under_management_usd_mn) : undefined,
    isFavorite: false, // По умолчанию не в избранном
    
    // Дополнительные поля, которые могут быть использованы в компоненте отображения деталей компании
    description: data.background || '',
    industry: data.pe_industries || '',
    founded: data.year_est ? `${data.year_est}` : '',
    founded_year: data.year_est ? Number(data.year_est) : undefined,
    headquarters: `${data.city || ''}, ${data.country || ''}`.replace(/, $|^, /g, ''),
    employees_count: data.total_staff || '',
    phone: data.tel || ''
  };
};

/**
 * Filters fund managers by a firm type
 * @param firmType The firm type to filter by
 * @param page The page number
 * @param limit Items per page
 * @returns Promise with filtered fund managers data
 */
export const filterFundManagersByType = async (
  firmType: string,
  page: number = 1,
  limit: number = 10
): Promise<FundManagersResponse> => {
  try {
    return fetchFilteredFundManagers({
      firm_type: firmType,
      limit,
      offset: (page - 1) * limit
    });
  } catch (error) {
    console.error('Error filtering fund managers by type:', error);
    throw error;
  }
}; 