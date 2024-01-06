"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const NumberField = _ref => {
  let {
    id,
    label,
    defaultValue = 0
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.TextField, {
    id: id,
    label: label,
    type: "number",
    InputLabelProps: {
      shrink: true
    },
    variant: "standard",
    defaultValue: defaultValue // Add this line to set the default value
  });
};
const AutocompleteField = _ref2 => {
  let {
    options,
    id,
    label,
    defaultValue
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
    options: options.map(option => option.title),
    id: id,
    value: defaultValue // Set the default value
    ,
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      label: label,
      variant: "standard"
    }))
  });
};
const EditFamilyForm = () => {
  const locations = [{
    title: "Noida"
  }, {
    title: "Delhi"
  }];
  const affluenceOptions = [{
    title: "LOWER_MIDDLE_CLASS"
  }, {
    title: "MIDDLE_CLASS"
  }, {
    title: "UPPER_MIDDLE_CLASS"
  }];

  // Use the useLocation hook to access the current location object
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const family_details = state && state.family_details;
  console.log('family_detailsdafd', family_details);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1,
    justifyContent: "center",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 5
  }, /*#__PURE__*/_react.default.createElement(NumberField, {
    id: "no_of_brothers",
    label: "No Of Brothers",
    defaultValue: family_details['no_of_brothers']
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 5
  }, /*#__PURE__*/_react.default.createElement(NumberField, {
    id: "married-brother-number",
    label: "Married Brother",
    defaultValue: family_details['married_brother']
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1,
    justifyContent: "center",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 5
  }, /*#__PURE__*/_react.default.createElement(NumberField, {
    id: "sister-number",
    label: "No Of Sisters",
    defaultValue: family_details['no_of_sisters']
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 5
  }, /*#__PURE__*/_react.default.createElement(NumberField, {
    id: "married-sister-number",
    label: "Married Sister",
    defaultValue: family_details['married_sister']
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1,
    justifyContent: "center",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 10
  }, /*#__PURE__*/_react.default.createElement(AutocompleteField, {
    options: locations,
    id: "current-location",
    label: "Current Location",
    defaultValue: family_details['family_location']
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1,
    justifyContent: "center",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 10
  }, /*#__PURE__*/_react.default.createElement(AutocompleteField, {
    options: locations,
    id: "native-location",
    label: "Native Location",
    defaultValue: family_details['native_place']
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1,
    justifyContent: "center",
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 10
  }, /*#__PURE__*/_react.default.createElement(AutocompleteField, {
    options: affluenceOptions,
    id: "affluence",
    label: "Affluence",
    defaultValue: family_details['affluence']
  })))));
};
var _default = exports.default = EditFamilyForm;