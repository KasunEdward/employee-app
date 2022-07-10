import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomButton from "../../components/CustomButton";
import CustomDialog from "../../components/CustomDialog";
import { useNavigate } from "react-router-dom";
import { GetEmployees, DeleteEmployee } from "../../services/employeeService";
import "./styles.css";

const EmployeeList = () => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // edit and delete buttons renddering component for grid
  const btnCellRenderer = (params) => {
    return (
      <>
        <CustomButton onClick={(event)=>{handleClickEdit(event,params)}} label={"Edit"} />
        <CustomButton
          onClick={() => {
            handleClickDelete(params);
          }}
          label={"Delete"}
        />
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

  // Handle Add button click
  const handleClickAdd = (event) => {
    event.preventDefault();
    navigate("../employee/add");
  };

  // Handle Edit button click
  const handleClickEdit = (event, params) => {
    event.preventDefault();
    navigate("../employee/edit", {state: params.data});
  };

  // Handle delete button click
  const handleClickDelete = (params) => {
    setSelectedData(params.data.uuid);
    setOpenDialog(true);
  };

  const handleDialogOk = () => {
    dispatch(DeleteEmployee(selectedData));
    setSelectedData(null);
    setOpenDialog(false);
  };

  const handleDialogCancel = () => {
    setSelectedData(null);
    setOpenDialog(false);
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
      <CustomDialog
        open={openDialog}
        title="Delete Employee"
        content="Are you sure to delete?"
        cancelLabel="Cancel"
        okLabel="Yes"
        handleCancel={handleDialogCancel}
        handleOk={handleDialogOk}
      />
    </>
  );
};

export default EmployeeList;
