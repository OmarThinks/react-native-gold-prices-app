import { setUser } from "@/redux/slices/auth/authSlice";
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
          console.log(key, value);

          switch (key) {
            case StorageKeysEnum.THEME_MODE:
              dispatch(setThemeMode({ mode: getThemeMode(value) }));
              break;
            case StorageKeysEnum.USER:
              dispatch(setUser(getUserData(value)));

            default:
              break;
          }
        }
      })
      .catch(() => {})
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

export { useIsAppInitialized };
