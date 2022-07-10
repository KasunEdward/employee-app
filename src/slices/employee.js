import { createSlice } from "@reduxjs/toolkit";
import { GetEmployees } from "../services/employeeService";

const employeeSlice = createSlice({
    name: "employee",
    initialState:{
        employees:[]
    },
    extraReducers:{
        [GetEmployees.fulfilled]:(state,action)=>{
            state.employees = action.payload;
        }
    }
});

export default employeeSlice.reducer;