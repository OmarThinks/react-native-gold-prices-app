import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import goldSelectionSlice from "./slices/goldSelectionsSlice/goldSelectionsSlice";
import themeSlice from "./slices/themeSlice/themeSlice";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [goldSelectionSlice.name]: goldSelectionSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => store.dispatch as AppDispatch;

export { store, useAppDispatch };
export type { AppDispatch, RootState };
