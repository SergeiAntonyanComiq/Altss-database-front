
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
  
  // Handle the specific pattern "Month Year – Content" (with various dash types)
  cleanedContent = cleanedContent.replace(/^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s*[-–—]\s*/, '');
  cleanedContent = cleanedContent.replace(/^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*[-–—]\s*/, '');
  
  return cleanedContent;
};
