"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FamilyPreview = void 0;
exports.default = PreviewProfile;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _LocationOnOutlined = _interopRequireDefault(require("@mui/icons-material/LocationOnOutlined"));
var _LiveHelp = _interopRequireDefault(require("@mui/icons-material/LiveHelp"));
var _Class = _interopRequireDefault(require("@mui/icons-material/Class"));
var _reactRouterDom = require("react-router-dom");
var _PeopleAltOutlined = _interopRequireDefault(require("@mui/icons-material/PeopleAltOutlined"));
var _PhotoCamera = _interopRequireDefault(require("@mui/icons-material/PhotoCamera"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _Icon = _interopRequireDefault(require("@mui/material/Icon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SelectedIcon = _ref => {
  let {
    iconName = 'missing'
  } = _ref;
  const iconComponents = {
    location: _LocationOnOutlined.default,
    missing: _LiveHelp.default
    // Add more mappings as needed
  };
  if (Object.keys(iconComponents).includes(iconName)) {
    const SelectedIcon = iconComponents[iconName];
    return /*#__PURE__*/_react.default.createElement(SelectedIcon, null);
  } else {
    const SelectedIcon = iconComponents['missing'];
    return /*#__PURE__*/_react.default.createElement(SelectedIcon, null);
  }
};
const FamilyPreview = _ref2 => {
  let {
    family_details,
    iconComponent,
    manupulated_str
  } = _ref2;
  console.log("family_details", family_details);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const handleEditClick = () => {
    navigate("/edit_family", {
      state: {
        family_details
      }
    });
  };
  const iconName = 'another'; // Dynamically set the icon name based on some condition or user input

  // const SelectedIcon = iconComponents[iconName];

  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    justifyContent: "space-between",
    sx: {
      padding: "5px 10px 0 10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement("div", null, "Family Details")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      opacity: 0.8,
      cursor: "pointer"
    },
    onClick: handleEditClick
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2"
  }, "Edit")), /*#__PURE__*/_react.default.createElement(_Edit.default, {
    style: {
      fontSize: "17px",
      color: "blue",
      marginLeft: "5px",
      cursor: "pointer"
    },
    onClick: handleEditClick
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      padding: "10px 0"
    }
  }, iconComponent, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    sx: {
      opacity: 0.7,
      color: "grey"
    }
  }, "Family Members"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2"
  }, manupulated_str))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      padding: "10px 0"
    }
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    style: {
      fontSize: '24px',
      color: 'magenta',
      padding: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement(SelectedIcon, {
    iconName: "location"
  })), ";", /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    sx: {
      opacity: 0.7,
      color: "grey"
    }
  }, "Stay in"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2"
  }, family_details["family_location"]))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      padding: "10px 0"
    }
  }, /*#__PURE__*/_react.default.createElement(_LocationOnOutlined.default, {
    style: {
      fontSize: "24px",
      color: "magenta",
      padding: "20px"
    }
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    sx: {
      opacity: 0.7,
      color: "grey"
    }
  }, "Native"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2"
  }, family_details["native_place"]))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      padding: "10px 0"
    }
  }, /*#__PURE__*/_react.default.createElement(_Class.default, {
    style: {
      fontSize: "24px",
      color: "magenta",
      padding: "20px"
    }
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    sx: {
      opacity: 0.7,
      color: "grey"
    }
  }, "Affluence"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2"
  }, family_details["affluence"]))));
};
exports.FamilyPreview = FamilyPreview;
function PreviewProfile() {
  const profile_info_obj = {
    family_details: {
      no_of_brothers: 2,
      married_brother: 2,
      no_of_sisters: 2,
      married_sister: 2,
      family_location: "delhi",
      native_place: "gonda",
      affluence: "MIDDLE_CLASS"
    }
  };
  const a = "variable";
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "10px",
      padding: "15px 0",
      boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)"
    }
  }, /*#__PURE__*/_react.default.createElement(FamilyPreview, {
    family_details: profile_info_obj["family_details"],
    iconComponent: /*#__PURE__*/_react.default.createElement(_PeopleAltOutlined.default, {
      style: {
        fontSize: "24px",
        color: "magenta",
        padding: "20px"
      }
    }),
    manupulated_str: "Manupulated string ".concat(a)
  })));
}