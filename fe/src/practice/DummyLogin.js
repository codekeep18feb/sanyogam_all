import React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function DummyLogin() {
  const [selectedGender, setSelectedGender] = React.useState("Male");
  const [selectedDropdown, setSelectedDropdown] = React.useState("dropdown1"); // Default to 'dropdown1'
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState({
    opt1: false,
    opt2: false,
    other: false,
  });

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedGender(value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedDropdown(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender({
      ...gender,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <FormControl component="fieldset">
        <Typography variant="h6">Gender</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Radio
                checked={selectedGender === "Male"}
                onChange={handleRadioChange}
                value="Male"
                name="gender"
              />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedGender === "Female"}
                onChange={handleRadioChange}
                value="Female"
                name="gender"
              />
            }
            label="Female"
          />
        </FormGroup>
      </FormControl>

      <FormControl variant="outlined" fullWidth margin="normal">
        <Typography variant="h6">Select</Typography>
        <Select
          value={selectedDropdown}
          onChange={handleDropdownChange}
          label="Select"
        >
          <MenuItem value="dropdown1">Dropdown 1</MenuItem>
          <MenuItem value="dropdown2">Dropdown 2</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset">
        <Typography variant="h6">CheckOps</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={gender.opt1}
                onChange={handleGenderChange}
                name="opt1"
              />
            }
            label="Opt1"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={gender.opt2}
                onChange={handleGenderChange}
                name="opt2"
              />
            }
            label="Opt2"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={gender.other}
                onChange={handleGenderChange}
                name="other"
              />
            }
            label="Other"
          />
        </FormGroup>
      </FormControl>

      <FormControl variant="outlined" fullWidth margin="normal">
        <Typography variant="h6">Name</Typography>
        <TextField
          label="Enter your name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
      </FormControl>
    </>
  );
}
