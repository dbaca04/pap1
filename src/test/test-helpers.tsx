import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type UserEventSetupOptions = {
  /**
   * Delay between key strokes in milliseconds.
   * @default 0
   */
  delay?: number;
  /**
   * Move the cursor to the end of the text in the current element.
   * @default true
   */
  skipHover?: boolean;
};

/**
 * Renders a component and returns the rendered component and user event instance.
 * This is useful for testing user interactions with the component.
 *
 * @param ui - The React element to render
 * @param options - Options for the user event setup
 * @returns An object containing the rendered component and user event instance
 */
export const renderWithUser = (
  ui: React.ReactElement,
  options: UserEventSetupOptions = {}
) => {
  const user = userEvent.setup(options);
  return {
    user,
    ...render(ui),
  };
};

/**
 * Waits for an element to be removed from the DOM.
 * This is useful for testing components that conditionally render elements.
 *
 * @param element - The element to wait for removal
 * @param options - Options for the wait
 * @returns A promise that resolves when the element is removed
 */
export const waitForElementToBeRemoved = (
  element: HTMLElement,
  options: { timeout?: number } = {}
) => {
  const { timeout = 1000 } = options;
  return new Promise<void>((resolve, reject) => {
    const observer = new MutationObserver(() => {
      if (!document.body.contains(element)) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Reject if the element is not removed within the timeout
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element was not removed within ${timeout}ms`));
    }, timeout);

    // Clean up the timeout if the promise is resolved
    return () => clearTimeout(timeoutId);
  });
};

/**
 * Mocks a successful API response.
 * This is useful for testing components that make API calls.
 *
 * @param data - The data to return in the response
 * @param status - The HTTP status code to return
 * @returns A mock response object
 */
export const mockSuccessResponse = <T = unknown>(
  data: T,
  status = 200
): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: () => Promise.resolve(data),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  } as Response;
};

/**
 * Mocks a failed API response.
 * This is useful for testing error handling in components.
 *
 * @param error - The error message to return
 * @param status - The HTTP status code to return
 * @returns A mock response object
 */
export const mockErrorResponse = (
  error: string = 'An error occurred',
  status = 500
): Response => {
  return {
    ok: false,
    status,
    statusText: 'Error',
    json: () =>
      Promise.resolve({
        error,
        statusCode: status,
        message: error,
      }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  } as Response;
};

/**
 * Creates a mock function that can be used to test callbacks.
 * This is useful for testing event handlers and other callbacks.
 *
 * @param implementation - The implementation of the mock function
 * @returns A mock function
 */
export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T
) => {
  return vi.fn(implementation) as jest.MockedFunction<T>;
};

/**
 * Waits for a specific amount of time.
 * This is useful for testing async behavior.
 *
 * @param ms - The number of milliseconds to wait
 * @returns A promise that resolves after the specified time
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Gets the text content of an element, with whitespace normalized.
 * This is useful for testing text content that may have extra whitespace.
 *
 * @param element - The element to get the text content from
 * @returns The normalized text content
 */
export const getNormalizedTextContent = (element: HTMLElement): string => {
  return element.textContent?.replace(/\s+/g, ' ').trim() || '';
};

// Re-export commonly used testing utilities
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
