import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../redux/counter/AuthAction";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChatIcon from "@mui/icons-material/QuestionAnswer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

function HeaderMobile({ auth_data, logout }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically
  };

  const centerOptionsStyle = {
    display: "flex",
    justifyContent: "center", // Center align horizontally
    alignItems: "center", // Align items vertically
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    marginRight: "16px",
  };

  const handleLogout = async () => {
    try {
      // Send a POST request to your server with the form data
      logout();

      const JWT_TOKEN = localStorage.getItem("token");
      const token = `Bearer ${JWT_TOKEN}`;
      console.log("token", token);

      const response = await fetch("http://192.168.1.13:8000/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Replace with your JWT token
        },
      });

      if (response.ok) {
        // If the POST request is successful, navigate to the "/login" route
        // navigate('/login');
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        // Handle error response here (e.g., display an error message)
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLanguageChange = (event) => {
    // Handle language change here
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(270.06deg, rgba(46, 27, 254, 0.74) 5.67%, #FF0099 75.76%)",
      }}
    >
      {/* <Toolbar> */}

      <div style={headerStyle}>
        <div>
          <Grid container spacing={1}>
            <Grid item>
              <Link to="/language" style={linkStyle}>
                <div>
                  <Select value="Eng" onChange={handleLanguageChange}>
                    <MenuItem value="Eng">Eng</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                  </Select>
                </div>
              </Link>
            </Grid>
          </Grid>
        </div>

        <div style={centerOptionsStyle}>
          {auth_data && (
            <>
              {auth_data && ( // Display "Notifications" only when the user is logged in
                <Button color="inherit">
                  <Link to="/notifications" style={linkStyle}>
                    <NotificationsIcon />
                  </Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      {/* </Toolbar> */}
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth_data: state.auth.data, // Assuming you have a reducer that manages a "count" property
  };
};

export default connect(mapStateToProps, { logout })(HeaderMobile);
