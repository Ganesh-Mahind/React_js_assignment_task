import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/tableSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});
