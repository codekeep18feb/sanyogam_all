"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _AuthAction = require("../redux/counter/AuthAction");
var _reactRouterDom = require("react-router-dom");
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Radio from '@mui/material/Radio';
// import Select from '@mui/material/Select';

// import MenuItem from '@mui/material/MenuItem';

function Login(_ref) {
  let {
    login,
    logout
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [email, setEmail] = (0, _react.useState)("");
  const [password, setPassword] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)("");
  // const [name, setName] = React.useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.10:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
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
            console.log("meUser", meUser);
            login(meUser);
            // Redirect to /people on successful login
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
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Login"), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Email"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Enter your Email",
    variant: "outlined",
    fullWidth: true,
    value: email,
    onChange: handleEmailChange
  })), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Password"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Enter your Password",
    variant: "outlined",
    fullWidth: true,
    value: password,
    onChange: handlePasswordChange
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleLogin
  }, "Login"), error && /*#__PURE__*/_react.default.createElement("p", null, error));
}

// export default Login;

// const mapStateToProps = (state) => {
//   console.log("sdfasdsdasomeste",state)
//   return {

//     state, // Assuming you have a reducer that manages a "count" property
//   }
// };
var _default = exports.default = (0, _reactRedux.connect)(null, {
  login: _AuthAction.login,
  logout: _AuthAction.logout
})(Login);