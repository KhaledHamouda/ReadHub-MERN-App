import { configureStore } from '@reduxjs/toolkit';
import DataSlice from './DataSlice';
import { useDispatch } from 'react-redux';

const DataStore = configureStore({
  reducer: {
    DataReducer: DataSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof DataStore.getState>;
export type AppDispatch = typeof DataStore.dispatch;

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default DataStore;
