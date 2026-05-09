/*
Grams (g)	28.35	28.35 g
Pounds (lb)	0.0625	0.0625 lb (or 1/16 lb)
Kilograms (kg)	0.0283	0.0283 kg
Milligrams (mg)	28,349.5	28,349.5 mg
*/

import { WeightOptionsEnum } from "@/options/WeightOptions";

const getWeightConversionFactor = ({
  weightType,
}: {
  weightType: WeightOptionsEnum;
}) => {
  switch (weightType) {
    case WeightOptionsEnum.Oz:
      return 1;
    case WeightOptionsEnum.Gram:
      return 1 / 28.35;
    case WeightOptionsEnum.Pound:
      return 16;
    case WeightOptionsEnum.Kilogram:
      return 1 / 0.0283;
    case WeightOptionsEnum.Milligram:
      return 1 / 28349.5;

    default:
      return 0;
  }
};

export { getWeightConversionFactor };
