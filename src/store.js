import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from './slices/employee';

export default configureStore({
  reducer: {
    employee:employeeSlice
  },
});