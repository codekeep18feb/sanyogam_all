"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAuthorize = GoogleAuthorize;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _AuthAction = require("../redux/counter/AuthAction");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GoogleAuthorize(_ref) {
  let {
    login
  } = _ref;
  const location = (0, _reactRouterDom.useLocation)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [error, setError] = (0, _react.useState)("");
  const [userData, setUserData] = (0, _react.useState)(null);
  const [password, setPassword] = (0, _react.useState)("");
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const [selectedGender, setSelectedGender] = (0, _react.useState)("");
  const GOOGLE_CLIENT_ID = "93333716320-7ls324ni108j5b3oqtsnp28gc89b0d6s.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  const GOOGLE_REDIRECT_URI = "http://192.168.1.10:3000/google_authorized";
  const GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token";
  const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";
  (0, _react.useEffect)(() => {
    // Parse the query parameters from the location search string
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const token_url = GOOGLE_TOKEN_URL;
    const token_data = {
      code: code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code"
    };

    // Exchange code for access token
    const exchangeCodeForToken = async () => {
      try {
        const response = await fetch(token_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(token_data)
        });
        if (response.ok) {
          const token_info = await response.json();
          const access_token = token_info.access_token;
          if (access_token) {
            console.log("here is access token", access_token);

            // Fetch user data using the access token
            const user_info_response = await fetch(GOOGLE_USER_INFO_URL, {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
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
          console.error("Error exchanging code for access token:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    exchangeCodeForToken();
  }, [location.search]);
  const handlePasswordSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Make the API request with the password and user_info
      const response = await fetch("http://192.168.1.10:8000/api/save_user_detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...userData,
          password: password,
          gender: selectedGender
        })
      });
      if (response.status === 201) {
        // const data = await response.json();
        // console.log('API response:', data);
        try {
          const response = await fetch("http://192.168.1.10:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: userData["email"],
              padssword: password
            })
          });
          if (response.status === 201) {
            const data = await response.json();
            // Save the token to local storage

            if (data) {
              const response = await fetch("http://192.168.1.10:8000/api/me", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer ".concat(data.token) // Replace with your JWT token
                }
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

          // const response2 = await fetch('http://192.168.1.10:8000/api/profiles', {
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
          setError("An error occurred while logging in" + JSON.stringify(error));
        }
      } else {
        console.error("Error making API request:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setIsLoading(false);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Google Authorization Data"), isLoading ? /*#__PURE__*/_react.default.createElement("p", null, "Loading...") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, userData && !userData.gender && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Select Gender: "), /*#__PURE__*/_react.default.createElement("select", {
    value: selectedGender,
    onChange: e => setSelectedGender(e.target.value)
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Male"
  }, "Male"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Female"
  }, "Female"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Other"
  }, "Other"))), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    placeholder: "Enter your password",
    value: password,
    onChange: e => setPassword(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => handlePasswordSubmit(e)
  }, "Submit")));
}
// export default GoogleAuthorize
var _default = exports.default = (0, _reactRedux.connect)(null, {
  login: _AuthAction.login,
  logout: _AuthAction.logout
})(GoogleAuthorize);