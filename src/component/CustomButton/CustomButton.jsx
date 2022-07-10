import React from "react";
import Button from "@mui/material/Button";

export const CustomButton = (props) => {
  return (
    <Button variant="contained" onClick={props.onClick}>
      {props.label}
    </Button>
  );
};
