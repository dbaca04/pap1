module.exports = {
  ci: {
    collect: {
      // Run Lighthouse tests against a local server
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'ready in',
      url: [
        'http://localhost:5173',
        'http://localhost:5173/features',
        'http://localhost:5173/documentation'
      ],
      // Number of test runs for CI
      numberOfRuns: 3,
    },
    assert: {
      // Performance budget assertions
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // Performance metrics
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-meaningful-paint': ['error', { maxNumericValue: 2000 }],
        'speed-index': ['error', { maxNumericValue: 4500 }],
        'interactive': ['error', { maxNumericValue: 3800 }],
        'total-blocking-time': ['error', { maxNumericValue: 500 }],
      },
    },
    upload: {
      // Upload results to a temporary public storage for CI
      target: 'temporary-public-storage',
      // Or use your own Lighthouse CI server
      // target: 'lhci',
      // serverBaseUrl: 'https://your-lhci-server.com',
    },
  },
};
