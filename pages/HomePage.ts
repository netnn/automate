import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async getStarted() {
    await this.page.getByRole('link', { name: 'Get started' }).click();
  }

  async expectTitle() {
    await this.page.waitForLoadState();
    return this.page.title();
  }
}