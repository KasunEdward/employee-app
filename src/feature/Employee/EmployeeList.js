import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmployeeActions } from "./actions";

const EmployeeList = () => {
  const [rowData, setRowData] = useState([]);
  const columnDefs = [
    { field: "uuid", hide: true },
    { field: "firstName" },
    { field: "lastName" },
    { field: "email" },
    { field: "phone" },
    { field: "gender" },
  ];
  useEffect(() => {
    EmployeeActions.getEmployee().then(
      (response) => {
        setRowData(response);
      },
      (error) => {
        console.log("ghghgh");
      }
    );
  }, []);

  let navigate = useNavigate();

  const handleClickAdd = (event) => {
    event.preventDefault();
    navigate("../employee/add");
  };
  return (
    <>
      <Button onClick={handleClickAdd}>Add</Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </>
  );
};

export default EmployeeList;
