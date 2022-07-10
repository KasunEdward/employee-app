import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import EmployeeList from "./features/Employee";
import AddEmployeeForm from "./features/Employee/AddEmployeeForm";
import EditEmployeeForm from "./features/Employee/EditEmployeeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* set app default path to /employee/list */}
        <Route path="/" element={<Navigate to="/employee" />} />
        <Route path="/employee" element={<Navigate to="/employee/list" />} />
        <Route path="/employee/list" element={<EmployeeList />} />
        <Route path="/employee/add" element={<AddEmployeeForm />} />
        <Route path="/employee/edit" element={<EditEmployeeForm />} />
        {/* set path not listed to /employee/list */}
        <Route path="*" element={<Navigate to="/employee" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
