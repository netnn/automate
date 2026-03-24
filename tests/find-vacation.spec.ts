import { test } from '@playwright/test';
import { time } from 'console';

test('find vacation deals', async ({ page }) => {
    await page.goto('https://www.holidayfinder.co.il/?movsessid=sh_e73b4f567bfb35affc85e8067926260b#adults=2&babies=0&budget=100,399&children=0&duration=1800&fromwhere=TLV&maxNights=3&minNights=2&nights=2,3&order=-1&rooms=1&sort=best&type=month&weekendsOnly=true&what=83');
    await page.waitForTimeout(5000); // Wait for 5 seconds to ensure the page is fully loaded

try {
    const second_popup = await page.locator('.hfwlc-top-close');
    if (await second_popup.isVisible()) {
        await second_popup.click();
    }
}
catch (error) {
    console.log('No second popup found, continuing with the test.');
}
try{
    
    const first_popup = await page.locator('.close');
    if (await first_popup.isVisible()) { 
        await first_popup.click();
}   
    }
catch (error) {
    console.log('No popup found, continuing with the test.');
}
await page.waitForTimeout(2000);
const cards = await page.locator('.flip-card');
const count = await cards.count();

const deals = [];

for (let i = 0; i < count; i++) {
await page.waitForTimeout(2000);
  const card = cards.nth(i);

const country = await card.locator('.heading-tiny').innerText();
const city = (await card.locator('.text-xl').allInnerTexts())
  .find(t => /^[א-ת\s]+$/.test(t));
  const dateText = await card.locator('.m-details div').first().innerText();
  const nightsMatch = dateText.match(/(\d+)\s*לילות/);
  const nights = nightsMatch ? Number(nightsMatch[1]) : null;

 const priceText = await card.locator('[data-testid="offer-card-price"]').innerText();

const match = priceText.match(/([\d,.]+)/);
const price = match ? Number(match[1].replace(/,/g, '')) : null;

  deals.push({
    destination: { country, city },
    nights,
    price,
    dateText
  });
}

console.log(deals);
});