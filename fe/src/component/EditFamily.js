import { Autocomplete, Grid, TextField } from "@mui/material";
import React from "react";

export default function EditFamily() {
  const flatProps = {
    options: [{ title: "Noida" }, { title: "Delhi" }].map(
      (option) => option.title
    ),
  };

  const affluence = {
    options: [{ title: "Affluent" }, { title: "Upper Middle Class" }].map(
      (option) => option.title
    ),
  };

  return (
   

    <div style={{ padding: "10px" }}>
      <Grid container flexDirection={"column"}>
        <Grid
          container
          spacing={1}
          justifyContent={"center"}
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={5}>
            <TextField
              id="brother-number"
              label="No Of Brothers"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="married-brother-number"
              label="Married Brother"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          justifyContent={"center"}
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={5}>
            <TextField
              id="sister-number"
              label="No Of Sisters"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="married-sister-number"
              label="Married Sister"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
        </Grid>

        <Grid item style={{ marginBottom: "10px" }}>
          <Autocomplete
            {...flatProps}
            id="flat-demo"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Family Location"
                variant="standard"
              />
            )}
          />
        </Grid>

        <Grid item style={{ marginBottom: "10px" }}>
          <Autocomplete
            {...flatProps}
            id="flat-demo"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Current Family Location"
                variant="standard"
              />
            )}
          />
        </Grid>

        <Grid item style={{ marginBottom: "10px" }}>
          <Autocomplete
            {...affluence}
            id="flat-demo"
            renderInput={(params) => (
              <TextField {...params} label="Affluence" variant="standard" />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}
