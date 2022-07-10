export const EmployeeService = {
    // get employees arrray
    getEmployee: async() => {
        const employeeList = await localStorage.getItem('employeeList');
        return JSON.parse(employeeList);
    }
}