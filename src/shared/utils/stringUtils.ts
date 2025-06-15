/**
 * Capitalizes the first letter of a string.
 * If the input is not a string, returns an empty string.
 *
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export const capitalize = (str: string): string => {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates a string to a specified length and adds an ellipsis if needed.
 *
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the string before truncation
 * @returns The truncated string with an ellipsis if needed
 */
export const truncate = (str: string, maxLength: number): string => {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
};

/**
 * Converts a string to kebab-case.
 *
 * @param str - The string to convert
 * @returns The kebab-cased string
 */
export const toKebabCase = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};
