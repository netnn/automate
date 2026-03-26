import { test } from '@playwright/test';
import { HolidayPage } from '../pages/vacation-deals/HolidayPage';
import { get } from 'http';
import { writeFile } from 'fs/promises';
import UserData from './data/find-vacation-data';

test('find vacation deals', async ({ page }) => {
  const holidayPage = new HolidayPage(page);
  const testUrl = UserData.url;


  await holidayPage.goto();
    await holidayPage.waitForDeals();
  await holidayPage.closePopups();
  await holidayPage.scrollToDeals();

  const getdeals = await holidayPage.dealsOrderedByPrice();
  // console.log(deals);
const jsonData = {
  testUrl,
  deals: getdeals
};
await writeFile('test-results/deals.json', JSON.stringify(jsonData, null, 2), 'utf-8');
  
});