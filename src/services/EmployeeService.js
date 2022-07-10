import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Employee list from local storage
export const GetEmployees = createAsyncThunk(
    "employee/getEmployees",
    async () => await JSON.parse(localStorage.getItem('employeeList'))
)

//Add new Employee to local storage
export const AddEmployee = createAsyncThunk(
    "employee/addEmployee",
    async (employee) => {
        const uuid = Math.random();
        const newEmployee = {uuid, ...employee};
        const employees = await localStorage.getItem('employeeList') ? JSON.parse(localStorage.getItem('employeeList')): [];
        await localStorage.setItem('employeeList', JSON.stringify([...employees, newEmployee]));
        console.log(newEmployee);
        return newEmployee;
    }
)