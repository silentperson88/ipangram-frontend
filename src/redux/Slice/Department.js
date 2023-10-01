import { createSlice } from "@reduxjs/toolkit";
import { resetStateThunk } from "redux/Thunks/Authentication";
import { getAllDepartment } from "redux/Thunks/Department";

const initialState = {
  loading: "idle",
  departmentList: [],
};

export const DepartmentSLice = createSlice({
  name: "Department",
  initialState,
  reducers: {},

  extraReducers: {
    [getAllDepartment.pending]: (state) => {
      state.loading = "pending";
    },
    [getAllDepartment.fulfilled]: (state, { payload }) => {
      state.loading = "fullfilled";
      console.log(payload.data.data);
      state.departmentList = payload.data.data;
    },
    [getAllDepartment.rejected]: (state) => {
      state.loading = "rejected";
    },
    [resetStateThunk.fulfilled]: (state) => {
      state.loading = "idle";
      state.departmentList = [];
    },
  },
});

export default DepartmentSLice.reducer;
