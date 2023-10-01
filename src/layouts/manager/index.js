// /* eslint-disable */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";

// Custom Components
import NewDepartment from "examples/modal/NewDepartment";
import AddEmployee from "examples/modal/AddEmployee";
import ViewMember from "examples/modal/ViewMember";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PageTitle from "examples/NewDesign/PageTitle";
import DepartMentList from "layouts/manager/data/departmentData";
import DepartmentMemberData from "layouts/manager/data/departmentMemberData";
import DataTable from "examples/Tables/DataTable";
import CustomButton from "examples/NewDesign/CustomButton";

// Constant
import Constants, { defaultData, PageTitles, Colors } from "utils/Constants";

// Redux component
import { openSnackbar } from "redux/Slice/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartment,
  getMemberByDepartment,
  removeMemberFromGroup,
  deleteDepartment,
} from "redux/Thunks/Department";

function manager() {
  const [open, setOpen] = useState(false);
  const [openAddMemeber, setOpenAddMemeber] = useState(false);
  const [departmentId, setDepartmentId] = useState("");
  const [members, setMembers] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState({});
  const [openView, setOpenView] = useState(false);

  const departmentSlice = useSelector((state) => state.department);
  const dispatch = useDispatch();

  const fetchMembers = async (id) => {
    const res = await dispatch(getMemberByDepartment(id));
    if (res.payload.status === 200) {
      setMembers(res.payload.data.data);
    }
    return true;
  };

  const handleOpen = async () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenAddMemeber = async (id) => {
    setDepartmentId(id);
    await fetchMembers(id);
    setOpenAddMemeber(true);
  };
  const handleCloseAddMemeber = () => setOpenAddMemeber(false);
  const handleViewOpen = async (id) => {
    setOpenView(true);
    setDepartmentId(id);
    await fetchMembers(id);
  };
  const handleViewClose = () => {
    setMembers([]);
    setOpenView(false);
  };
  const handleRemoveMember = async (ids) => {
    const res = await dispatch(removeMemberFromGroup({ departmentId, memberId: ids }));
    if (res.payload.status === 200) {
      dispatch(
        openSnackbar({
          message: res.payload.data.message,
          notificationType: Constants.NOTIFICATION_SUCCESS,
        })
      );
      await fetchMembers(departmentId);
    } else {
      dispatch(
        openSnackbar({
          message: res.payload.data.message,
          notificationType: Constants.NOTIFICATION_ERROR,
        })
      );
    }
  };

  const handleEditDepartment = async (item) => {
    setOpen(true);
    setCurrentDepartment(item);
  };

  const handleDeleteDepartment = async (id) => {
    const res = await dispatch(deleteDepartment(id));
    if (res.payload.status === 200) {
      await dispatch(getAllDepartment());
      dispatch(
        openSnackbar({
          message: Constants.DEPARTMENT_DELETE_SUCCESS,
          notificationType: Constants.NOTIFICATION_SUCCESS,
        })
      );
    } else {
      dispatch(
        openSnackbar({
          message: Constants.DEPARTMENT_DELETE_FAILURE,
          notificationType: Constants.NOTIFICATION_ERROR,
        })
      );
    }
  };

  const { columns, rows } = DepartMentList(
    departmentSlice.departmentList,
    handleOpenAddMemeber,
    handleViewOpen,
    handleEditDepartment,
    handleDeleteDepartment
  );

  const { departmentMemberColumns, departmentMemberRows } = DepartmentMemberData(
    members,
    handleRemoveMember
  );

  useEffect(() => {
    (async () => {
      if (!open) {
        await dispatch(getAllDepartment());
      }
    })();
  }, [open]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {open && (
        <NewDepartment
          open={open}
          handleClose={handleClose}
          currentDepartment={currentDepartment}
        />
      )}
      {openAddMemeber && (
        <AddEmployee
          open={openAddMemeber}
          members={members}
          handleClose={handleCloseAddMemeber}
          departmentId={departmentId}
        />
      )}

      {openView && (
        <ViewMember title="Department Employees" open={openView} handleClose={handleViewClose}>
          <DataTable
            table={{
              columns: departmentMemberColumns,
              rows: departmentMemberRows,
            }}
            backgroundColor={Colors.LIGHT_GRAY} // Specify the background color here
            textColor={Colors.BLACK}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            pagination={{ variant: "gradient", color: "info" }}
            loading="fullfilled"
          />
        </ViewMember>
      )}
      <MDBox py={2} display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title={PageTitles.MANAGE_USERS} />
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <CustomButton
            title="Department"
            icon="add_circle_outline"
            background="#191A51"
            color="#ffffff"
            openModal={handleOpen}
          />
        </MDBox>
      </MDBox>
      <MDBox mt={2}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={{ defaultValue: defaultData.PER_PAGE }}
          showTotalEntries={false}
          noEndBorder
          loading="fullfilled"
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default manager;
