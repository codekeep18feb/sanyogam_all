import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Location from "@mui/icons-material/LocationOnOutlined";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Affluence from "@mui/icons-material/Class";
import { useNavigate } from "react-router-dom";

import People from "@mui/icons-material/PeopleAltOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import ParentForWrapperOVG from "../reusables/ParentForWrapperOVG";

export const SelectedIcon = ({ iconName = "missing", style_obj }) => {
  const iconComponents = {
    location: Location,
    missing: LiveHelpIcon,
    people: People,
    camera: PhotoCamera,
    affluence: Affluence,
    // Add more mappings as needed
  };

  if (Object.keys(iconComponents).includes(iconName)) {
    const SelectedIcon = iconComponents[iconName];
    return <SelectedIcon style={style_obj} />;
  } else {
    const SelectedIcon = iconComponents["missing"];
    return <SelectedIcon style={style_obj} />;
  }
};

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

  return <ParentForWrapperOVG family_details={family_details} />;
};

export default function PreviewProfile() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const fetchProfileData = async () => {
    // console.log("am I being called", isInitiator, sdp);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = `Bearer ${JWT_TOKEN}`;

    try {
      const response = await fetch(`http://192.168.1.2:8000/api/my_profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully got the data, data", data);
        return data;
      } else {
        console.log("Error fetching profile data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(async () => {
    const data = await fetchProfileData();
    console.log("datadfdf", data);
    delete data["family_info"]["profile"];
    delete data["family_info"]["id"];
    setData(data);
  }, []);

  const profile_info_obj =
    data && data["family_info"] ? data["family_info"] : null;
  const a = "variable";
  return (
    <>
      <div
        style={{
          margin: "10px",
          padding: "15px 0",
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        {profile_info_obj === null || loading ? (
          <div>loader...</div>
        ) : (
          <FamilyPreview
            family_details={profile_info_obj}
            iconComponent={
              <People
                style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
              />
            }
            manupulated_str={`Manupulated string ${a}`}
          />
        )}
      </div>
    </>
  );
}
