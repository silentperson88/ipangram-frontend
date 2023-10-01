import { combineReducers, configureStore } from "@reduxjs/toolkit";
import NotificationReducer from "redux/Slice/Notification";
import DepartmentSlice from "redux/Slice/Department";

export const rootReducer = combineReducers({
  Notification: NotificationReducer,
  department: DepartmentSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
