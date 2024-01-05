import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import WrapperMobileBackShellWithSave from "../screen/WrapperMobileBackShellWithSave";
import { useNavigate } from "react-router-dom";

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

const submitProfileUpdateData = async (payload) => {
  console.log("am I being payload", payload);
  const JWT_TOKEN = localStorage.getItem("token");
  const token = `Bearer ${JWT_TOKEN}`;

  try {
    const response = await fetch(
      `http://192.168.1.10:8000/api/update_my_profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          gender: "FeMale",
          family_info1: { no_of_sisters: 10000 },
        }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log("successfully updated profile", data);
    } else {
      console.log("Error updating profile");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("we can toggle loading if want");
    // setLoading(false);
  }
};

const EditFamilyForm = () => {
  const nagivate = useNavigate();

  const locations = [{ title: "Noida" }, { title: "Delhi" }];
  const affluenceOptions = [
    { title: "LOWER_MIDDLE_CLASS" },
    { title: "MIDDLE_CLASS" },
    { title: "UPPER_MIDDLE_CLASS" },
  ];

  const opt_obj = {
    family_location: locations,
    native_place: locations,
    affluence: affluenceOptions,
  };
  // Use the useLocation hook to access the current location object
  const { state } = useLocation();
  const family_details = state && state.family_details;
  const rules = state && state.rules;
  const [formValues, setFormValues] = useState({});

  // Update form values when family_details changes
  // useEffect(() => {
  //   if (family_details) {
  //     // Set the form values based on family_details
  //     console.log('HEREISTHESTATE',state)
  //     setFormValues(family_details);
  //   }
  // }, [family_details]);

  console.log(rules, "family_deadtailsdafd", state);
  const handleOnChange = (e, state_name, type, new_value = false) => {
    e.preventDefault();
    console.log("thisstate_name changed", type);
    setFormValues((prv) => {
      const obj = JSON.parse(JSON.stringify(prv));
      if (type == "dropdown") {
        obj[state_name] = new_value;
      } else {
        obj[state_name] = e.target.value;
      }

      console.log("hereisprv", prv, state_name, e.target.value);
      return obj;
    });
  };
  const all_childs = Object.keys(family_details).map((row) => {
    if (rules[row]["edit_type"] == "num_input") {
      return (
        <div>
          <NumberField
            state_name={row}
            onChange={handleOnChange}
            id={rules[row]["label"] || row}
            label={rules[row]["label"] || row}
            defaultValue={family_details[row]}
          />
        </div>
      );
    }
    if (rules[row]["edit_type"] == "dropdown") {
      return (
        <div>
          {/* {rules[row]['label'] } here itse {row} */}
          <AutocompleteField
            onChange={handleOnChange}
            options={opt_obj[row]}
            id={row}
            label={row}
            state_name={row}
            defaultValue={family_details[row]}
          />

          {/* <NumberField id={rules[row]['label'] || row} label={rules[row]['label'] || row} defaultValue={family_details[row]}/> */}
        </div>
      );
    }
  });

  const onSave = async () => {
    console.log("onsave ran here we can see the ", { family_info: formValues });
    // const data = await submitProfileUpdateData({family_info:formValues})
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;
    const response = await fetch(
      `http://192.168.1.10:8000/api/update_my_profile`,
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
    <WrapperMobileBackShellWithSave title={"Family Details"} onSave={onSave}>
      <div style={{ padding: "10px" }}>
        <Grid container flexDirection={"column"}>
          {all_childs}
        </Grid>
      </div>
    </WrapperMobileBackShellWithSave>
  );
};

export default EditFamilyForm;
