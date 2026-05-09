import { OptionsType } from "@/types/OptionsType";

enum WeightOptionsEnum {
  Gram = "g",
  Kilogram = "kg",
  Oz = "oz",
  Pound = "lb",
  Milligram = "mg",
}

const WeightOptions: OptionsType = [
  { id: WeightOptionsEnum.Gram, title: "Gram (g)" },
  { id: WeightOptionsEnum.Oz, title: "Oz" },
  { id: WeightOptionsEnum.Pound, title: "Pound (lb)" },
  { id: WeightOptionsEnum.Kilogram, title: "Kilogram" },
  { id: WeightOptionsEnum.Milligram, title: "Milligrams (mg)" },
];

export { WeightOptions, WeightOptionsEnum };
