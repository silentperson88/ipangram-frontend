// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import pattern from "assets/images/illustrations/pattern-tree.svg";

function MasterCard({ number, holder, expires, name, location, category, index }) {
  const numbers = [...`${number}`];

  console.log(number, holder, expires, name, location, category, index);

  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }

  const colorArray = ["primary", "secondary", "info", "success", "warning", "error", "dark"];

  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[colorArray[index]]
          ? linearGradient(gradients[colorArray[index]].main, gradients[colorArray[index]].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2} display="flex" flexDirection="column">
        <MDBox
          color="white"
          w={100}
          p={1}
          lineHeight={0}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 5, pb: 1 }}>
            {location}
          </MDTypography>
          <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 5, pb: 1 }}>
            {category}
          </MDTypography>
        </MDBox>
        <MDTypography
          w={100}
          textAlign="center"
          variant="button"
          color="white"
          fontWeight="regular"
          opacity={0.8}
        >
          {name}
        </MDTypography>
        <MDBox
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="h6" color="white" fontWeight="medium" textTransform="capitalize">
            {holder}
          </MDTypography>
          <MDTypography variant="h6" color="white" fontWeight="medium">
            {expires}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
MasterCard.defaultProps = {
  category: "",
  location: "",
  name: "",
  index: 0,
};

// Typechecking props for the MasterCard
MasterCard.propTypes = {
  category: PropTypes.string,
  location: PropTypes.string,
  name: PropTypes.number,
  number: PropTypes.number.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default MasterCard;
