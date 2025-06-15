import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

// TypeScript type for the worker
declare global {
  interface Window {
    msw: {
      worker: typeof worker;
    };
  }
}

// Expose worker globally for debugging in development
if (process.env.NODE_ENV === 'development') {
  window.msw = { worker };
}
