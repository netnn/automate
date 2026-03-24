import { test } from '@playwright/test';
import { HolidayPage } from '../pages/vacation-deals/HolidayPage';

test('find vacation deals', async ({ page }) => {
  const holidayPage = new HolidayPage(page);

  await holidayPage.goto();
  await holidayPage.closePopups();

  const deals = await holidayPage.getDeals();

  console.log(deals);
});