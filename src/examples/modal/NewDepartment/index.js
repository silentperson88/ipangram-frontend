/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { Grid, Icon, Modal, TextField } from "@mui/material";
import style from "assets/style/Modal";
import pxToRem from "assets/theme/functions/pxToRem";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import ModalTitle from "examples/NewDesign/ModalTitle";
import Validations from "utils/Validations/index";
import Constants, { Icons } from "utils/Constants";
import { useDispatch } from "react-redux";
import { openSnackbar } from "redux/Slice/Notification";
import createDepartment, { updateDepartment } from "redux/Thunks/Department";

function index({ open, handleClose, currentDepartment }) {
  const [values, setValues] = useState({
    departmentName: "",
    categoryName: "",
    location: "",
    salary: "",
    employeeID: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const disptach = useDispatch();

  useEffect(() => {
    console.log(currentDepartment);
    if (currentDepartment) {
      setValues({
        departmentName: currentDepartment.departmentName,
        categoryName: currentDepartment.categoryName,
        location: currentDepartment.location,
        salary: currentDepartment.salary,
        employeeID: currentDepartment.employeeID,
      });
    }
  }, [currentDepartment]);

  const validate = () => {
    const departmentNameValidate = Validations.validate(
      "basic",
      values.departmentName,
      3,
      30,
      true
    );
    const categoryNameValidate = Validations.validate("basic", values.categoryName, 3, 30, true);
    const locationValidate = Validations.validate("basic", values.location, 3, 30, true);
    const salaryValidate = Validations.validate("basic2", values.salary, 3, 30, true);
    const employeeIDValidate = Validations.validate("basic", values.employeeID, 3, 30, true);

    const newErrors = {};

    if (departmentNameValidate !== "") {
      newErrors.departmentName = departmentNameValidate;
    }
    if (categoryNameValidate !== "") {
      newErrors.categoryName = categoryNameValidate;
    }

    if (locationValidate !== "") {
      newErrors.location = locationValidate;
    }
    if (salaryValidate !== "") {
      newErrors.salary = salaryValidate;
    }
    if (employeeIDValidate !== "") {
      newErrors.employeeID = employeeIDValidate;
    }

    setErrors(newErrors);
    return Object.values(newErrors).filter((val) => val !== "").length === 0;
  };
  const handleResetModal = () => {
    setErrors({});
    handleClose();
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const val = validate();
    if (val) {
      setIsSubmitting(true);

      const res = await disptach(
        Object.keys(currentDepartment).length === 0
          ? createDepartment(values)
          : updateDepartment({ ...values, id: currentDepartment[Constants.MONGOOSE_ID] })
      );
      if (res.payload.status === 200) {
        handleResetModal();

        disptach(
          openSnackbar({
            message: Constants.DEPARTMENT_CREATE_SUCCESS,
            notificationType: Constants.NOTIFICATION_SUCCESS,
          })
        );
      } else {
        disptach(
          openSnackbar({
            message: Constants.DEPARTMENT_CREATE_FAILURE,
            notificationType: Constants.NOTIFICATION_ERROR,
          })
        );
      }
    }
    setLoading(false);
    setIsSubmitting(false);
  };

  return (
    <MDBox>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDBox
            bgColor="info"
            p={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="lg"
            sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, height: pxToRem(72) }}
          >
            <ModalTitle title="New Department" color="white" />
            <Icon
              sx={{ cursor: "pointer", color: "beige" }}
              fontSize="medium"
              onClick={handleResetModal}
            >
              {Icons.CROSS}
            </Icon>
          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            px={3}
            py={2}
            sx={{
              maxHeight: 500,
              overflowY: "scroll",
              "::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <TextField
              sx={{ marginBottom: 2 }}
              name="departmentName"
              label="Department*"
              value={values.departmentName}
              onChange={handleChange}
              error={Boolean(errors.departmentName)}
              helperText={errors.departmentName}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              name="categoryName"
              label="Category*"
              value={values.categoryName}
              onChange={handleChange}
              error={Boolean(errors.categoryName)}
              helperText={errors.categoryName}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />

            <TextField
              sx={{ marginBottom: 2 }}
              name="location"
              label="Location*"
              value={values.location}
              onChange={handleChange}
              error={Boolean(errors.location)}
              helperText={errors.location}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />

            <TextField
              sx={{ marginBottom: 2 }}
              name="salary"
              label="Salary*"
              value={values.salary}
              onChange={handleChange}
              error={Boolean(errors.salary)}
              helperText={errors.salary}
              margin="normal"
              fullWidth
              type="number"
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              name="employeeID"
              label="Employee Id*"
              value={values.employeeID}
              onChange={handleChange}
              error={Boolean(errors.employeeID)}
              helperText={errors.employeeID}
              margin="normal"
              fullWidth
              FormHelperTextProps={{
                sx: { marginLeft: 0 },
              }}
            />
          </MDBox>

          <MDBox px={0} mb={2} ml={2}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Grid item xs={2}>
                <MDButton
                  variant="contained"
                  color={isSubmitting ? "secondary" : "info"}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  style={{ textTransform: "none", boxShadow: "none" }}
                >
                  {loading ? "Loading..." : "Submit"}
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

export default index;
