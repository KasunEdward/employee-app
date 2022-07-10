import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import EmployeeList from "./feature/Employee";
import AddEmployee from "./feature/Employee/AddEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* set app default path to /employee/list */}
        <Route path="/" element={<Navigate to="/employee" />} />
        <Route path="/employee" element={<Navigate to="/employee/list" />} />
        <Route path="/employee/list" element={<EmployeeList />} />
        <Route path="/employee/add" element={<AddEmployee />} />
        {/* set path not listed to /employee/list */}
        <Route path="*" element={<Navigate to="/employee" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
