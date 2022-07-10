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
        return [...employees, newEmployee];
    }
)

//Delete Employee from local storage
export const DeleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (uuid) => {
        console.log(uuid);
        const employees = await localStorage.getItem('employeeList') ? JSON.parse(localStorage.getItem('employeeList')): [];
        const newEmployees = employees.filter((employee) => employee.uuid !== uuid );
        await localStorage.setItem('employeeList', JSON.stringify(newEmployees));
        return newEmployees;
    }
)