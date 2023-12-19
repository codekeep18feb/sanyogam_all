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

  // Use the useLocation hook to access the current location object
  const { state } = useLocation();
  const family_details = state && state.family_details;
  console.log('family_detailsdafd',family_details)

  return (
    <div style={{ padding: "10px" }}>
      <Grid container flexDirection={"column"}>
        <Grid container spacing={1} justifyContent={"center"} style={{ marginTop: "10px" }}>
          <Grid item xs={5}>
            <NumberField id="no_of_brothers" label="No Of Brothers" defaultValue={family_details['no_of_brothers']}/>
          </Grid>
          <Grid item xs={5}>
            <NumberField id="married-brother-number" label="Married Brother" defaultValue={family_details['no_of_married_brothers']}/>
          </Grid>
        </Grid>

        <Grid container spacing={1} justifyContent={"center"} style={{ marginTop: "10px" }}>
          <Grid item xs={5}>
            <NumberField id="sister-number" label="No Of Sisters" defaultValue={family_details['no_of_sisters']}/>
          </Grid>
          <Grid item xs={5}>
            <NumberField id="married-sister-number" label="Married Sister" defaultValue={family_details['no_of_married_sisters']}/>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent={"center"} style={{ marginTop: "10px" }}>
          <Grid item xs={10}>
          <AutocompleteField options={locations} id="current-location" label="Current Location" defaultValue={family_details['current_location']}/>

          </Grid>
         
        </Grid>
        <Grid container spacing={1} justifyContent={"center"} style={{ marginTop: "10px" }}>
          <Grid item xs={10}>
          <AutocompleteField options={locations} id="native-location" label="Native Location" defaultValue={family_details['native_location']}/>

          </Grid>
         
        </Grid>
        <Grid container spacing={1} justifyContent={"center"} style={{ marginTop: "10px" }}>
          <Grid item xs={10}>
          <AutocompleteField options={affluenceOptions} id="affluence" label="Affluence" defaultValue={family_details['affluence']} />

          </Grid>
         
        </Grid>

      </Grid>
    </div>
  );
};

export default EditFamilyForm;
