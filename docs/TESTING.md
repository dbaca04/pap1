# Testing Strategy

This document outlines the testing strategy and tools used in the AIPAP project.

## Table of Contents
- [Testing Pyramid](#testing-pyramid)
- [Unit & Integration Testing](#unit--integration-testing)
- [Component Testing](#component-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Visual Regression Testing](#visual-regression-testing)
- [Performance Testing](#performance-testing)
- [Test Coverage](#test-coverage)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)

## Testing Pyramid

Our testing strategy follows the testing pyramid approach:

```
        E2E Tests (Playwright)
           /         \
          /           \
  Component Tests   Visual Regression
    (Storybook)      (Chromatic)
         \           /
          \         /
      Unit & Integration Tests (Vitest)
```

## Unit & Integration Testing

We use **Vitest** for unit and integration testing with the following features:

- **Fast**: Runs tests in parallel
- **Compatible**: Works with Jest syntax and most Jest APIs
- **Watch Mode**: Automatically re-runs tests on file changes
- **Coverage**: Built-in code coverage reporting

### Running Unit Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Update snapshots
npm run test:update-snapshots
```

## Component Testing

We use **Storybook** for developing and testing components in isolation.

### Running Component Tests

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build:storybook
```

## End-to-End Testing

We use **Playwright** for end-to-end testing with the following features:

- Cross-browser testing (Chromium, Firefox, WebKit)
- Auto-waiting and web-first assertions
- Mobile viewport testing
- Visual regression testing

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed

# Update visual snapshots
npm run test:e2e:update-snapshots

# View test report
npm run test:e2e:report
```

## Visual Regression Testing

We use **Chromatic** for visual regression testing of our components.

### Running Visual Tests

```bash
# Run Chromatic (requires CHROMATIC_PROJECT_TOKEN)
npm run chromatic
```

## Performance Testing

We use **Lighthouse CI** for performance testing with the following metrics:

- Performance
- Accessibility
- Best Practices
- SEO

### Running Performance Tests

```bash
# Run performance tests locally
npm run test:perf

# Run in CI mode
npm run test:perf:ci
```

## Test Coverage

We aim to maintain at least 80% test coverage across:
- Statements
- Branches
- Functions
- Lines

## CI/CD Integration

All tests are automatically run in our CI/CD pipeline on every push and pull request.

## Best Practices

1. **Write focused tests**: Each test should verify one specific behavior
2. **Use descriptive test names**: Test titles should clearly describe the behavior being tested
3. **Keep tests independent**: Tests should not depend on each other
4. **Mock external dependencies**: Use MSW for API mocking
5. **Follow AAA pattern**: Arrange, Act, Assert
6. **Test edge cases**: Include tests for error states and edge cases
7. **Update snapshots**: When intentional UI changes are made, update snapshots

## Troubleshooting

### Tests are failing
- Run tests with `--no-cache` flag to bypass any caching issues
- Check for any console errors in the test output
- Ensure all required environment variables are set

### Visual differences in tests
- Verify if the changes are intentional
- If they are, update the snapshots using the appropriate command
- Check for any timing issues in the tests

### Performance test failures
- Check if there are any network or resource loading issues
- Verify if the performance budgets need adjustment in `.lighthouserc.js`
- Consider if the failures represent real performance regressions that need to be addressed
