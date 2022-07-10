import React from "react";
import { useForm, Controller } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AddEmployee } from "../../services/employeeService";
import './styles.css';

const SgPhoneRegex = /\+65(6|8|9)\d{7}/g;

//form validation schema
const schema = yup.object().shape({
  firstName: yup.string().min(6).max(10).required(),
  lastName: yup.string().min(6).max(10).required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(SgPhoneRegex, "Invalid phone number").required(),
  gender: yup.string().oneOf(["Male", "Female"]).required().default("Male"),
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

  let navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(AddEmployee(data));
    navigate('../employee/list')

  };

  return (
    <>
    <div className="header">Add Employee</div>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="form-div">
        <InputField
          name="firstName"
          label="First Name"
          error={Boolean(errors.firstName)}
          errorMessage={errors.firstName?.message}
          register={register}
        />
      </div>
      <div className="form-div">
        <InputField
          name="lastName"
          label="Last Name"
          error={Boolean(errors.lastName)}
          errorMessage={errors.lastName?.message}
          register={register}
        />
      </div>
      <div className="form-div">
        <InputField
          name="email"
          label="Email Address"
          error={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          register={register}
        />
      </div>
      <div className="form-div">
        <InputField
          name="phone"
          label="Phone Number"
          error={Boolean(errors.phone)}
          errorMessage={errors.phone?.message}
          register={register}
        />
      </div>
      <div className="form-div">
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <RadioGroup defaultValue="Male" {...field}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          )}
        />
      </div>
      <CustomButton type="submit" label={"Submit"} />
    </form>
    </>
    
  );
};

export default AddEmployeeForm;
