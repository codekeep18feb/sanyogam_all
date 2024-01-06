"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChildForParentOVG;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _reactRouterDom = require("react-router-dom");
var _PreviewProfile = require("../PreviewProfile");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ChildForParentOVG(_ref) {
  let {
    family_details,
    rules
  } = _ref;
  console.log("family_detadfils", family_details, rules);
  //   { backend object
  //     "affluence": "string",
  //     "family_location": "string",
  //     "id": 1,
  //     "married_brother": 0,
  //     "married_sister": 0,
  //     "native_place": "string",
  //     "no_of_brothers": 0,
  //     "no_of_sisters": 0,
  //     "profile": 1
  //   }

  const handleEditClick = () => {
    const new_rules = rules;
    delete new_rules["extra"];
    navigate("/edit_family", {
      state: {
        family_details: family_details,
        rules: new_rules
      }
    });
  };
  const navigate = (0, _reactRouterDom.useNavigate)();
  const all_childs = Object.keys(family_details).map(row => {
    const val = family_details[row];
    const rule = rules[row];
    const display = rule["display"];
    console.log("HWERWEQ", rules, row, val);
    if (row === "extra") {
      console.log("extra row", row);
    }
    if (display) {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          padding: "10px 0"
        }
      }, rule["iconName"] && /*#__PURE__*/_react.default.createElement(_PreviewProfile.SelectedIcon, {
        iconName: rule["iconName"],
        style_obj: {
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
      }, rule["label"] ? rule["label"] : row), /*#__PURE__*/_react.default.createElement(_material.Typography, {
        variant: "subtitle2"
      }, val)));
    }
  });
  const all_childs_extra = Object.keys(rules["extra"]).map(row => {
    // const val = rules['extra']
    const row_obj = rules["extra"][row];
    console.log("row_odbj", family_details);
    const depends_on_val_obj = {};
    // row_obj['depends_on'].for_each
    row_obj["depends_on"].forEach(function (currentValue, index, array) {
      // Your code here
      depends_on_val_obj[currentValue] = family_details[currentValue];
    });

    // row_obj['depends_on'].map((i)=>family_details[i])
    // const depends_on_val_obj = row_obj['depends_on'].map((i)=>family_details[i])
    console.log("hererwer", depends_on_val_obj);
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        padding: "10px 0"
      }
    }, row_obj["iconName"] && /*#__PURE__*/_react.default.createElement(_PreviewProfile.SelectedIcon, {
      iconName: row_obj["iconName"],
      style_obj: {
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
    }, row_obj["label"] ? row_obj["label"] : row), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "subtitle2"
    }, row_obj["transform"](row_obj["exp"], depends_on_val_obj))));
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
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
  }, /*#__PURE__*/_react.default.createElement("div", null, "Family Info")), /*#__PURE__*/_react.default.createElement("div", {
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
  }))), all_childs_extra, all_childs));
}