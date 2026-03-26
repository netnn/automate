import { test } from '@playwright/test';
import { HolidayPage } from '../pages/vacation-deals/HolidayPage';
import { get } from 'http';

test('find vacation deals', async ({ page }) => {
  const holidayPage = new HolidayPage(page);

  await holidayPage.goto();
    await holidayPage.waitForDeals();
  await holidayPage.closePopups();
  await holidayPage.scrollToDeals();

  const getdeals = await holidayPage.dealsOrderedByPrice();
  console.log(getdeals);


});