/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { Grid, Icon, Modal } from "@mui/material";
import style from "assets/style/Modal";
import pxToRem from "assets/theme/functions/pxToRem";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import ModalTitle from "examples/NewDesign/ModalTitle";
import Constants, { Icons } from "utils/Constants";
import { useDispatch } from "react-redux";
import { openSnackbar } from "redux/Slice/Notification";
import getAllUsers from "redux/Thunks/UserManagement";
import FDropdown from "components/Dropdown/FDropdown";
import { addMemberInDepartment } from "redux/Thunks/Department";

function index({ open, members, handleClose, departmentId }) {
  const [values, setValues] = useState({
    memberList: [],
  });
  const [userList, setUserList] = useState([]);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(getAllUsers());
      if (res.payload.status === 200) {
        const tempUsers = res.payload.data.data
          .filter((item) => {
            const alreadyMember = members.some(
              (member) => member.memberId[Constants.MONGOOSE_ID] === item[Constants.MONGOOSE_ID]
            );
            return !alreadyMember;
          })
          .map((user) => ({
            [Constants.MONGOOSE_ID]: user[Constants.MONGOOSE_ID],
            title: `${user.firstName} ${user.lastName}`,
          }));

        setUserList(tempUsers);
      } else {
        dispatch(
          openSnackbar({
            message: Constants.MOBILE_USERS_ERROR,
            notificationType: Constants.NOTIFICATION_ERROR,
          })
        );
      }
    })();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (values.memberList.length === 0) {
      newErrors.memberList = "Please select atleast one member";
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
      memberList: e,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const val = validate();
    if (val) {
      setIsSubmitting(true);
      const res = await dispatch(addMemberInDepartment({ memberList: values, departmentId }));
      if (res.payload.status === 200) {
        handleResetModal();

        dispatch(
          openSnackbar({
            message: Constants.MEMBER_ADDED_SUCCESS,
            notificationType: Constants.NOTIFICATION_SUCCESS,
          })
        );
      } else {
        const error = {};
        error.userId = res.payload.data.message;
        setErrors(error);
        dispatch(
          openSnackbar({
            message: Constants.MEMBER_ADDED_FAILURE,
            notificationType: Constants.NOTIFICATION_ERROR,
          })
        );
      }
    }
    setIsSubmitting(false);
    setLoading(false);
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
            <ModalTitle title="Add Memer" color="white" />
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
            <FDropdown
              label="User*"
              id="memberList"
              name="memberList"
              displayProperty="memberList"
              options={userList}
              error={errors?.memberList}
              helperText={errors?.memberList}
              handleChange={handleChange}
              marginBottom={2}
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
