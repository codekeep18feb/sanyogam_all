"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedIcon = exports.FamilyPreview = void 0;
exports.default = PreviewProfile;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _LocationOnOutlined = _interopRequireDefault(require("@mui/icons-material/LocationOnOutlined"));
var _LiveHelp = _interopRequireDefault(require("@mui/icons-material/LiveHelp"));
var _Class = _interopRequireDefault(require("@mui/icons-material/Class"));
var _reactRouterDom = require("react-router-dom");
var _PeopleAltOutlined = _interopRequireDefault(require("@mui/icons-material/PeopleAltOutlined"));
var _PhotoCamera = _interopRequireDefault(require("@mui/icons-material/PhotoCamera"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _Icon = _interopRequireDefault(require("@mui/material/Icon"));
var _ParentForWrapperOVG = _interopRequireDefault(require("./reusables/ParentForWrapperOVG"));
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
const SelectedIcon = _ref => {
  let {
    iconName = "missing",
    style_obj
  } = _ref;
  const iconComponents = {
    location: _LocationOnOutlined.default,
    missing: _LiveHelp.default,
    people: _PeopleAltOutlined.default,
    camera: _PhotoCamera.default,
    affluence: _Class.default
    // Add more mappings as needed
  };
  if (Object.keys(iconComponents).includes(iconName)) {
    const SelectedIcon = iconComponents[iconName];
    return /*#__PURE__*/_react.default.createElement(SelectedIcon, {
      style: style_obj
    });
  } else {
    const SelectedIcon = iconComponents["missing"];
    return /*#__PURE__*/_react.default.createElement(SelectedIcon, {
      style: style_obj
    });
  }
};
exports.SelectedIcon = SelectedIcon;
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
  return /*#__PURE__*/_react.default.createElement(_ParentForWrapperOVG.default, {
    family_details: family_details
  });
};
exports.FamilyPreview = FamilyPreview;
function PreviewProfile() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [data, setData] = (0, _react.useState)(null);
  const fetchProfileData = async () => {
    // console.log("am I being called", isInitiator, sdp);
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    try {
      const response = await fetch("http://192.168.1.10:8000/api/my_profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("successfully got the data, data", data);
        return data;
      } else {
        console.log("Error fetching profile data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(async () => {
    const data = await fetchProfileData();
    console.log("datadfdf", data);
    delete data["family_info"]["profile"];
    delete data["family_info"]["id"];
    setData(data);
  }, []);
  const profile_info_obj = data && data["family_info"] ? data["family_info"] : null;
  const a = "variable";
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "10px",
      padding: "15px 0",
      boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.3)"
    }
  }, profile_info_obj === null || loading ? /*#__PURE__*/_react.default.createElement("div", null, "loader...") : /*#__PURE__*/_react.default.createElement(FamilyPreview, {
    family_details: profile_info_obj,
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