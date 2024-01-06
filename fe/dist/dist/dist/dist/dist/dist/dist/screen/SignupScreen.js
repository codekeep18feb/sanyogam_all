"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SignupScreen;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactRedux = require("react-redux");
var _AuthAction = require("../redux/counter/AuthAction");
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _RadioGroup = _interopRequireDefault(require("@mui/material/RadioGroup"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Radio = _interopRequireDefault(require("@mui/material/Radio"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function (e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return {
    default: e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}
function SignupScreen() {
  const navigate = (0, _reactRouterDom.useNavigate)();

  // # Google OAuth configuration (replace with your actual credentials)
  const GOOGLE_CLIENT_ID = "93333716320-7ls324ni108j5b3oqtsnp28gc89b0d6s.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  const GOOGLE_REDIRECT_URI = "http://192.168.1.10:3000/google_authorized";
  // const # Google OAuth endpoints
  const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth";
  const GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token";
  const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

  // Initialize state for form fields
  const [formData, setFormData] = (0, _react.useState)({
    fname: "",
    lname: "",
    email: "",
    password: "",
    gender: "Female" // Default to 'Male'
  });
  const redirectToExternalUrl = () => {
    const auth_url = "".concat(GOOGLE_AUTH_URL, "?client_id=").concat(GOOGLE_CLIENT_ID, "&redirect_uri=").concat(GOOGLE_REDIRECT_URI, "&scope=email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read&response_type=code");

    // const auth_url = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile https://www.googleapis.com/auth/userinfo.profile&response_type=code`;
    // const auth_url = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile&response_type=code`
    window.location.href = auth_url;
    // Use window.location.href to navigate to an external URL
    // window.location.href = 'https://www.google.com'; // Replace with the desired external URL
    // window.location.href = 'https://www.google.com'; // Replace with the desired external URL
  };
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Send a POST request to your server with the form data
      const response = await fetch("http://192.168.1.10:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
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
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Signup"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "First Name"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Enter your First Name",
    variant: "outlined",
    fullWidth: true,
    name: "fname",
    value: formData.fname,
    onChange: handleChange,
    required: true
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Last Name"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Enter your Last Name",
    variant: "outlined",
    fullWidth: true,
    name: "lname",
    value: formData.lname,
    onChange: handleChange,
    required: true
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Email"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Enter your Email",
    variant: "outlined",
    fullWidth: true,
    name: "email",
    value: formData.email,
    onChange: handleChange,
    required: true
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Password"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Enter your Password",
    variant: "outlined",
    fullWidth: true,
    type: "password",
    name: "password",
    value: formData.password,
    onChange: handleChange,
    required: true
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Gender"), /*#__PURE__*/_react.default.createElement(_RadioGroup.default, {
    name: "gender",
    value: formData.gender,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    value: "Male",
    control: /*#__PURE__*/_react.default.createElement(_Radio.default, null),
    label: "Male"
  }), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    value: "Female",
    control: /*#__PURE__*/_react.default.createElement(_Radio.default, null),
    label: "Female"
  })))), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit"
  }, "Signup")), /*#__PURE__*/_react.default.createElement("h2", null, "OR"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => redirectToExternalUrl()
  }, "Go to Google"));
}