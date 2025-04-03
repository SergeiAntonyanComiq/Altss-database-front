/**
 * Extract domain from URL to use for logo generation
 * @param url URL to extract domain from
 * @returns Two-letter domain representation for logo
 */
export const extractDomainForLogo = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Extract the main domain name for common formats
    if (hostname.startsWith('www.')) {
      const domain = hostname.substring(4);
      
      // Handle common domain patterns
      if (domain.includes('prnewswire')) return 'PR';
      if (domain.includes('bloomberg')) return 'BL';
      if (domain.includes('reuters')) return 'RT';
      if (domain.includes('wsj')) return 'WS';
      if (domain.includes('ft.com')) return 'FT';
      if (domain.includes('forbes')) return 'FB';
      if (domain.includes('techcrunch')) return 'TC';
      if (domain.includes('linkedin')) return 'LI';
      if (domain.includes('crunchbase')) return 'CB';
      if (domain.includes('pitchbook')) return 'PB';
      
      // Return first two letters capitalized for other domains
      return domain.split('.')[0].substring(0, 2).toUpperCase();
    }
    
    // If no www prefix, just use the first part of the hostname
    return hostname.split('.')[0].substring(0, 2).toUpperCase();
  } catch (e) {
    return 'NW'; // Default for "News"
  }
};

/**
 * Generate a logo based on the content and domain
 * @param content News content
 * @param sourceDomain Domain extracted from source URL
 * @returns Two-letter logo representation
 */
export const getSourceLogo = (content: string, sourceDomain: string): string => {
  // If we have a domain-based logo, use it
  if (sourceDomain && sourceDomain !== 'NW') {
    return sourceDomain;
  }
  
  // Otherwise, try to extract from content
  if (content.includes("PRNewswire") || content.includes("PR Newswire")) return "PR";
  if (content.includes("Bloomberg")) return "BL";
  if (content.includes("Reuters")) return "RT";
  if (content.includes("WSJ") || content.includes("Wall Street Journal")) return "WS";
  if (content.includes("Financial Times") || content.includes("FT")) return "FT";
  if (content.includes("Forbes")) return "FB";
  if (content.includes("TechCrunch")) return "TC";
  if (content.includes("LinkedIn")) return "LI";
  if (content.includes("Crunchbase")) return "CB";
  
  return "NW"; // Default logo
};

/**
 * Generate a random color based on index
 * @param index Index to generate color for
 * @returns Hex color code
 */
export const getRandomColor = (index: number): string => {
  const colors = [
    "#f43f5e", // Red
    "#3b82f6", // Blue
    "#10b981", // Green
    "#8b5cf6", // Purple
    "#f59e0b", // Orange
    "#6366f1", // Indigo
    "#ec4899"  // Pink
  ];
  return colors[index % colors.length];
};

/**
 * Clean and format news content
 * @param content Raw news content
 * @returns Cleaned news content
 */
export const cleanNewsContent = (content: string): string => {
  let cleanedContent = content.trim();
  
  // Remove citation references like [10] from content
  cleanedContent = cleanedContent.replace(/\[\d+(?:,\s*\d+)*\](?:\[\d+\])*/g, '').trim();
  
  // Remove asterisks and plus signs
  cleanedContent = cleanedContent.replace(/[\*\+]/g, '').trim();
  
  // Remove dash prefix if present
  cleanedContent = cleanedContent.replace(/^-\s*/, '').trim();
  cleanedContent = cleanedContent.replace(/^–\s*/, '').trim();
  
  // Remove date prefixes from content if they exist
  cleanedContent = cleanedContent.replace(/^\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*[-–—]\s*/, '');
  cleanedContent = cleanedContent.replace(/^\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s*\d{4}\s*[-–—]\s*/, '');
  
  return cleanedContent;
};
