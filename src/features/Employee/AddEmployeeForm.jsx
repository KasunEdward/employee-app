import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AddEmployee } from "../../services/employeeService";

const SgPhoneRegex = /\+65(6|8|9)\d{7}/g;

//form validation schema
const schema = yup.object().shape({
  firstName: yup.string().min(6).max(10).required(),
  lastName: yup.string().min(6).max(10).required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(SgPhoneRegex, "Invalid phone number").required(),
  gender: yup.string().oneOf(["Male", "Female"]).required(),
});

const AddEmployeeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(AddEmployee(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Controller
      name="firstName"
      control={control}
      render={({ field }) => <InputField label={"firstName"} value={field.value} error={!!errors.firstName} errorMessage={errors?.firstName?.message}{...field} />}
      /> */}
      <InputField
        name="firstName"
        label="firstName"
        error={Boolean(errors.firstName)}
        errorMessage={errors.firstName?.message}
        register = {register}
      />
{/* 
      <TextField 
          id="outlined-basic" 
          name="firstName" 
          label="First Name" 
          variant="outlined" 
          fullWidth 
          {...register("firstName")}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
        /> */}

      <input {...register("lastName")} />
      <p>{errors.lastName?.message}</p>

      <input {...register("email")} />
      <p>{errors.email?.message}</p>

      <input {...register("phone")} />
      <p>{errors.phone?.message}</p>

      <input {...register("gender")} />
      <p>{errors.gender?.message}</p>

      <input type="submit" />
    </form>
  );
};

export default AddEmployeeForm;
