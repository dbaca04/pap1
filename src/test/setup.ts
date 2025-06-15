// Import testing library matchers
import '@testing-library/jest-dom/vitest';
import { afterEach, afterAll, beforeAll, vi, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';
import { mockMatchMedia } from './test-utils';

// Initialize global mocks and polyfills
mockMatchMedia();

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Mock console methods to track errors and warnings
const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

// Clean up mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Reset all mocks after all tests
// This is useful to avoid test pollution between test files
afterAll(() => {
  vi.restoreAllMocks();
});

// Mock the next/image component to avoid loading actual images
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock any other modules that might cause issues in tests
vi.mock('next/router', () => require('next-router-mock'));

// Mock the useRouter hook
const useRouter = vi.fn();
useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
}));

// Mock the useSession hook from next-auth/react
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Mock the next/head component to avoid React warnings
vi.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({
      children,
    }: {
      children: Array<React.ReactElement>;
    }) => {
      return <>{children}</>;
    },
  };
});

// Mock any other browser APIs that might be needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Setup MSW server
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// Reset any request handlers that we may add during the tests
// so they don't affect other tests
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
// Clean up after the tests are finished
afterAll(() => server.close());

// Add any global test utilities or mocks here
