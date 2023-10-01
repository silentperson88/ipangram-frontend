/* eslint-disable */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "redux/ApiService/ApiService";
import Sessions from "utils/Sessions";

const createDepartment = createAsyncThunk("department-create", async (body) => {
  const res = await ApiService.post(
    `department`,
    { ...body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  )
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const updateDepartment = createAsyncThunk("department-update", async (body) => {
  const res = await ApiService.patch(
    `department/${body.id}`,
    { ...body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  )
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const getAllDepartment = createAsyncThunk("department-list", async () => {
  const res = await ApiService.get(`department/list`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const getAllDepartmentOfUser = createAsyncThunk("department/user", async (userId) => {
  const res = await ApiService.get(`department`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const getMemberByDepartment = createAsyncThunk("member/department", async (departmentId) => {
  const res = await ApiService.get(`department/${departmentId}`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const removeMemberFromGroup = createAsyncThunk(
  "department/removeMember",
  async ({ departmentId, memberId }) => {
    const res = await ApiService.delete(`department/${departmentId}/members/${memberId}`, {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    })
      .then((r) => r)
      .catch((err) => err.response);
    return res;
  }
);

export const addMemberInDepartment = createAsyncThunk("department/addMember", async (data) => {
  console.log(data);
  const res = await ApiService.post(
    `department/${data.departmentId}/add-members`,
    { ...data.memberList },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  )
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export const deleteDepartment = createAsyncThunk("department/delete", async (id) => {
  const res = await ApiService.delete(`department/${id}`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  })
    .then((r) => r)
    .catch((err) => err.response);
  return res;
});

export default createDepartment;
