
/**
 * Generate a color based on index
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
