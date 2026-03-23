// Utility functions for tests

export const waitForTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const takeScreenshot = async (page: any, name: string) => {
  await page.screenshot({ path: `screenshots/${name}.png` });
};