# AI Project Architect Pro (AIPAP1)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRD v1.7](https://img.shields.io/badge/PRD-v1.7-blue)](docs/prd_v1.7.md)

A comprehensive AI-powered platform for transforming project ideas into detailed development plans, featuring PRD authoring and task automation.

## 🚀 Features

- **PRD Authoring Wizard**: Guided creation of detailed Product Requirements Documents
- **AI-Powered Task Generation**: Automatically break down PRDs into development tasks
- **Project Management**: Organize and track multiple projects
- **Modern Tech Stack**: Built with React, TypeScript, and Redux Toolkit
- **Responsive Design**: Works on desktop and tablet devices

## 📦 Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or yarn
- Git
- [Volta](https://volta.sh/) (recommended for consistent tooling)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/aipap1.git
   cd aipap1
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Copy the example environment file and update the values:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## 🚦 Running the Application

### Development Mode
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
pnpm build
pnpm preview
# or
npm run build
npm run preview
```

## 🧪 Testing

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

### Test Organization
- Unit tests: Co-located with source files as `*.test.ts` or `*.test.tsx`
- Integration tests: Placed in `src/__tests__/` directory
- Test utilities: Located in `src/test/`

### Writing Tests
- Use `vitest` as the test runner
- Follow Arrange-Act-Assert pattern
- Use `@testing-library/react` for component testing
- Mock external dependencies using `vi.fn()`

### Test Coverage
- Aim for 80%+ test coverage
- Coverage reports are generated in `coverage/` directory
- Ignore test utilities and type definitions from coverage

## 📚 Documentation

- [PRD v1.7](docs/prd_v1.7.md) - Product Requirements Document
- [UI/UX Guide](docs/ui-ux-guide.md) - Design system and component guidelines
- [Development Notes](docs/development-notes.md) - Technical documentation for developers
- [User Manual](docs/user-manual.md) - End-user documentation

## 🏗️ Project Structure

```
/aipap1/
├── .github/            # GitHub workflows and configurations
├── public/             # Static assets
├── src/                # Application source code
│   ├── app/           # Global app setup and configuration
│   ├── features/      # Feature modules
│   └── shared/        # Shared components and utilities
├── .env.development   # Development environment variables
├── .env.production    # Production environment variables
└── package.json       # Project dependencies and scripts
```

## 🤝 Contributing

### Prerequisites
- Familiarize yourself with [Code Quality Standards](docs/code-quality-standards.md)
- Ensure all tests pass before submitting a PR
- Update documentation when adding new features

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes following the commit guidelines
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request with a clear description
6. Ensure all CI checks pass
7. Request review from at least one maintainer

### Code Review Checklist
- [ ] Code follows project standards
- [ ] Tests are included for new features
- [ ] Documentation is updated
- [ ] No console.log statements in production code
- [ ] No commented-out code

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI powered by [MUI](https://mui.com/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Icons from [Heroicons](https://heroicons.com/)
