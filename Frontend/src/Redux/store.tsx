import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";

const DataStore = configureStore({
  reducer: {
    DataReducer: DataSlice,
  },
});
export type RootState = ReturnType<typeof DataStore.getState>;
export default DataStore;