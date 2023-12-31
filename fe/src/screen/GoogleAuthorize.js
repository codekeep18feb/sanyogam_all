import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../redux/counter/AuthAction";

import { useLocation } from "react-router-dom";

export function GoogleAuthorize({ login }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const GOOGLE_CLIENT_ID =
    "93333716320-7ls324ni108j5b3oqtsnp28gc89b0d6s.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  const GOOGLE_REDIRECT_URI = "http://192.168.1.5:3000/google_authorized";
  const GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token";
  const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

  useEffect(() => {
    // Parse the query parameters from the location search string
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    const token_url = GOOGLE_TOKEN_URL;

    const token_data = {
      code: code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    };

    // Exchange code for access token
    const exchangeCodeForToken = async () => {
      try {
        const response = await fetch(token_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(token_data),
        });

        if (response.ok) {
          const token_info = await response.json();
          const access_token = token_info.access_token;

          if (access_token) {
            console.log("here is access token", access_token);

            // Fetch user data using the access token
            const user_info_response = await fetch(GOOGLE_USER_INFO_URL, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            });

            if (user_info_response.ok) {
              const user_info = await user_info_response.json();
              console.log("user_info name and image", user_info);

              // If "gender" is not present in userData, show the gender dropdown
              if (!user_info.gender) {
                setSelectedGender(""); // Reset selectedGender state
              }

              setUserData(user_info);
            }
            // Prompt user for a password before making the API request
            setIsLoading(false);
          } else {
            console.error("Access token not found in response.");
          }
        } else {
          console.error(
            "Error exchanging code for access token:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    exchangeCodeForToken();
  }, [location.search]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make the API request with the password and user_info
      const response = await fetch(
        "http://192.168.1.5:8000/api/save_user_detail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
            password: password,
            gender: selectedGender,
          }),
        }
      );

      if (response.status === 201) {
        // const data = await response.json();
        // console.log('API response:', data);
        try {
          const response = await fetch("http://192.168.1.5:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userData["email"],
              padssword: password,
            }),
          });

          if (response.status === 201) {
            const data = await response.json();
            // Save the token to local storage

            if (data) {
              const response = await fetch("http://192.168.1.5:8000/api/me", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${data.token}`, // Replace with your JWT token
                },
              });

              if (response.status === 200) {
                localStorage.setItem("token", data.token);
                const meUser = await response.json();
                // Save the token to local storage
                localStorage.setItem("meUser", JSON.stringify(meUser));
                console.log("hereismeUser", meUser);
                login(meUser);
                // // Redirect to /people on successful login
                navigate("/");
              } else {
                console.log("Unable to fetch data from /ME");
                setError('Unable to fetch data from "/me" api..');
              }
            }
            // localStorage.setItem('token', data.token);
            // login({"user_name":"deepak18feb"})
            // // Redirect to /people on successful login
            // navigate('/');
          } else {
            console.log("Invalid email or password");

            setError("Invalid email or password");
          }

          // const response2 = await fetch('http://192.168.1.5:8000/api/profiles', {
          //   method: 'GET',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // });

          // if (response2.status === 200) {
          //   const data = await response.json();
          //   console.log("data",data)
          //   // Save the token to local storage
          //   // localStorage.setItem('token', data.token);
          //   // Redirect to /people on successful login
          //   // navigate('/people');
          // } else {
          //   setError('Peopleissu');
          // }
        } catch (error) {
          setError(
            "An error occurred while logging in" + JSON.stringify(error)
          );
        }
      } else {
        console.error("Error making API request:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Google Authorization Data</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userData && !userData.gender && (
            <div>
              <label>Select Gender: </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => handlePasswordSubmit(e)}>Submit</button>
        </>
      )}
    </div>
  );
}
// export default GoogleAuthorize
export default connect(null, { login, logout })(GoogleAuthorize);
