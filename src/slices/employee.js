import { createSlice } from "@reduxjs/toolkit";
import { GetEmployees, AddEmployee } from "../services/employeeService";

const employeeSlice = createSlice({
    name: "employee",
    initialState:{
        employees:[]
    },
    extraReducers:{
        [GetEmployees.fulfilled]:(state,action)=>{
            state.employees = action.payload;
        },
        [AddEmployee.fulfilled]:(state,action)=>{
            state.employees.unshift(action.payload)
        }
    }
});

export default employeeSlice.reducer;