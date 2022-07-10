import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { EditEmployee } from "../../services/employeeService";
import * as Utils from '../../utils.js';
import "./styles.css";

//form validation schema
const schema = yup.object().shape({
  firstName: yup.string().min(6).max(10).required(),
  lastName: yup.string().min(6).max(10).required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(Utils.SgPhoneRegex, "Invalid phone number").required(),
  gender: yup.string().oneOf(["Male", "Female"]).required().default("Male"),
});

const EditEmployeeForm = (props) => {
  const [isDirty, setIsDirty] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: location.state,
  });

  const onSubmit = (data) => {
    const updatedRc = { ...data, uuid: location.state.uuid };
    dispatch(EditEmployee(updatedRc));
    setIsDirty(false);
    navigate("../employee/list");
  };

  return (
    <>
      <div className="header">{"Edit Employee"}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
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

export default EditEmployeeForm;
