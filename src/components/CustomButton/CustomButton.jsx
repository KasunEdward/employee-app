import React from "react";
import Button from "@mui/material/Button";

export const CustomButton = (props) => {
  return (
    <Button variant="contained" type={props.type} onClick={props.onClick}>
      {props.label}
    </Button>
  );
};
