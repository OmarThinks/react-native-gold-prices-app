import { WeightOptionsEnum } from "@/options/WeightOptions";
import { getWeightConversionFactor } from "./weightUnitsConversion";

function formatCurrencyCustom(value: number): string {
  // 1. Force two decimal places and convert to string
  const fixedValue = value.toFixed(2);

  // 2. Split the integer part from the decimal part
  const [integerPart, decimalPart] = fixedValue.split(".");

  // 3. Use regex to add the ' separator every three digits
  // The regex \B(?=(\d{3})+(?!\d)) looks for a position that is
  // followed by a multiple of 3 digits.
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'");

  return `${formattedInteger}.${decimalPart}`;
}

const getPriceText = ({
  karat,
  multiplier,
  currencySymbol,
  selectedWeightKey,
  price,
}: {
  karat: number;
  multiplier: number;
  currencySymbol: string;
  selectedWeightKey: WeightOptionsEnum;
  price: number;
}) => {
  const fullPrice =
    (price ?? 0) * getWeightConversionFactor({ weightType: selectedWeightKey });

  const thePrice = (fullPrice * karat * multiplier) / 24;

  return (currencySymbol ?? "") + formatCurrencyCustom(thePrice);
};

export { getPriceText };
