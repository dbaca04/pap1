import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should have the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AIPAP/);
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check for main navigation elements
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    // Example: Check for specific navigation items
    await expect(nav.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /features/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /documentation/i })).toBeVisible();
  });

  test('should have a main heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();
  });

  test('should have a call to action button', async ({ page }) => {
    await page.goto('/');
    const ctaButton = page.getByRole('link', { name: /get started|sign up|learn more/i });
    await expect(ctaButton).toBeVisible();
  });
});

test.describe('Mobile Navigation', () => {
  test('should show mobile menu when menu button is clicked', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Find and click the mobile menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    
    // Check if mobile menu is visible after click
    const mobileMenu = page.getByRole('navigation', { name: /mobile/i });
    await expect(mobileMenu).toBeVisible();
  });
});
