<<<<<<< HEAD
# Playwright Automation Tests

[![CI](https://github.com/your-username/your-repo-name/actions/workflows/playwright.yml/badge.svg)](https://github.com/your-username/your-repo-name/actions/workflows/playwright.yml)
[![Code Quality](https://github.com/your-username/your-repo-name/actions/workflows/quality.yml/badge.svg)](https://github.com/your-username/your-repo-name/actions/workflows/quality.yml)

This project contains automated tests using Playwright with TypeScript.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update variables as needed for your environment

## Environment Variables

The project uses environment variables for configuration:

- `CI`: Set to `true` in CI environments (affects retries and parallel execution)
- `BASE_URL`: Base URL for tests (used in `page.goto('/')`)
- Other custom variables as needed

Copy `.env.example` to `.env` and modify values for your setup.

For CI environments, you can create `.env.ci` with CI-specific variables.

## Running Tests

- Run all tests: `npm test`
- Run tests in headed mode: `npm run test:headed`
- Run tests with UI: `npm run test:ui`
- Run tests in CI mode locally: `npm run test:ci-local`
- View report: `npm run report`
- Type check: `npm run type-check`

## Project Structure

- `tests/` - Test files
- `pages/` - Page Object Models
- `utils/` - Utility functions
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Triggers**: Runs on push and pull requests to `main`/`master` branches
- **Browsers**: Tests run in parallel across Chromium, Firefox, and WebKit
- **Reports**: Test results and Playwright reports are uploaded as artifacts
- **Environment**: Automatically detects CI environment and adjusts settings

### Workflow Features
- Matrix strategy for cross-browser testing
- Dependency caching for faster builds
- Automatic browser installation with system dependencies
- GitHub-integrated test reporting
- Artifact uploads for debugging failed tests

## Writing Tests

Use the Page Object pattern for better maintainability. Example:

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('example test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  expect(await homePage.expectTitle()).toContain('Playwright');
});
```
=======
>>>>>>> b4ccdab (pushed)
