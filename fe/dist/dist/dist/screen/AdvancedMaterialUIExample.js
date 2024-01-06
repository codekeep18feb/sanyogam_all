"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _Stepper = _interopRequireDefault(require("@mui/material/Stepper"));
var _Step = _interopRequireDefault(require("@mui/material/Step"));
var _StepLabel = _interopRequireDefault(require("@mui/material/StepLabel"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
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
const theme = (0, _styles.createTheme)();
function AdvancedMaterialUIExample() {
  const [activeStep, setActiveStep] = (0, _react.useState)(0);
  const [formData, setFormData] = (0, _react.useState)({
    name: "",
    email: "",
    agree: false
  });
  const [errors, setErrors] = (0, _react.useState)({});
  const steps = ["Step 1", "Step 2", "Step 3"];
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Submit the form data
      console.log("Form data submitted:", formData);
      return;
    }

    // Validate the form data for the current step
    const currentStepErrors = validateStep(activeStep);
    if (Object.keys(currentStepErrors).length === 0) {
      setActiveStep(prevStep => prevStep + 1);
    } else {
      setErrors(currentStepErrors);
    }
  };
  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };
  const validateStep = step => {
    const currentStepErrors = {};
    if (step === 0) {
      if (!formData.name) {
        currentStepErrors.name = "Name is required";
      }
      if (!formData.email) {
        currentStepErrors.email = "Email is required";
      } else if (!isValidEmail(formData.email)) {
        currentStepErrors.email = "Invalid email format";
      }
    }
    if (step === 1) {
      if (!formData.agree) {
        currentStepErrors.agree = "You must agree to the terms";
      }
    }
    return currentStepErrors;
  };
  const isValidEmail = email => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const getStepContent = step => {
    switch (step) {
      case 0:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
          label: "Name",
          variant: "outlined",
          fullWidth: true,
          margin: "normal",
          value: formData.name,
          onChange: e => setFormData({
            ...formData,
            name: e.target.value
          }),
          error: !!errors.name,
          helperText: errors.name
        }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
          label: "Email",
          variant: "outlined",
          fullWidth: true,
          margin: "normal",
          value: formData.email,
          onChange: e => setFormData({
            ...formData,
            email: e.target.value
          }),
          error: !!errors.email,
          helperText: errors.email
        }));
      case 1:
        return /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
          control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
            checked: formData.agree,
            onChange: e => setFormData({
              ...formData,
              agree: e.target.checked
            })
          }),
          label: "I agree to the terms and conditions",
          error: !!errors.agree,
          helperText: errors.agree
        });
      case 2:
        return /*#__PURE__*/_react.default.createElement(_Typography.default, {
          variant: "h6"
        }, "Thank you for submitting the form!");
      default:
        return "Unknown step";
    }
  };
  return /*#__PURE__*/_react.default.createElement(_styles.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    elevation: 3,
    style: {
      padding: "16px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Stepper.default, {
    activeStep: activeStep,
    alternativeLabel: true
  }, steps.map(label => /*#__PURE__*/_react.default.createElement(_Step.default, {
    key: label
  }, /*#__PURE__*/_react.default.createElement(_StepLabel.default, null, label)))), getStepContent(activeStep), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    disabled: activeStep === 0,
    onClick: handleBack,
    variant: "outlined"
  }, "Back"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    color: "primary",
    onClick: handleNext
  }, activeStep === steps.length - 1 ? "Submit" : "Next"))));
}
var _default = exports.default = AdvancedMaterialUIExample;