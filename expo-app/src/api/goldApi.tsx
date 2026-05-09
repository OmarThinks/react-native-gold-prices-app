import GoldApiResponseType from "@/types/GoldApiResponseType";

const getGoldPriceQueryFn = async () => {
  const response = await fetch("https://api.gold-api.com/price/XAU/USD");
  const data = (await response.json()) as GoldApiResponseType;
  return data;
};

export { getGoldPriceQueryFn };
