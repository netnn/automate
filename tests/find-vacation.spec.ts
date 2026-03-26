import { test } from '@playwright/test';
import { HolidayPage } from '../pages/vacation-deals/HolidayPage';
import { get } from 'http';
import { writeFile } from 'fs/promises';

test('find vacation deals', async ({ page }) => {
  const holidayPage = new HolidayPage(page);

  await holidayPage.goto();
    await holidayPage.waitForDeals();
  await holidayPage.closePopups();
  await holidayPage.scrollToDeals();

  const getdeals = await holidayPage.dealsOrderedByPrice();
  // console.log(deals);

  // save JSON in workspace artifact folder
  await writeFile('test-results/deals.json', JSON.stringify(getdeals, null, 2), 'utf-8');
});