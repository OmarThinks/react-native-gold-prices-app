import { CurrencyOptionsEnum } from "@/options/CurrencyOptions";
import { WeightOptionsEnum } from "@/options/WeightOptions";
import { StorageKeysEnum } from "@/storage/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type goldSelectionSliceState = {
  currency: CurrencyOptionsEnum;
  weightUnit: WeightOptionsEnum;
};

const initialState: goldSelectionSliceState = {
  currency: CurrencyOptionsEnum.USD,
  weightUnit: WeightOptionsEnum.Gram,
};

const goldSelectionSlice = createSlice({
  name: "goldSelectionSlice",
  initialState,
  reducers: {
    setCurrency: (
      state,
      action: PayloadAction<{
        newSelectedCurrencyKey: CurrencyOptionsEnum.USD;
      }>,
    ) => {
      state.currency = action.payload.newSelectedCurrencyKey;
      AsyncStorage.setItem(
        StorageKeysEnum.CURRENCY,
        action.payload.newSelectedCurrencyKey,
      );
    },
    setWeightUnit: (
      state,
      action: PayloadAction<{ newSelectedWeightKey: WeightOptionsEnum.Gram }>,
    ) => {
      state.weightUnit = action.payload.newSelectedWeightKey;
      AsyncStorage.setItem(
        StorageKeysEnum.WEIGHT,
        action.payload.newSelectedWeightKey,
      );
    },
  },
});

const { setCurrency, setWeightUnit } = goldSelectionSlice.actions;
export default goldSelectionSlice;
export { setCurrency, setWeightUnit };
