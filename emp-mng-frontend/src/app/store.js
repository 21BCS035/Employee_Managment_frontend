import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from "../services/EmployeeSlice";

export const store = configureStore({
    reducer: {
     employee:employeeReducer,
    },
  });