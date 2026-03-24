
export function parseCity(texts: string[]): string | null {
  return texts.find(t => /^[א-ת\s]+$/.test(t)) || null;
}

export function parseNights(dateText: string): number | null {
  const match = dateText.match(/(\d+)\s*לילות/);
  return match ? Number(match[1]) : null;
}

export function parsePrice(priceText: string): number | null {
  const match = priceText.match(/([\d,.]+)/);
  return match ? Number(match[1].replace(/,/g, '')) : null;
}