import { createSlice } from "@reduxjs/toolkit";
import { GetEmployees, AddEmployee, DeleteEmployee, EditEmployee } from "../services/employeeService";

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
            state.employees = action.payload;
        },
        [DeleteEmployee.fulfilled]:(state,action)=>{
            state.employees = action.payload;
        },
        [EditEmployee.fulfilled]:(state,action)=>{
            state.employees = action.payload;
        }
    }
});

export default employeeSlice.reducer;