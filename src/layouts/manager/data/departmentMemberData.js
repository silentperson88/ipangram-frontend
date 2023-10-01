/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import Author from "components/Table/Author";
import MDBox from "components/MDBox";
import { IconButton } from "@mui/material";
import Constants, { Icons } from "utils/Constants";

export default function department(deparmentMembers, handleRemoveMember) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (deparmentMembers) {
      const list = deparmentMembers.map((item, index) => {
        const temp = {
          srNo: <Author name={index + 1} />,
          name: <Author name={`${item?.memberId?.firstName} ${item?.memberId?.lastName}`} />,
          email: <Author name={item?.memberId?.email} />,
          role: <Author name={item?.memberId?.role} />,
          gender: <Author name={item.memberId?.gender} />,
          hobbies: <Author name={item.memberId?.hobbies} />,
          action: (
            <MDBox>
              <IconButton
                color="secondary"
                fontSize="medium"
                sx={{ cursor: "pointer" }}
                onClick={() => handleRemoveMember(item.memberId[Constants.MONGOOSE_ID])}
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
  }, [deparmentMembers]);

  return {
    departmentMemberColumns: [
      { Header: "No.", accessor: "srNo", width: "3%" },
      // headers for name, email, phone, zipcode, loan amount, employment type, income, pancard number, date of birth, gender, status, action
      { Header: "Name", accessor: "name", width: "10%" },
      { Header: "Email", accessor: "email", width: "10%" },
      { Header: "Role", accessor: "role", width: "10%" },
      { Header: "Gender", accessor: "gender", width: "10%" },
      { Header: "Hobbies", accessor: "hobbies", width: "10%" },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },
    ],
    departmentMemberRows: rows,
  };
}
