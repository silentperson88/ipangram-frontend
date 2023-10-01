// /* eslint-disable */
import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Sessions
import Session from "utils/Sessions";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import IconButton from "@mui/material/IconButton";
import Confirmation from "examples/modal/Confirmation/Confirmation";
import { useDispatch } from "react-redux";
import Constants from "utils/Constants";
import { resetStateThunk } from "redux/Thunks/Authentication";
import pxToRem from "assets/theme/functions/pxToRem";
import jwtDecode from "jwt-decode";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, transparentNavbar, light } =
    controller;
  const [openLogout, setOpenLogout] = useState(false);
  const [switchAccount, setSwitchAccount] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const dispatchThunk = useDispatch();

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  // Logout user
  const handleLogout = async () => {
    Session.setClear();
    navigate("/authentication/sign-in", { replace: true });
    await dispatchThunk(resetStateThunk());
  };

  // Switch from admin account to superadmin account
  const handleAccountSwitch = () => {
    setSwitchAccount(false);
    Session.setLogoutSuperadminAsAdmin();
    navigate("admin/home", { replace: true });
  };
  const iconsStyle = ({ palette: { white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : white.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : white.main;
      }

      return colorValue;
    },
  });
  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  useEffect(() => {
    (async () => {
      const token = jwtDecode(Session.userToken);
      setRole(token.role);
    })();
  }, [Session.userToken]);

  const handleCloseMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const handleRoutingAsPermission = (key, route, accessibleTo, name, icon) => {
    console.log(accessibleTo, role);
    if (accessibleTo === "employee" && role === "employee") {
      return (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    }

    if (accessibleTo === "manager" && role === "manager") {
      return (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    }

    return null;
  };

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, accessibleTo, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          handleRoutingAsPermission(key, route, accessibleTo, name, icon)
        );
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={0.625} pb={0} px={2} textAlign="center">
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            // <MDBox
            //   // component="img"
            //   src="Funding India
            // Powered by FinVibes"
            //   alt="Brand"
            //   marginTop="12px"
            // />
            <MDBox
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <MDTypography variant="h6" fontWeight="bold" color={textColor}>
                Ipangram India
              </MDTypography>
              <MDTypography
                variant="caption"
                fontWeight="bold"
                color={textColor}
                sx={{ fontSize: pxToRem(8) }}
              >
                Powered by Ipangram
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
      <Divider sx={{ marginTop: 0.813, marginBottom: 1 }} />
      <List sx={{ marginX: 1, marginTop: 0.5 }}>
        {renderRoutes.filter((rou) => rou !== null && rou !== undefined)}
      </List>
      <MDBox p={1} mt="auto" display="flex" justifyContent="center" flexDirection="column">
        <IconButton
          size="small"
          disableRipple
          color="inherit"
          onClick={handleCloseMiniSidenav}
          fullwidth="true"
        >
          <Icon sx={iconsStyle} fontSize="medium">
            {miniSidenav ? "keyboard_double_arrow_right" : "keyboard_double_arrow_left"}
          </Icon>
        </IconButton>
        {Session.isSuperAdminViewingAdminPanel && (
          <MDBox onClick={() => setSwitchAccount(true)}>
            <SidenavCollapse name="Switch To Super Admin" icon="switch_account" parent="" />
          </MDBox>
        )}
        <MDBox onClick={handleOpenLogout}>
          <SidenavCollapse name="Logout" icon="power_settings_new" parent="" />
        </MDBox>

        {/* Logout confirmation modal for user logging out */}
        {openLogout && (
          <Confirmation
            open={openLogout}
            title={Constants.USER_LOGOUT_TITTLE}
            message={Constants.LOGOUT_MESSAGE}
            handleClose={() => setOpenLogout(false)}
            handleAction={handleLogout}
          />
        )}

        {/* Switch account confirmation modal for superadmin logging out as an admin */}
        {switchAccount && (
          <Confirmation
            open={switchAccount}
            title={Constants.SWITCH_ACCOUNT_TITTLE}
            message={Constants.SWITCH_SUPERADMIN_ACCOUNT_TO_ADMIN_MESSAGE}
            handleClose={() => setSwitchAccount(false)}
            handleAction={handleAccountSwitch}
          />
        )}
      </MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
