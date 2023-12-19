import { Grid, Typography } from "@mui/material";
import React from "react";
import Location from "@mui/icons-material/LocationOnOutlined";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Affluence from "@mui/icons-material/Class";
import { useNavigate } from "react-router-dom";

import People from "@mui/icons-material/PeopleAltOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import Icon from '@mui/material/Icon';
import ParentForWrapperOVG from "./reusables/ParentForWrapperOVG";

export const SelectedIcon = ({ iconName = 'missing',style_obj }) => {

  const iconComponents = {
    location: Location,
    missing: LiveHelpIcon,
    // Add more mappings as needed
  };

  if (Object.keys(iconComponents).includes(iconName)) {
    const SelectedIcon = iconComponents[iconName];
    return <SelectedIcon style={style_obj}/>

  }
  else {
    const SelectedIcon = iconComponents['missing'];
    return <SelectedIcon style={style_obj}/>

  }
}


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
    <ParentForWrapperOVG family_details={family_details}/>
  
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
