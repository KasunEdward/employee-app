import React from "react";
import TextField from '@mui/material/TextField';

export const InputField = (props) => {
  return (
    <TextField
    id="outlined-basic"
    {...(props.register && props.register(props.name))}
    name={props.name}
    label={props.label}
    error={props.error}
    helperText={props.errorMessage}
    // defaultValue="Hello World"
  />
  );
};