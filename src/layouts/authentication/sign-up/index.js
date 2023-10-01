// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import pxToRem from "assets/theme/functions/pxToRem";
import { useState } from "react";
import { openSnackbar } from "redux/Slice/Notification";
import Constants from "utils/Constants";
import Validations from "utils/Validations";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { signUpUser } from "redux/Thunks/Authentication";

function Cover() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee",
    gender: "",
    hobbies: "",
    address: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const firstNameValidation = Validations.validate("basic", data.firstName, 3, 30, true);
    const lastNameValidation = Validations.validate("basic", data.lastName, 3, 30, true);
    const genderValidation = Validations.validate("basic2", data.gender, 3, 30, true);
    const hobbiesValidation = Validations.validate("basic2", data.hobbies, 3, 30, true);
    const emailValidation = Validations.validate("email", data.email, null, null, true);
    const passwordValidation = Validations.validate("password", data.password, 6, 30, true);
    const confirmPasswordValidation = Validations.validate(
      "confirmPassword",
      data.confirmPassword,
      6,
      30,
      true,
      data.password
    );

    const newErrors = {};

    if (firstNameValidation !== "") {
      newErrors.firstName = firstNameValidation;
    }
    if (lastNameValidation !== "") {
      newErrors.lastName = lastNameValidation;
    }

    if (genderValidation !== "") {
      newErrors.gender = genderValidation;
    }
    if (hobbiesValidation !== "") {
      newErrors.hobbies = hobbiesValidation;
    }
    if (emailValidation !== "") {
      newErrors.email = emailValidation;
    }
    if (passwordValidation !== "") {
      newErrors.password = passwordValidation;
    }
    if (confirmPasswordValidation !== "") {
      newErrors.confirmPassword = confirmPasswordValidation;
    }

    if (
      confirmPasswordValidation === "" &&
      passwordValidation === "" &&
      data.password !== data.confirmPassword
    ) {
      newErrors.confirmPassword = "Password and confirm password should be same";
    }

    setErrors(newErrors);
    return Object.values(newErrors).filter((val) => val !== "").length === 0;
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetModal = () => {
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const val = validate();
    if (val) {
      setIsSubmitting(true);
      const newData = {
        ...data,
      };
      const res = await dispatch(signUpUser(newData));
      if (res.payload.status === 200) {
        handleResetModal();

        dispatch(
          openSnackbar({
            message: Constants.USER_CREATE_SUCCESS,
            notificationType: Constants.NOTIFICATION_SUCCESS,
          })
        );
        navigate("/authentication/sign-in");
      } else {
        setErrors({ name: res.payload.data.message });
      }
    }
    setIsSubmitting(false);
    setLoading(false);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card sx={{ width: pxToRem(450), backgroundColor: "#eceff7" }}>
        <MDBox
          variant="gradient"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
          sx={{ backgroundColor: "#191A51" }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                name="firstName"
                variant="standard"
                fullWidth
                onChange={handleChange}
              />
              <MDTypography variant="caption" color="error" display="flex" mt={1}>
                {errors.firstName}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last Name"
                name="lastName"
                variant="standard"
                fullWidth
                onChange={handleChange}
              />
              <MDTypography variant="caption" color="error" display="flex" mt={1}>
                {errors.lastName}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  sx={{
                    height: 45,
                    minWidth: "100%",
                    "& .MuiInputBase-input": {
                      fontSize: pxToRem(16),
                      fontWeight: 400,
                      color: "#667085",
                    },
                    textTransform: "capitalize",
                    backgroundColor: "black",
                    paddingY: "0.65rem",
                    paddingRight: "0.55rem",
                    maxHeight: 100,
                    cursor: "pointer",
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <MDTypography variant="caption" color="error" display="flex" mt={1}>
                {errors.gender}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Hobbies"
                name="hobbies"
                variant="standard"
                fullWidth
                onChange={handleChange}
              />
              <MDTypography variant="caption" color="error" display="flex" mt={1}>
                {errors.hobbies}
              </MDTypography>
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                onChange={handleChange}
              />
              <MDTypography variant="caption" color="error" display="flex" mt={1}>
                {errors.email}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                label="Password"
                variant="standard"
                fullWidth
                onChange={handleChange}
              />
              <MDTypography variant="caption" color="error" display="flex" mt={1}>
                {errors.password}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                variant="standard"
                fullWidth
                onChange={handleChange}
              />
              <MDTypography variant="caption" color="error" display="flex" mt={1}>
                {errors.confirmPassword}
              </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                checked={data.role === "manager"}
                onClick={(e) =>
                  handleChange({
                    target: {
                      name: "role",
                      value: e.target.checked ? "manager" : "employee",
                    },
                  })
                }
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Manager
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                sx={{ backgroundColor: "#191A51", color: "#fff" }}
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {loading ? "Registering.." : "sign Up"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
