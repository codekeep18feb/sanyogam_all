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

export default function PreviewProfile({non_editable}) {
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

    father: {
      company_name: {
        type: "str",
        edit_type: "str_input",
        display: true,
        iconName: "location",
      },

      designation: {
        type: "str",
        edit_type: "str_input",
        display: true,
        iconName: "location",
      },

      first_name: {
        type: "str",
        edit_type: "str_input",
        display: true,
        iconName: "location",
      },

      last_name: {
        type: "str",
        edit_type: "str_input",
        display: true,
        iconName: "location",
      },
    },

    form_components: {
      first_name: {
        type: "str",
        edit_type: "str_input",
        display: true,
        iconName: "people",
      },
      dob: {
        type: "str",
        edit_type: "date_input",
        display: true,
        iconName: "people",
      },
      tob: {
        type: "str",
        edit_type: "time_input",
        display: true,
        iconName: "people",
      }
    },
    
  };

  
  if (data) {
    //HERE WE CAN EXTRACT THE FIELDS THAT ARE NEEDED TO GENERATE THE RIGHT OBJECT??
    const rules_keys_obj = {}
    Object.keys(rules).forEach(key=>{
      const sub_obj = JSON.parse(JSON.stringify(rules[key]))
      if('extra' in sub_obj){
        delete sub_obj['extra']
      }
      rules_keys_obj[key]=sub_obj
    
    })
      

    
    console.log('dow ehave it rules_keys_obj',rules_keys_obj)
 
    let new_p_obj= {}
    for (const o_key in rules_keys_obj) {
      const sub_data_obj = data[o_key]
      new_p_obj[o_key]={}
      for (const i_key in rules_keys_obj[o_key]) {
        if (i_key in sub_data_obj){
          new_p_obj[o_key][i_key]=sub_data_obj[i_key]
        }
 
      }
    }

    console.log('arewhereherenownew_p_obj',new_p_obj)
    profile_info_obj = new_p_obj;
  }

  console.log("here is profile_info_obj", profile_info_obj);
  
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

  if (!profile_info_obj) {
    return <div>here</div>;
  }
  return (
    <>
      {Object.keys(profile_info_obj).map((i) => {
        return (
          <div
            style={non_editable?{
              margin: "10px",
              padding: "15px 0",
              boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)",
            }:{
              margin: "10px",
              padding: "15px 0",
            }}
          >
            <UIWrapperProfile
            non_editable={non_editable}
              object_key={i}
              edit_data={profile_info_obj[i] || null}
              rules={rules[i] || null}
              opt_obj={opt_obj || null}
              iconComponent={
                <People
                  style={{
                    fontSize: "24px",
                    color: "magenta",
                    padding: "20px",
                  }}
                />
              }
              manupulated_str={`Manupulated string ${a}`}
            />
          </div>
        );
      })}
    </>
  );
}
