import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const postCard = page.locator('[data-testid="post-card"]').first();
  await expect(postCard).toBeVisible();
  const loadMore = postCard.getByTestId('load-details-post');
  await loadMore.click();
});

test.describe('Skeleton test Comments', () => {
  test('should be seen skeleton of comments on loading', async ({ page }) => {
    const comments = page.getByText('ID LABORE EX ET QUAM LABORUM');
    await expect(comments).not.toBeVisible();
    await page.waitForTimeout(2000);
    await expect(comments).toBeVisible();
  });
});
