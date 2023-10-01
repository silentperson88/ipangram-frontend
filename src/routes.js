// Admin layouts
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Manager from "layouts/manager";
import Employee from "layouts/employee";

// Super Admin Layouts

// @mui icons
import Icon from "@mui/material/Icon";

export const appRoutes = [
  {
    type: "page",
    name: "Sign In",
    key: "sign-in",
    accessibleTo: "all",
    icon: <Icon fontSize="small">SignIn</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "page",
    name: "Sign up",
    key: "sign-up",
    accessibleTo: "all",
    icon: <Icon fontSize="small">SignUp</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Department Management",
    key: "manager",
    accessibleTo: "manager",
    icon: <Icon fontSize="small">admin_panel_settings</Icon>,
    route: "/manager",
    component: <Manager />,
  },
  {
    type: "collapse",
    name: "Home",
    key: "employee",
    accessibleTo: "employee",
    icon: <Icon fontSize="small">manage_accounts</Icon>,
    route: "/employee",
    component: <Employee />,
  },
];

export default appRoutes;
