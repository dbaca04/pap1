# Contributing to AI Project Architect Pro (AIPAP1)

Thank you for your interest in contributing to AIPAP1! We welcome contributions from the community to help improve this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/your-username/aipap1.git
   cd aipap1
   ```
3. **Set up the development environment**
   ```bash
   npm install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Branch Naming

Use the following prefixes for your branches:
- `feature/` - New features or enhancements
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding missing tests
- `chore/` - Build process or tooling changes

Example: `feature/add-user-authentication`

### Commits

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Use the present tense ("Add feature" not "Added feature")
- Keep commits small and focused
- Reference issues and pull requests in commit messages

Example:
```
feat(auth): add login functionality

- Add login form component
- Implement authentication service
- Add login/logout functionality

Closes #123
```

## Code Style

- Follow the [Code Quality Standards](docs/code-quality-standards.md)
- Use TypeScript for all new code
- Ensure all new code is covered by tests
- Keep functions small and focused
- Write self-documenting code with clear variable names

## Testing

### Writing Tests
- Write tests for all new features and bug fixes
- Follow the Arrange-Act-Assert pattern
- Use descriptive test names
- Mock external dependencies

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run a specific test file
npm test -- src/path/to/test.spec.ts
```

## Pull Request Process

1. Ensure all tests pass
2. Update the documentation as needed
3. Run the linter and fix any issues
   ```bash
   npm run lint
   ```
4. Ensure your branch is up to date with the latest changes from `main`
5. Push your changes to your fork
6. Open a Pull Request with a clear description of the changes

### PR Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows project standards
- [ ] No console.log statements in production code
- [ ] No commented-out code
- [ ] All CI checks pass

## Reporting Issues

When creating an issue, please include:
- A clear title and description
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots if applicable
- Browser/OS version if relevant
- Any error messages

## Feature Requests

We welcome feature requests! Please include:
- A clear description of the feature
- The problem it solves
- Any alternative solutions considered
- Additional context

## Documentation

- Keep documentation up to date with code changes
- Update the [User Manual](docs/user-manual.md) for user-facing changes
- Update the [Development Notes](docs/development-notes.md) for developer-facing changes
- Add comments to complex logic

## Code Review Process

1. A maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged into `main`
4. Your changes will be included in the next release

## Getting Help

If you need help or have questions:
- Check the [documentation](docs/)
- Open an issue for discussion
- Join our community chat (if applicable)

Thank you for contributing to AIPAP1! 🚀
