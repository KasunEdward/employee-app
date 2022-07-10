import React from "react";
import Button from "@mui/material/Button";

export const CustomButton = (props) => {
  return (
    <Button variant= {props.variant} color={props.color} type={props.type} onClick={props.onClick}>
      {props.label}
    </Button>
  );
};
