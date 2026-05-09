import { OptionsType } from "@/types/OptionsType";

enum CurrencyOptionsEnum {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  CAD = "CAD",
  AUD = "AUD",
  CHF = "CHF",
  CNY = "CNY",
  HKD = "HKD",
  SGD = "SGD",
  SEK = "SEK",
  NOK = "NOK",
  DKK = "DKK",
  NZD = "NZD",
  MXN = "MXN",
  INR = "INR",
  BRL = "BRL",
  ZAR = "ZAR",
  KRW = "KRW",
}

const CurrencyOptions: OptionsType<CurrencyOptionsEnum> = [
  { id: CurrencyOptionsEnum.USD, title: "USD (United States dollar)" },
  { id: CurrencyOptionsEnum.EUR, title: "EUR (Euro)" },
  { id: CurrencyOptionsEnum.GBP, title: "GBP (Sterling)" },
  { id: CurrencyOptionsEnum.JPY, title: "JPY (Japanese yen)" },
  { id: CurrencyOptionsEnum.CAD, title: "CAD (Canadian dollar)" },
  { id: CurrencyOptionsEnum.AUD, title: "AUD (Australian dollar)" },
  { id: CurrencyOptionsEnum.CHF, title: "CHF (Swiss franc)" },
  { id: CurrencyOptionsEnum.CNY, title: "CNY (Renminbi)" },
  { id: CurrencyOptionsEnum.HKD, title: "HKD (Hong Kong dollar)" },
  { id: CurrencyOptionsEnum.SGD, title: "SGD (Singapore dollar)" },
  { id: CurrencyOptionsEnum.SEK, title: "SEK (Swedish krona)" },
  { id: CurrencyOptionsEnum.NOK, title: "NOK (Norwegian krone)" },
  { id: CurrencyOptionsEnum.DKK, title: "DKK (Danish krone)" },
  { id: CurrencyOptionsEnum.NZD, title: "NZD (New Zealand dollar)" },
  { id: CurrencyOptionsEnum.MXN, title: "MXN (Mexican peso)" },
  { id: CurrencyOptionsEnum.INR, title: "INR (Indian rupee)" },
  { id: CurrencyOptionsEnum.BRL, title: "BRL (Brazilian real)" },
  { id: CurrencyOptionsEnum.ZAR, title: "ZAR (South African rand)" },
  { id: CurrencyOptionsEnum.KRW, title: "KRW (South Korean won)" },
];

export { CurrencyOptions, CurrencyOptionsEnum };
