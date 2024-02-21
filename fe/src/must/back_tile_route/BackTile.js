import { Typography } from "@mui/material";
import React from "react";

export default function BackTile() {
  return (
    <div>
      <div>BackTile</div>

      <div>Here we can prepare the /edit_profile flow </div>

      <div style={{ marginTop: "10px", opacity: 0.8 }}>
        <a href="edit_profile" style={{ textDecoration: "none" }}>
          <Typography variant="subtitle2">Edit Profile</Typography>
        </a>
      </div>
    </div>
  );
}
