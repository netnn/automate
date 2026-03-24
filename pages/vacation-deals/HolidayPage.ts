import { parseCity, parseNights, parsePrice } from '../../utils/vacation-deals/dealParser';

export class HolidayPage {
    readonly page: any;
    readonly cards: any;    

  constructor(page: any) {
    this.page = page; 
    this.cards = page.locator('.flip-card');
  }

  async goto() {
    await this.page.goto(process.env.FLIGHT_DEALS_URL);
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

      deals.push({
        destination: { country, city },
        nights,
        price,
        dateText
      });
    }

    return deals;
  }
}