import {
  FormControl,
  //   FormHelperText,
  MenuItem,
  IconButton,
  Select,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
// import FormControlErrorStyles from "assets/style/Component";
import pxToRem from "assets/theme/functions/pxToRem";
// import MDBox from "components/MDBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Constants from "utils/Constants";

const formDropdown2 = ({
  //   width,
  label,
  value,
  id,
  name,
  //   defaultValue,
  options,
  //   error,
  //   helperText,
  handleChange,
  //   marginBottom,
  //   maxWidth,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        multiple
        name={name}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={options}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {options.length > 0 ? (
          options.map((item) => (
            <MenuItem
              sx={{
                textTransform: "capitalize",
                maxHeight: 400,
                fontSize: pxToRem(16),
                fontWeight: 400,
                marginTop: "4px",
                color: "#667085",
              }}
              key={item[Constants.MONGOOSE_ID]}
              value={item[Constants.MONGOOSE_ID]}
            >
              {item.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No data available</MenuItem>
        )}
      </Select>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </FormControl>
  );
};

export default formDropdown2;
