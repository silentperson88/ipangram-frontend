import {
  FormControl,
  FormHelperText,
  MenuItem,
  IconButton,
  Select,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import FormControlErrorStyles from "assets/style/Component";
import pxToRem from "assets/theme/functions/pxToRem";
import MDBox from "components/MDBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Constants from "utils/Constants";

const formMultipleSelect = ({
  width,
  label,
  value,
  id,
  name,
  defaultValue,
  options,
  error,
  helperText,
  handleChange,
  marginBottom,
  maxWidth,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(value || []); // Store selected values in state

  const handleSelectChange = (event) => {
    setSelectedValues(event.target.value);
    handleChange(event.target.value); // Pass the selected values to the handleChange function
  };

  return (
    <FormControl
      size="small"
      error={Boolean(error)}
      sx={{
        mr: 2,
        ml: 0,
        mt: pxToRem(8),
        minWidth: "100%",
        width,
        marginBottom,
        maxHeight: 400,
        ...FormControlErrorStyles,
      }}
    >
      <MDBox
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          displayEmpty
          labelId={id}
          label={label}
          id={id}
          name={name}
          value={selectedValues}
          placeholder={label}
          defaultValue={defaultValue}
          onChange={handleSelectChange} // Use handleSelectChange to update selected values
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          multiple // Allow multiple selections
          sx={{
            height: 45,
            minWidth: "100%",
            "& .MuiInputBase-input": {
              fontSize: pxToRem(16),
              fontWeight: 400,
              color: "#667085",
            },
            textTransform: "capitalize",
            backgroundColor: "black",
            paddingY: "0.65rem",
            paddingRight: "0.55rem",
            maxHeight: 100,
            cursor: "pointer",
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: 29,
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              style: {
                maxHeight: 200,
                maxWidth,
                opacity: 1,
                transform: "none",
                border: "1px solid #D0D5DD",
              },
            },
          }}
        >
          <MenuItem disabled value="">
            Select
          </MenuItem>
          {options.length > 0 ? (
            options.map((item) => (
              <MenuItem key={item[Constants.MONGOOSE_ID]} value={item[Constants.MONGOOSE_ID]}>
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
      </MDBox>
      <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default formMultipleSelect;
