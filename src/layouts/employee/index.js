import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";

// Custom Components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PageTitle from "examples/NewDesign/PageTitle";

// Constant
import Constants from "utils/Constants";
// Redux component
import { useDispatch } from "react-redux";
import { getAllDepartmentOfUser } from "redux/Thunks/Department";
import { openSnackbar } from "redux/Slice/Notification";
import MasterCard from "examples/Cards/MasterCard";
import { Grid } from "@mui/material";

function ManageGroups() {
  const [department, setDepartment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(getAllDepartmentOfUser());
      if (res.payload.status === 200) {
        setDepartment(res.payload.data.data);
      } else {
        dispatch(
          openSnackbar({
            message: Constants.MEMBER_FETCH_SUCCESS,
            notificationType: Constants.NOTIFICATION_ERROR,
          })
        );
      }
    })();
  }, []);

  return (
    <DashboardLayout xPadding={0}>
      <MDBox px={3} display="flex" flexDirection="column">
        <DashboardNavbar />
        <PageTitle title="Department" />
      </MDBox>
      <MDBox px={3} py={2}>
        <Grid container spacing={2}>
          {department.map((item, index) => (
            <Grid item xs={12} md={6} mb={2} px={2}>
              <MasterCard
                category={item.departmentId.categoryName}
                location={item.departmentId.location}
                name={item.departmentId.departmentName}
                number={4562112245947852}
                holder={item.departmentId.salary}
                expires={item.departmentId.employeeID}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ManageGroups;
