import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/app/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Create a custom render function that includes all necessary providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  // Create a mock store for testing
  const store = configureStore({
    reducer: {
      // Add your reducers here
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });

  // Set up listeners for RTK Query
  setupListeners(store.dispatch);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

// Custom render function that wraps components with all necessary providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
// Override the render method with our custom render
export { customRender as render };

// Helper function to mock window.matchMedia
// This is needed for components that use useMediaQuery
// from Material-UI or other libraries that rely on matchMedia
export const mockMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Utility to wait for a specific amount of time (useful for async tests)
export const wait = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock for the ResizeObserver API
export class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock for the IntersectionObserver API
export class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor() {}
  
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

// Set up global mocks
global.ResizeObserver = ResizeObserverMock;
global.IntersectionObserver = IntersectionObserverMock as any;
