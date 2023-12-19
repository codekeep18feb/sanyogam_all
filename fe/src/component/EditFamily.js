import React from "react";
import { Autocomplete, TextField, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const NumberField = ({ id, label,defaultValue=0 }) => (
  <TextField
    id={id}
    label={label}
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
    variant="standard"
    defaultValue={defaultValue} // Add this line to set the default value
    // fullWidth={true}
  />
);

const AutocompleteField = ({ options, id, label,defaultValue }) => (
  <Autocomplete
    options={options.map((option) => option.title)}
    id={id}
    value={defaultValue}  // Set the default value
    renderInput={(params) => (
      <TextField {...params} label={label} variant="standard" />
    )}
  />
);

const EditFamilyForm = () => {
  const locations = [{ title: "Noida" }, { title: "Delhi" }];
  const affluenceOptions = [
    { title: "LOWER_MIDDLE_CLASS" },
    { title: "MIDDLE_CLASS" },
    { title: "UPPER_MIDDLE_CLASS" },
  ];

  const opt_obj ={
    current_location:locations,
    native_location:locations,
    affluence:affluenceOptions
  }
  // Use the useLocation hook to access the current location object
  const { state } = useLocation();
  const family_details = state && state.family_details;
  const rules = state && state.rules;
  console.log(rules,'family_deadtailsdafd',state)

  const all_childs = Object.keys(family_details).map(row=>{
    if (rules[row]['edit_type']=='num_input'){
      return (
        <div>
          <NumberField id={rules[row]['label'] || row} label={rules[row]['label'] || row} defaultValue={family_details[row]}/>
        </div>
      )
  
    }
    if (rules[row]['edit_type']=='dropdown'){
      return (
        <div>
          {/* {rules[row]['label'] } here itse {row} */}
          <AutocompleteField 
          options={opt_obj[row]} 
          id={row} 
          label={row} 
          defaultValue={family_details[row]}/>

          {/* <NumberField id={rules[row]['label'] || row} label={rules[row]['label'] || row} defaultValue={family_details[row]}/> */}
        </div>
      )
  
    }
  })
  return (
    <div style={{ padding: "10px" }}>
      <Grid container flexDirection={"column"}>
        {all_childs}


      </Grid>
    </div>
  );
};

export default EditFamilyForm;
