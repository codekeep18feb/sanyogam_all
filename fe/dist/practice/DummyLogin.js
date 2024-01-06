"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DummyLogin;
var _react = _interopRequireDefault(require("react"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _FormGroup = _interopRequireDefault(require("@mui/material/FormGroup"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _Radio = _interopRequireDefault(require("@mui/material/Radio"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DummyLogin() {
  const [selectedGender, setSelectedGender] = _react.default.useState("Male");
  const [selectedDropdown, setSelectedDropdown] = _react.default.useState("dropdown1"); // Default to 'dropdown1'
  const [name, setName] = _react.default.useState("");
  const [gender, setGender] = _react.default.useState({
    opt1: false,
    opt2: false,
    other: false
  });
  const handleRadioChange = event => {
    const value = event.target.value;
    setSelectedGender(value);
  };
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleDropdownChange = event => {
    setSelectedDropdown(event.target.value);
  };
  const handleGenderChange = event => {
    setGender({
      ...gender,
      [event.target.name]: event.target.checked
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    component: "fieldset"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Gender"), /*#__PURE__*/_react.default.createElement(_FormGroup.default, null, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
      checked: selectedGender === "Male",
      onChange: handleRadioChange,
      value: "Male",
      name: "gender"
    }),
    label: "Male"
  }), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
      checked: selectedGender === "Female",
      onChange: handleRadioChange,
      value: "Female",
      name: "gender"
    }),
    label: "Female"
  }))), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Select"), /*#__PURE__*/_react.default.createElement(_Select.default, {
    value: selectedDropdown,
    onChange: handleDropdownChange,
    label: "Select"
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "dropdown1"
  }, "Dropdown 1"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "dropdown2"
  }, "Dropdown 2"))), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    component: "fieldset"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "CheckOps"), /*#__PURE__*/_react.default.createElement(_FormGroup.default, null, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: gender.opt1,
      onChange: handleGenderChange,
      name: "opt1"
    }),
    label: "Opt1"
  }), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: gender.opt2,
      onChange: handleGenderChange,
      name: "opt2"
    }),
    label: "Opt2"
  }), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: gender.other,
      onChange: handleGenderChange,
      name: "other"
    }),
    label: "Other"
  }))), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Name"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Enter your name",
    variant: "outlined",
    fullWidth: true,
    value: name,
    onChange: handleNameChange
  })));
}