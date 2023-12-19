import React from "react";
import { Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { SelectedIcon } from "../PreviewProfile";

export default function ChildForParentOVG({ family_details, rules }) {
  console.log("family_detadfils", family_details, rules);
  //   { backend object
  //     "affluence": "string",
  //     "family_location": "string",
  //     "id": 1,
  //     "married_brother": 0,
  //     "married_sister": 0,
  //     "native_place": "string",
  //     "no_of_brothers": 0,
  //     "no_of_sisters": 0,
  //     "profile": 1
  //   }

  const handleEditClick = () => {
    navigate("/edit_family", { state: { family_details } });
  };
  const navigate = useNavigate();

  const all_childs = Object.keys(family_details).map((row) => {
    const val = family_details[row];
    const rule = rules[row];
    const display = rule["display"];
    console.log("HWERWEQ", rules, row, val);
    if (row=='extra'){
        console.log('extra row',row)
    }
    if (display) {
      return (
        <div style={{ display: "flex", padding: "10px 0" }}>
            {/* <Location
          style={{ fontSize: "24px", color: "magenta", padding: "20px" }}
        /> */}
          {rule['iconName'] && <SelectedIcon iconName={rule['iconName']} style_obj={{ fontSize: "24px", color: "magenta", padding: "20px" }}/>}
        <div>
          <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
          {rule['label'] ? rule['label']: row}
            {/* {row}-{rule['label']} */}
            {/* {row} */}
          </Typography>
          <Typography variant="subtitle2">
            {val}
          </Typography>
        </div>
          {/* {rule['iconName'] && <SelectedIcon iconName={rule['iconName']} />}
          <div>
            {row} - {val}
          </div> */}
        </div>
      );
    }

  });

  const all_childs_extra = Object.keys(rules['extra']).map((row) => {
    // const val = rules['extra']
    const row_obj = rules['extra'][row]
    console.log('row_odbj',family_details)
    const depends_on_val_obj = {}
    // row_obj['depends_on'].for_each
    row_obj['depends_on'].forEach(function(currentValue, index, array) {
      // Your code here
      depends_on_val_obj[currentValue]=family_details[currentValue]
    });
    
    
    // row_obj['depends_on'].map((i)=>family_details[i])
    // const depends_on_val_obj = row_obj['depends_on'].map((i)=>family_details[i])
    console.log('hererwer',depends_on_val_obj)
    return (
      <div style={{ display: "flex", padding: "10px 0" }}>
        {row_obj['iconName'] && <SelectedIcon iconName={row_obj['iconName']} style_obj={{ fontSize: "24px", color: "magenta", padding: "20px" }}/>}
      <div>
        <Typography variant="subtitle2" sx={{ opacity: 0.7, color: "grey" }}>
        {row_obj['label'] ? row_obj['label']: row}
        </Typography>
        <Typography variant="subtitle2">
          {/* {val} */}
          {row_obj['transform'](row_obj['exp'],depends_on_val_obj)}
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
            <div>wrapper title</div>
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
        {all_childs}
        {all_childs_extra}
      </Grid>
    </>
  );
}
