import React from "react";
import { Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { SelectedIcon } from "../back_tile_route/PreviewProfile";

export default function UIWrapperProfile({ object_key, edit_data, rules, opt_obj }) {
  console.log("family_detadfils", edit_data, rules);

  const handleEditClick = () => {
    const new_rules = rules;
    delete new_rules["extra"];
    navigate("/edit_profile", {
      state: { edit_data: edit_data, rules: new_rules, opt_obj,object_key },
    });
  };
  const navigate = useNavigate();

  const all_childs = Object.keys(edit_data).map((row) => {
    const val = edit_data[row];
    const rule = rules[row];
    const display = rule["display"];
    console.log("HWERWEQ", rules, row, val);
    if (row === "extra") {
      console.log("extra row", row);
    }
    if (display) {
      return (
        <div style={{ display: "flex", padding: "10px 0" }}>
          {/* <Location
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        /> */}
          {rule["iconName"] && (
            <SelectedIcon
              iconName={rule["iconName"]}
              style_obj={{
                fontSize: "24px",
                color: "magenta",
                padding: "20px",
              }}
            />
          )}
          <div>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.7, color: "grey" }}
            >
              {rule["label"] ? rule["label"] : row}
            </Typography>
            <Typography variant="subtitle2">{val}</Typography>
          </div>
        </div>
      );
    }
  });

  const all_childs_extra = Object.keys(rules["extra"]).map((row) => {
    // const val = rules['extra']
    const row_obj = rules["extra"][row];
    console.log("row_odbj", edit_data);
    const depends_on_val_obj = {};
    // row_obj['depends_on'].for_each
    row_obj["depends_on"].forEach(function (currentValue, index, array) {
      // Your code here
      depends_on_val_obj[currentValue] = edit_data[currentValue];
    });

    // row_obj['depends_on'].map((i)=>edit_data[i])
    // const depends_on_val_obj = row_obj['depends_on'].map((i)=>edit_data[i])
    console.log("hererwer", depends_on_val_obj);
    return (
      <div style={{ display: "flex", padding: "10px 0" }}>
        {row_obj["iconName"] && (
          <SelectedIcon
            iconName={row_obj["iconName"]}
            style_obj={{ fontSize: "24px", color: "magenta", padding: "20px" }}
          />
        )}
        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
            {row_obj["label"] ? row_obj["label"] : row}
          </Typography>
          <Typography variant="subtitle2">
            {/* {val} */}
            {row_obj["transform"](row_obj["exp"], depends_on_val_obj)}
          </Typography>
        </div>
      </div>
    );
  });

  return (
    <>
      <Grid container flexDirection={"column"}>
        <Grid
          container
          justifyContent="space-between"
          sx={{ padding: "5px 10px 0 10px" }}
        >
          <Grid item>
            <div>Family Info</div>
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
        {all_childs_extra}
        {all_childs}
      </Grid>
    </>
  );
}
