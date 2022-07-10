import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { GetEmployees } from "../../services/employeeService";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const columnDefs = [
    { field: "uuid", hide: true },
    { field: "firstName" },
    { field: "lastName" },
    { field: "email" },
    { field: "phone" },
    { field: "gender" },
  ];
  useEffect(() => {
    dispatch(GetEmployees())
  }, []);

  const { employees } = useSelector((state) => state.employee);

  let navigate = useNavigate();

  const handleClickAdd = (event) => {
    event.preventDefault();
    navigate("../employee/add");
  };
  return (
    <>
      <CustomButton onClick={handleClickAdd} label={"ADD"} />
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={employees} columnDefs={columnDefs}></AgGridReact>
      </div>
    </>
  );
};

export default EmployeeList;
