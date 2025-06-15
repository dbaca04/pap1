import { describe, it, expect } from 'vitest';
import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    // Arrange
    const dateString = '2025-06-14T12:00:00.000Z';
    
    // Act
    const result = formatDate(dateString);
    
    // Assert
    expect(result).toBe('June 14, 2025');
  });

  it('handles the start of the year', () => {
    expect(formatDate('2025-01-01T00:00:00.000Z')).toBe('January 1, 2025');
  });

  it('handles the end of the year', () => {
    expect(formatDate('2025-12-31T23:59:59.999Z')).toBe('December 31, 2025');
  });
});
