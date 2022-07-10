import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { GetEmployees } from "../../services/employeeService";
import './styles.css';

const EmployeeList = () => {
  const dispatch = useDispatch();

  const btnCellRenderer = (params) => {
    return (
      <>
        <CustomButton onClick={() => console.log(params)} label={"Edit"} />
        <CustomButton onClick={() => console.log("edit")} label={"Edit"} />
      </>
    );
  };

  const columnDefs = [
    { field: "uuid", hide: true },
    { field: "firstName" },
    { field: "lastName" },
    { field: "email" },
    { field: "phone" },
    { field: "gender" },
    {
      headerName: "action",
      minWidth: 150,
      cellRenderer: btnCellRenderer,
      editable: false,
      colId: "action",
    },
  ];
  useEffect(() => {
    dispatch(GetEmployees());
  }, []);

  const { employees } = useSelector((state) => state.employee);

  let navigate = useNavigate();

  const handleClickAdd = (event) => {
    event.preventDefault();
    navigate("../employee/add");
  };

  return (
    <>
      <div className="add-button-div">
        <CustomButton onClick={handleClickAdd} label={"ADD"} />
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: 1200, margin: "auto" }}
      >
        <AgGridReact rowData={employees} columnDefs={columnDefs}></AgGridReact>
      </div>
    </>
  );
};

export default EmployeeList;
