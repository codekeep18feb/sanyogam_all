import { Grid, Typography } from "@mui/material";
import React from "react";
import Location from "@mui/icons-material/LocationOnOutlined";
import Affluence from "@mui/icons-material/Class";

import People from "@mui/icons-material/PeopleAltOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";

export const FamilyPreview = () => {
  return (
    <Grid container flexDirection={"column"}>
      <Grid
        container
        justifyContent="space-between"
        sx={{ padding: "5px 10px 0 10px" }}
      >
        <Grid item>
          <div>Family Details</div>
        </Grid>

        <div style={{ display: "flex" }}>
          <div style={{ opacity: 0.8 }}>
            <a href="edit_family" style={{ textDecoration: "none" }}>
              <Typography variant="subtitle2">Edit</Typography>
            </a>
          </div>

          <EditIcon
            style={{ fontSize: "17px", color: "blue", marginLeft: "5px" }}
          />
        </div>


        
      </Grid>

      <div style={{ display: "flex",padding:"10px 0" }}>
        <People
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        />

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Family Members{" "}
          </Typography>
          <Typography variant="subtitle2">
            Father Mother 1 brother who is unmarried 1 sister who is married{" "}
          </Typography>
        </div>
      </div>


      <div style={{ display: "flex",padding:"10px 0" }}>
        <Location
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        />

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Stay in
          </Typography>
          <Typography variant="subtitle2">
            Noida
          </Typography>
        </div>
      </div>

      <div style={{ display: "flex",padding:"10px 0" }}>
        <Location
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        />

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Native
          </Typography>
          <Typography variant="subtitle2">
            Noida
          </Typography>
        </div>
      </div>

      <div style={{ display: "flex",padding:"10px 0" }}>
        <Affluence
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        />

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Affluence
          </Typography>
          <Typography variant="subtitle2">
            Noida
          </Typography>
        </div>
      </div>


      

      
    </Grid>
  );
};


export default function PreviewProfile() {
  return (
    <>
      <div
        style={{
          margin: "10px",
          padding: "15px 0",
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <FamilyPreview />
      </div>
   
    </>
  );
}
