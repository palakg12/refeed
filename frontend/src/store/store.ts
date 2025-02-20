import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice"; // Import your task slice reducer

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // Add the task reducer to the store
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
