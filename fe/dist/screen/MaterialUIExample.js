"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@mui/material/styles");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _Radio = _interopRequireDefault(require("@mui/material/Radio"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _FormGroup = _interopRequireDefault(require("@mui/material/FormGroup"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _Table = _interopRequireDefault(require("@mui/material/Table"));
var _TableHead = _interopRequireDefault(require("@mui/material/TableHead"));
var _TableBody = _interopRequireDefault(require("@mui/material/TableBody"));
var _TableRow = _interopRequireDefault(require("@mui/material/TableRow"));
var _TableCell = _interopRequireDefault(require("@mui/material/TableCell"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const theme = (0, _styles.createTheme)();
function MaterialUIExample() {
  const [checked, setChecked] = _react.default.useState(true);
  const [selectedValue, setSelectedValue] = _react.default.useState("option1");
  const [data, setData] = _react.default.useState([{
    id: 1,
    name: "John Doe",
    age: 30
  }, {
    id: 2,
    name: "Jane Smith",
    age: 25
  }, {
    id: 3,
    name: "Bob Johnson",
    age: 35
  }]);
  const handleCheckboxChange = event => {
    setChecked(event.target.checked);
  };
  const handleRadioChange = event => {
    setSelectedValue(event.target.value);
  };
  return /*#__PURE__*/_react.default.createElement(_styles.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h1"
  }, "Material-UI Example"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    color: "primary"
  }, "Primary Button"), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Text Field",
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    component: "fieldset"
  }, /*#__PURE__*/_react.default.createElement(_FormGroup.default, null, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: checked,
      onChange: handleCheckboxChange
    }),
    label: "Check this box"
  }))), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    component: "fieldset"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Radio Buttons"), /*#__PURE__*/_react.default.createElement(_Radio.default, {
    checked: selectedValue === "option1",
    onChange: handleRadioChange,
    value: "option1",
    name: "radio-button-demo"
  }), /*#__PURE__*/_react.default.createElement(_Radio.default, {
    checked: selectedValue === "option2",
    onChange: handleRadioChange,
    value: "option2",
    name: "radio-button-demo"
  })), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    variant: "outlined",
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, "Select"), /*#__PURE__*/_react.default.createElement(_Select.default, {
    value: selectedValue,
    onChange: handleRadioChange,
    label: "Select"
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "option1"
  }, "Option 1"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "option2"
  }, "Option 2"))), /*#__PURE__*/_react.default.createElement(_Paper.default, {
    elevation: 3,
    style: {
      marginTop: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Table.default, null, /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "ID"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Name"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Age"))), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, data.map(row => /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    key: row.id
  }, /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.id), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.name), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.age))))))));
}
var _default = exports.default = MaterialUIExample;