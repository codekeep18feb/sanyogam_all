

import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import WrapperMobileBackShellWithSave from "./WrapperMobileBackShellWithSave";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";


const NumberField = ({ id, label, defaultValue = 0, onChange, state_name }) => (
  <TextField
    id={id}
    label={label}
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
    variant="standard"
    defaultValue={defaultValue} // Add this line to set the default value
    onChange={(e) => onChange(e, state_name, "number_input")}
    // fullWidth={true}
  />
);






const TextInputField = ({ id, label, defaultValue = 0, onChange, state_name }) => (
  <TextField
    id={id}
    label={label}
    type="string"
    InputLabelProps={{
      shrink: true,
    }}
    variant="standard"
    defaultValue={defaultValue} // Add this line to set the default value
    onChange={(e) => {
      console.log('HERE IS EVENT IN TEXT',e.target.value)
      onChange(e, state_name, "str_input")
    }}
    // fullWidth={true}
  />
);

const DateInputField = ({ id, label, defaultValue = "", onChange, state_name }) => (
 

  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
  
  value={defaultValue}



  onChange={(new_value) => {
    console.log('AREWAREWR',new_value, state_name, "date", new_value)
    let date = new_value; // value from your state
    let formattedDate = moment(date).format('DD/MM/YYYY');
    console.log(date) // before: Sat Jul 17 2021 12:21:00
    console.log('formattedDate',formattedDate) // after: 17/07/2021
    onChange(new_value, state_name, "date", formattedDate)
  }}

/>
</LocalizationProvider>
);


const AutocompleteField = ({
  options,
  id,
  label,
  defaultValue,
  onChange,
  state_name,
}) => (
  <Autocomplete
    options={options.map((option) => option.title)}
    id={id}
    value={defaultValue} // Set the default value
    onChange={(e, new_value) => onChange(e, state_name, "dropdown", new_value)}
    renderInput={(params) => (
      <TextField {...params} label={label} variant="standard" />
    )}
  />
);

// const submitProfileUpdateData = async (payload) => {
//   console.log("am I being payload", payload);
//   const JWT_TOKEN = localStorage.getItem("token");
//   const token = `Bearer ${JWT_TOKEN}`;

//   try {
//     const response = await fetch(
//       `http://192.168.1.2:8000/api/update_my_profile`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({
//           gender: "FeMale",
//           family_info1: { no_of_sisters: 10000 },
//         }),
//       }
//     );

//     if (response.status === 200) {
//       const data = await response.json();
//       console.log("successfully updated profile", data);
//     } else {
//       console.log("Error updating profile");
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   } finally {
//     console.log("we can toggle loading if want");
//     // setLoading(false);
//   }
// };

const EditForm = () => {
  const nagivate = useNavigate();
  const { state } = useLocation();
  const edit_data = state && state.edit_data;
  const opt_obj = state && state.opt_obj;
  const rules = state && state.rules;
  const object_key = state && state.object_key;
  
  const [formValues, setFormValues] = useState({});



  console.log(rules, "family_deadtailedit_datasdafd", edit_data);
  const handleOnChange = (e, state_name, type, new_value = false) => {
    // e.preventDefault();
    console.log("thisstate_name changed", type);
    setFormValues((prv) => {
      const obj = JSON.parse(JSON.stringify(prv));
      if (type === "dropdown") {
        obj[state_name] = new_value;
      } 
      else if (type === "date") {
        obj[state_name] = new_value;
      }
      else {
        obj[state_name] = e.target.value;
      }

      // console.log("hereisprv", prv, state_name, e.target.value);
      return obj;
    });
  };

  const all_childs = Object.keys(edit_data).map((row) => {
    if (rules[row]["edit_type"] === "num_input") {
      return (
        <div>
          <NumberField
            state_name={row}
            onChange={handleOnChange}
            id={rules[row]["label"] || row}
            label={rules[row]["label"] || row}
            defaultValue={edit_data[row]}
          />
        </div>
      );
    }

    if (rules[row]["edit_type"] === "date_input") {
      return (
        <div>
          <DateInputField
            state_name={row}
            onChange={handleOnChange}
            id={rules[row]["label"] || row}
            label={rules[row]["label"] || row}
            defaultValue={edit_data[row]}
          />
        </div>
      );
    }

    if (rules[row]["edit_type"] === "str_input") {
      return (
        <div>
          <TextInputField
            state_name={row}
            onChange={handleOnChange}
            id={rules[row]["label"] || row}
            label={rules[row]["label"] || row}
            defaultValue={edit_data[row]}
          />
        </div>
      );
    }

    if (rules[row]["edit_type"] === "dropdown") {
      return (
        <div>
          <AutocompleteField
            onChange={handleOnChange}
            options={opt_obj[row]}
            id={row}
            label={row}
            state_name={row}
            defaultValue={edit_data[row]}
          />

        </div>
      );
    }
  });

  const onSave = async (family_info) => {
    console.log("onsave ran here we can see the ", { family_info: formValues });
    // const data = await submitProfileUpdateData({family_info:formValues})
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    const response = await fetch(
      `http://192.168.1.2:8000/api/update_my_profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ family_info: formValues }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      nagivate(-1);

      console.log("successfully update profiled", data);
    } else {
      console.log("Error updating profile");
    }
  };

  return (
    <WrapperMobileBackShellWithSave title={"Edit "+object_key} onSave={()=>{
      onSave(object_key)
    }}>
      <div style={{ padding: "10px" }}>
        <Grid container flexDirection={"column"}>
          {all_childs}
        </Grid>
      </div>
    </WrapperMobileBackShellWithSave>
  );
};

export default EditForm;
