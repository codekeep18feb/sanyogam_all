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
import UIWrapperProfile from "../reusables/UIWrapperProfile";

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

  let profile_info_obj = null;
  if (data) {
    //HERE WE CAN EXTRACT THE FIELDS THAT ARE NEEDED TO GENERATE THE RIGHT OBJECT??
    const { family_info } = data;
    const new_p_obj = { family_info };
    profile_info_obj = new_p_obj;
  }
  // const profile_info_obj =
  //   data ? data : null;
  // data && data["family_info"] ? data["family_info"] : null;
  console.log("here is profile_info_obj", profile_info_obj);
  const a = "variable";

  const transform_content = (expression, values) => {
    console.log("asdfasdf", expression, values);
    // return args.join('');
    try {
      return expression.replace(
        /\${(\w+)}/g,
        (_, variable) => values[variable]
      );
    } catch (error) {
      console.error("Error evaluating expression:", error.message);
      return null;
    }
  };
  const rules = {
    family_info: {
      family_location: {
        type: "str",
        edit_type: "dropdown",
        display: true,
        iconName: "location",
      },
      affluence: {
        type: "str",
        edit_type: "dropdown",
        display: true,
        iconName: "affluence",
      },
      no_of_brothers: {
        type: "num",
        edit_type: "num_input",
        display: false,
        iconName: "affluence",
      },
      native_place: {
        type: "str",
        edit_type: "dropdown",
        display: true,
        iconName: "location",
        label: "native location",
      },
      married_brother: {
        type: "num",
        edit_type: "num_input",
        display: false,
        iconName: "affluence",
      },
      married_sister: {
        type: "num",
        edit_type: "num_input",
        display: false,
        iconName: "affluence",
      },
      no_of_sisters: {
        type: "num",
        edit_type: "num_input",
        display: false,
        iconName: "affluence",
      },
      extra: {
        family_members: {
          type: "str",
          display: true,
          iconName: "people",
          label: "Family Members",
          depends_on: [
            "no_of_brothers",
            "married_brother",
            "married_sister",
            "no_of_sisters",
          ],
          transform: transform_content,
          exp: "Total Siblings - ${married_brother}, ${married_sister}, ${no_of_brothers}, ${no_of_sisters}",
        },
      },
    },
  };

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
          <UIWrapperProfile
            family_details={profile_info_obj["family_info"] || null}
            rules={rules["family_info"] || null}
            opt_obj={opt_obj || null}
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
