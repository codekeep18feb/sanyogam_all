import React from "react";
import { Autocomplete, TextField, Grid, Typography } from "@mui/material";

const NumberField = ({ id, label }) => (
  <TextField
    id={id}
    label={label}
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
    variant="standard"
  />
);

const AutocompleteField = ({ options, id, label }) => (
  <Autocomplete
    options={options.map((option) => option.title)}
    id={id}
    renderInput={(params) => (
      <TextField {...params} label={label} variant="standard" />
    )}
  />
);

const EditFamilyForm = () => {
  const locations = [{ title: "Noida" }, { title: "Delhi" }];
  const affluenceOptions = [
    { title: "Poor" },
    { title: "Middle Class" },
    { title: "Upper Middle Class" },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <Grid container flexDirection={"column"}>
        <Grid container spacing={1} justifyContent={"center"} style={{ marginTop: "10px" }}>
          <Grid item xs={5}>
            <NumberField id="brother-number" label="No Of Brothers" />
          </Grid>
          <Grid item xs={5}>
            <NumberField id="married-brother-number" label="Married Brother" />
          </Grid>
        </Grid>

        <Grid container spacing={1} justifyContent={"center"} style={{ marginTop: "10px" }}>
          <Grid item xs={5}>
            <NumberField id="sister-number" label="No Of Sisters" />
          </Grid>
          <Grid item xs={5}>
            <NumberField id="married-sister-number" label="Married Sister" />
          </Grid>
        </Grid>

        <div style={{ display: "flex", flexDirection: "column", width: "82%", margin: "0 auto" }}>
          <AutocompleteField options={locations} id="current-location" label="Current Location" />
          <AutocompleteField options={locations} id="native-location" label="Native Location" />
          <AutocompleteField options={affluenceOptions} id="affluence" label="Affluence" />
        </div>
      </Grid>
    </div>
  );
};

export default EditFamilyForm;
