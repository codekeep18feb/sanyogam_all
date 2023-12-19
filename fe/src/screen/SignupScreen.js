import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../redux/counter/AuthAction";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function SignupScreen() {
  const navigate = useNavigate();

  // # Google OAuth configuration (replace with your actual credentials)
  const GOOGLE_CLIENT_ID =
    "93333716320-7ls324ni108j5b3oqtsnp28gc89b0d6s.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  const GOOGLE_REDIRECT_URI = "http://localhost:3000/google_authorized";
  // const # Google OAuth endpoints
  const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth";
  const GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token";
  const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

  // Initialize state for form fields
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    gender: "Female", // Default to 'Male'
  });

  const redirectToExternalUrl = () => {
    const auth_url = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read&response_type=code`;

    // const auth_url = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile https://www.googleapis.com/auth/userinfo.profile&response_type=code`;
    // const auth_url = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile&response_type=code`
    window.location.href = auth_url;
    // Use window.location.href to navigate to an external URL
    // window.location.href = 'https://www.google.com'; // Replace with the desired external URL
    // window.location.href = 'https://www.google.com'; // Replace with the desired external URL
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server with the form data
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the POST request is successful, navigate to the "/login" route
        navigate("/login");
      } else {
        // Handle error response here (e.g., display an error message)
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl variant="outlined" fullWidth margin="normal">
            <Typography variant="h6">First Name</Typography>
            <TextField
              label="Enter your First Name"
              variant="outlined"
              fullWidth
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" fullWidth margin="normal">
            <Typography variant="h6">Last Name</Typography>
            <TextField
              label="Enter your Last Name"
              variant="outlined"
              fullWidth
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" fullWidth margin="normal">
            <Typography variant="h6">Email</Typography>
            <TextField
              label="Enter your Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" fullWidth margin="normal">
            <Typography variant="h6">Password</Typography>
            <TextField
              label="Enter your Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" fullWidth margin="normal">
            <Typography variant="h6">Gender</Typography>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <button type="submit">Signup</button>
      </form>
      <h2>OR</h2>

      <button onClick={() => redirectToExternalUrl()}>Go to Google</button>
    </div>
  );
}
