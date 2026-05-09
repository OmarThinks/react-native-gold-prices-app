type GoldApiResponseType = {
  currency: string;
  currencySymbol: string;
  exchangeRate: number;
  name: string;
  price: number;
  symbol: string;
  updatedAt: string;
  updatedAtReadable: string;
};

const getGoldPriceQueryFn = async () => {
  const response = await fetch("https://api.gold-api.com/price/XAU/USD");
  const data = (await response.json()) as GoldApiResponseType;
  return data;
};

/*{
  "currency": "USD",
  "currencySymbol": "$",
  "exchangeRate": 1,
  "name": "Gold",
  "price": 4715.700195,
  "symbol": "XAU",
  "updatedAt": "2026-05-09T13:10:55Z",
  "updatedAtReadable": "a few seconds ago"
}*/

export { getGoldPriceQueryFn };
export type { GoldApiResponseType };
