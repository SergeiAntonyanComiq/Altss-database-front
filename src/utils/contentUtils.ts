
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
  
  // Remove numbered bullet points (e.g., "1.", "2.", etc.)
  cleanedContent = cleanedContent.replace(/^\d+\.\s*/, '').trim();
  
  // Remove dash prefix if present
  cleanedContent = cleanedContent.replace(/^-\s*/, '').trim();
  cleanedContent = cleanedContent.replace(/^–\s*/, '').trim();
  
  // Remove date prefixes from content if they exist
  cleanedContent = cleanedContent.replace(/^\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*[-–—]\s*/, '');
  cleanedContent = cleanedContent.replace(/^\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s*\d{4}\s*[-–—]\s*/, '');
  
  // Handle the specific pattern "Month Year – Content" (with various dash types)
  cleanedContent = cleanedContent.replace(/^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s*[-–—]\s*/, '');
  cleanedContent = cleanedContent.replace(/^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*[-–—]\s*/, '');
  
  // Handle Month DD, YYYY - content pattern (with or without bullet points)
  cleanedContent = cleanedContent.replace(/^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4}\s*[-–—]\s*/, '');
  
  // Handle YYYY-MM-DD date format with pipe or dash separator
  cleanedContent = cleanedContent.replace(/^\d{4}-\d{2}-\d{2}\s*[\|–—-]\s*/, '');
  
  // Handle plain date format with pipe separator (common in some sources)
  cleanedContent = cleanedContent.replace(/^[^|]+\|\s*/, '');
  
  return cleanedContent;
};
