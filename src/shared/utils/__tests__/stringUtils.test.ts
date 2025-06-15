import { describe, it, expect } from 'vitest';
import { capitalize, truncate, toKebabCase } from '../stringUtils';

describe('stringUtils', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('returns an empty string for non-string inputs', () => {
      // @ts-expect-error - Testing invalid input
      expect(capitalize(null)).toBe('');
      // @ts-expect-error - Testing invalid input
      expect(capitalize(undefined)).toBe('');
      // @ts-expect-error - Testing invalid input
      expect(capitalize(123)).toBe('');
      expect(capitalize('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('truncates strings longer than maxLength', () => {
      expect(truncate('Hello world', 5)).toBe('Hello...');
      expect(truncate('Testing truncation', 10)).toBe('Testing tr...');
    });

    it('returns the original string if shorter than maxLength', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
      expect(truncate('', 5)).toBe('');
    });

    it('handles edge cases', () => {
      // @ts-expect-error - Testing invalid input
      expect(truncate(null, 5)).toBe('');
      // @ts-expect-error - Testing invalid input
      expect(truncate(undefined, 5)).toBe('');
      expect(truncate('Hello', 0)).toBe('...');
    });
  });

  describe('toKebabCase', () => {
    it('converts strings to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('Hello World')).toBe('hello-world');
      expect(toKebabCase('hello_world')).toBe('hello-world');
      expect(toKebabCase('hello-world')).toBe('hello-world');
    });

    it('handles edge cases', () => {
      // @ts-expect-error - Testing invalid input
      expect(toKebabCase(null)).toBe('');
      // @ts-expect-error - Testing invalid input
      expect(toKebabCase(undefined)).toBe('');
      expect(toKebabCase('')).toBe('');
    });
  });
});
