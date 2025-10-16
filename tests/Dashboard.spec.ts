import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.describe('Dashboard Page', () => {
  test('should have correct metadata and elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Post-Viewer/);

    await expect(
      page.getByRole('heading', {
        name: 'Favorite Posts Viewer',
      }),
    ).toBeVisible();
  });
  test('should debounce search input and filter posts after delay', async ({ page }) => {
    const input = page.getByRole('textbox');
    const firstExpectedResult = 'libero voluptate eveniet';
    const wrongResult = 'quia et suscipit';

    await input.fill('artote');
    await input.fill('saesa');
    await input.fill('libero voluptate eveniet');

    await expect(page.locator('text=' + firstExpectedResult)).not.toBeVisible();
    await page.waitForTimeout(320);
    await expect(page.locator('text=' + firstExpectedResult)).toBeVisible();

    await expect(page.locator('text=' + wrongResult)).not.toBeVisible();
  });
  test('should allow the user to add posts to favorites and save them after reloading', async ({
    page,
  }) => {
    const postCard = page.locator('[data-testid="post-card"]').first();
    await expect(postCard).toBeVisible();

    const favIcon = postCard.getByTestId('fav-toggle');
    favIcon.click();

    const badge = page.getByTestId('fav-badge');
    await expect(badge).toHaveText('1');

    await page.reload();

    const favoriteStorage = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('FAVORITES') || '[]');
    });
    await page.waitForTimeout(500);
    expect(Array.isArray(favoriteStorage)).toBeTruthy();
    expect(favoriteStorage.length).toBeGreaterThan(0);
  });
});
