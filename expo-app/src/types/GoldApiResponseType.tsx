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

export default GoldApiResponseType;
