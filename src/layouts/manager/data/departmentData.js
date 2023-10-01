/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import Author from "components/Table/Author";
import MDBox from "components/MDBox";
import { IconButton } from "@mui/material";
import Constants, { Icons } from "utils/Constants";

export default function department(
  departmentList,
  handleOpenAddMemeber,
  handleViewOpen,
  handleEditDepartment,
  handleDeleteDepartment
) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (departmentList) {
      const list = departmentList.map((item, index) => {
        const temp = {
          srNo: <Author name={index + 1} />,
          departmentName: <Author name={item.departmentName} />,
          categoryName: <Author name={item.categoryName} />,
          location: <Author name={item.location} />,
          salary: <Author name={item.salary} />,
          employeeID: <Author name={item.employeeID} />,
          action: (
            <MDBox>
              <IconButton
                color="secondary"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpenAddMemeber(item[Constants.MONGOOSE_ID])}
              >
                {Icons.ADD}
              </IconButton>
              <IconButton
                color="secondary"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={() => handleViewOpen(item[Constants.MONGOOSE_ID])}
              >
                {Icons.VIEW}
              </IconButton>
              <IconButton
                color="secondary"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={() => handleEditDepartment(item)}
              >
                {Icons.EDIT}
              </IconButton>
              <IconButton
                color="secondary"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={() => handleDeleteDepartment(item[Constants.MONGOOSE_ID])}
              >
                {Icons.DELETE}
              </IconButton>
            </MDBox>
          ),
        };
        return temp;
      });
      setRows([...list]);
    }
  }, [departmentList]);

  return {
    columns: [
      { Header: "No.", accessor: "srNo", width: "3%" },
      // headers for name, email, phone, zipcode, loan amount, employment type, income, pancard number, date of birth, gender, status, action
      { Header: "Name", accessor: "departmentName", width: "10%" },
      { Header: "Category Name", accessor: "categoryName", width: "10%" },
      { Header: "Location", accessor: "location", width: "10%" },
      { Header: "Salary", accessor: "salary", width: "10%" },
      { Header: "Employee ID", accessor: "employeeID", width: "10%" },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },
    ],
    rows,
  };
}
