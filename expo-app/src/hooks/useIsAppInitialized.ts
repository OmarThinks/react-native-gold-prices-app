import { CurrencyOptionsEnum } from "@/options/CurrencyOptions";
import { WeightOptionsEnum } from "@/options/WeightOptions";
import { setUser } from "@/redux/slices/auth/authSlice";
import {
  setCurrency,
  setWeightUnit,
} from "@/redux/slices/goldSelectionsSlice/goldSelectionsSlice";
import { setThemeMode } from "@/redux/slices/themeSlice/themeSlice";
import { useAppDispatch } from "@/redux/store";
import { StorageKeysEnum } from "@/storage/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useEffectEvent, useState } from "react";

const useIsAppInitialized = () => {
  const [isAsyncStorageInitialized, setIsAsyncStorageInitialized] =
    useState(false);

  const dispatch = useAppDispatch();

  const initializeAsyncStorage = useEffectEvent(async () => {
    AsyncStorage.multiGet([
      StorageKeysEnum.CURRENCY,
      StorageKeysEnum.THEME_MODE,
      StorageKeysEnum.USER,
      StorageKeysEnum.WEIGHT,
    ])
      .then((keyValuePair) => {
        for (const [key, value] of keyValuePair) {
          switch (key) {
            case StorageKeysEnum.THEME_MODE:
              dispatch(setThemeMode({ mode: getThemeMode(value) }));
              break;
            case StorageKeysEnum.USER:
              dispatch(setUser(getUserData(value)));
              break;
            case StorageKeysEnum.CURRENCY:
              dispatch(
                setCurrency({
                  newSelectedCurrencyKey: getStoredCurrency(value),
                }),
              );
              break;
            case StorageKeysEnum.WEIGHT:
              dispatch(
                setWeightUnit({
                  newSelectedWeightKey: getStoredWeight(value),
                }),
              );
              break;

            default:
              break;
          }
        }
      })
      .catch((error) => {
        console.log("Something went wrong on initialization", error);
      })
      .finally(() => {
        setIsAsyncStorageInitialized(true);
      });
  });

  useEffect(() => {
    initializeAsyncStorage();
  }, []);

  const isAppInitialized = isAsyncStorageInitialized;

  return isAppInitialized;
};

const getThemeMode = (storedValue: string | null): "light" | "dark" => {
  if (storedValue === "light") {
    return "light";
  } else {
    return "dark";
  }
};

const getUserData = (storedValue: string | null): object | null => {
  if (typeof storedValue === "string") {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error("Error initializing auth:", error);
    }
  }

  return null;
};

const getStoredCurrency = (storedValue: string | null): CurrencyOptionsEnum => {
  if (storedValue === null) {
    return CurrencyOptionsEnum.USD;
  }

  for (const key in CurrencyOptionsEnum) {
    const value = CurrencyOptionsEnum[key as keyof typeof CurrencyOptionsEnum];
    if (storedValue === value) {
      return value;
    }
  }

  return CurrencyOptionsEnum.USD;
};

const getStoredWeight = (storedValue: string | null): WeightOptionsEnum => {
  if (storedValue === null) {
    return WeightOptionsEnum.Gram;
  }

  for (const key in WeightOptionsEnum) {
    const value = WeightOptionsEnum[key as keyof typeof WeightOptionsEnum];
    if (storedValue === value) {
      return value;
    }
  }

  return WeightOptionsEnum.Gram;
};

export { useIsAppInitialized };
