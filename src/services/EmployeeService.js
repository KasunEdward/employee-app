import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetEmployees = createAsyncThunk(
    "employee/getEmployees",
    async () => await JSON.parse(localStorage.getItem('employeeList'))
)