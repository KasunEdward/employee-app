import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import LeavingPopup from "../../components/LeavingPopup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { EditEmployee } from "../../services/employeeService";
import * as Utils from '../../utils.js';
import { useNavigatingAway } from "../../hooks/useNavigatingAway";
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
  const dispatch = useDispatch();
  const [canShowDialogLeavingPage, setCanShowDialogLeavingPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors, isSubmitting, isSubmitSuccessful},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: location.state,
  });

  const [
    showDialogLeavingPage,
    confirmNavigation,
    cancelNavigation
  ] = useNavigatingAway(canShowDialogLeavingPage);

  useEffect(()=>{
    setCanShowDialogLeavingPage(isDirty);
  },[isDirty]);

  //navigate to /employee/list page when submit success
  useEffect(()=>{
    if(isSubmitSuccessful){
      navigate("../employee/list");
    }
  },[isSubmitSuccessful]);


  const onSubmit = (data) => {
    setCanShowDialogLeavingPage(false);
    const updatedRec = { ...data, uuid: location.state.uuid };
    dispatch(EditEmployee(updatedRec));
  };

  const handleGoBack = () => {
    navigate("../employee/list");
  }

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
        <div className="form-div">
          <div className="form-button-div">
            <CustomButton variant='contained' onClick={handleGoBack} color="error" label={"Cancel"} />
          </div>
          <div className="form-button-div">
            <CustomButton variant='contained' type="submit" label={"Submit"} />
          </div>
        </div>
      </form>
      <LeavingPopup
        showDialog={showDialogLeavingPage}
        setShowDialog={setCanShowDialogLeavingPage}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />
    </>
  );
};

export default EditEmployeeForm;
