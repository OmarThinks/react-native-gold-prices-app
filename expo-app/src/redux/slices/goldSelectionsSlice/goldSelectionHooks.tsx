import { CurrencyOptionsEnum } from "@/options/CurrencyOptions";
import { WeightOptionsEnum } from "@/options/WeightOptions";
import { RootState, useAppDispatch } from "@/redux/store";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { setCurrency, setWeightUnit } from "./goldSelectionsSlice";

const useSelectedCurrencyKey = () => {
  const dispatch = useAppDispatch();

  const selectedCurrencyKey = useSelector(
    (state: RootState) => state.goldSelectionSlice.currency,
  );

  const setSelectedCurrencyKey = useCallback(
    (selectedCurrencyKey: CurrencyOptionsEnum) => {
      dispatch(setCurrency({ newSelectedCurrencyKey: selectedCurrencyKey }));
    },
    [dispatch],
  );

  return { selectedCurrencyKey, setSelectedCurrencyKey };
};

const useSelectedWeightKey = () => {
  const selectedWeightKey = useSelector(
    (state: RootState) => state.goldSelectionSlice.weightUnit,
  );

  const dispatch = useAppDispatch();

  const setSelectedWeightKey = useCallback(
    (selectedWeightKey: WeightOptionsEnum) => {
      dispatch(setWeightUnit({ newSelectedWeightKey: selectedWeightKey }));
    },
    [dispatch],
  );

  return { selectedWeightKey, setSelectedWeightKey };
};

export { useSelectedCurrencyKey, useSelectedWeightKey };
