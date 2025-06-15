/**
 * Formats a date string into a human-readable format
 * @param dateString - Date string in ISO format
 * @returns Formatted date string (e.g., "June 14, 2025")
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
