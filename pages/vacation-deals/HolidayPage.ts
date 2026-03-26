import { parseCity, parseNights, parsePrice } from '../../utils/vacation-deals/dealParser';

export class HolidayPage {
    readonly page: any;
    readonly cards: any;    

  constructor(page: any) {
    this.page = page; 
    this.cards = page.locator('.flip-card');
  }

  async goto() {
    await this.page.goto('https://www.holidayfinder.co.il/?#adults=2&babies=0&budget=100,399&children=0&duration=1800&fromwhere=TLV&maxNights=3&minNights=2&nights=2,3&order=-1&rooms=1&sort=best&type=month&weekendsOnly=true&what=83');
  }

  async closePopups() {
    const selectors = ['.hfwlc-top-close', '.close'];

    for (const selector of selectors) {
      const el = this.page.locator(selector);
      if (await el.isVisible().catch(() => false)) {
        await el.click();
      }
    }
  }

  async waitForDeals() {
    await this.cards.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async scrollToDeals()
  {    await this.page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
  }

  async getDeals() {
    const deals = [];
    const count = await this.cards.count();

    for (let i = 0; i < count; i++) {
      const card = this.cards.nth(i);

      const country = await card.locator('.heading-tiny').innerText();

      const texts = await card.locator('.text-xl').allInnerTexts();
      const city = parseCity(texts);

      const dateText = await card.locator('.m-details div').first().innerText();
      const nights = parseNights(dateText);

      const priceText = await card.locator('[data-testid="offer-card-price"]').innerText();
      const price = parsePrice(priceText);

      if (price !== null) {
        deals.push({
          destination: { country, city },
          nights,
          price,
          dateText
        });
      }
    }

    return deals;
  }
  async dealsOrderedByPrice() {
    const deals = await this.getDeals();
    return deals.sort((a, b) => a.price - b.price);
  }
}