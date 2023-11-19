import { Grid, Typography } from "@mui/material";
import React from "react";
import Location from "@mui/icons-material/LocationOnOutlined";
import Affluence from "@mui/icons-material/Class";
import { useNavigate } from "react-router-dom";

import People from "@mui/icons-material/PeopleAltOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";

export const FamilyPreview = ({
  family_details,
  iconComponent,
  manupulated_str,
}) => {
  console.log("family_details", family_details);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit_family", { state: { family_details } });
  };

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
          <div
            style={{ opacity: 0.8, cursor: "pointer" }}
            onClick={handleEditClick}
          >
            <Typography variant="subtitle2">Edit</Typography>
          </div>

          <EditIcon
            style={{
              fontSize: "17px",
              color: "blue",
              marginLeft: "5px",
              cursor: "pointer",
            }}
            onClick={handleEditClick}
          />
        </div>
      </Grid>

      <div style={{ display: "flex", padding: "10px 0" }}>
        {iconComponent}

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Family Members
          </Typography>
          <Typography variant="subtitle2">
            {manupulated_str}
            {/* {manupulated_str} */}
            {/* Father, Mother, {family_details÷['no_of_married_brothers']-family_details['no_of_brothers']} unmarried brothers, {family_details['no_of_married_sisters']-family_details['no_of_sisters']} unmarried sisters. total {family_details['no_of_married_brothers']+family_details['no_of_sisters']} siblings. */}
          </Typography>
        </div>
      </div>

      <div style={{ display: "flex", padding: "10px 0" }}>
        <Location
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        />

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Stay in
          </Typography>
          <Typography variant="subtitle2">
            {family_details["current_location"]}
          </Typography>
        </div>
      </div>

      <div style={{ display: "flex", padding: "10px 0" }}>
        <Location
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        />

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Native
          </Typography>
          <Typography variant="subtitle2">
            {family_details["native_location"]}
          </Typography>
        </div>
      </div>

      <div style={{ display: "flex", padding: "10px 0" }}>
        <Affluence
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        />

        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            Affluence
          </Typography>
          <Typography variant="subtitle2">
            {family_details["affluence"]}
          </Typography>
        </div>
      </div>
    </Grid>
  );
};

export default function PreviewProfile() {
  const profile_info_obj = {
    family_details: {
      no_of_brothers: 2,
      no_of_married_brothers: 2,
      no_of_sisters: 2,
      no_of_married_sisters: 2,
      current_location: "delhi",
      native_location: "gonda",
      affluence: "MIDDLE_CLASS",
    },
  };
  const a = "variable"
  return (
    <>
      <div
        style={{
          margin: "10px",
          padding: "15px 0",
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <FamilyPreview
          family_details={profile_info_obj["family_details"]}
          iconComponent={
            <People
              style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
            />
          }
          manupulated_str={`Manupulated string ${a}`}
        />
      </div>
    </>
  );
}
