import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./slices/bagSlice";

export const store = configureStore({
  reducer: {
    bag: bagReducer,
  },
});
