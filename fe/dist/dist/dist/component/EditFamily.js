"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _WrapperMobileBackShellWithSave = _interopRequireDefault(require("../screen/WrapperMobileBackShellWithSave"));
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
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const NumberField = _ref => {
  let {
    id,
    label,
    defaultValue = 0,
    onChange,
    state_name
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
    ,

    onChange: e => onChange(e, state_name, "number_input")
    // fullWidth={true}
  });
};
const AutocompleteField = _ref2 => {
  let {
    options,
    id,
    label,
    defaultValue,
    onChange,
    state_name
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
    options: options.map(option => option.title),
    id: id,
    value: defaultValue // Set the default value
    ,

    onChange: (e, new_value) => onChange(e, state_name, "dropdown", new_value),
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      label: label,
      variant: "standard"
    }))
  });
};
const submitProfileUpdateData = async payload => {
  console.log("am I being payload", payload);
  const JWT_TOKEN = localStorage.getItem("token");
  const token = "Bearer ".concat(JWT_TOKEN);
  try {
    const response = await fetch("http://192.168.1.10:8000/api/update_my_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        gender: "FeMale",
        family_info1: {
          no_of_sisters: 10000
        }
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log("successfully updated profile", data);
    } else {
      console.log("Error updating profile");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("we can toggle loading if want");
    // setLoading(false);
  }
};
const EditFamilyForm = () => {
  const nagivate = (0, _reactRouterDom.useNavigate)();
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
  const opt_obj = {
    family_location: locations,
    native_place: locations,
    affluence: affluenceOptions
  };
  // Use the useLocation hook to access the current location object
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const family_details = state && state.family_details;
  const rules = state && state.rules;
  const [formValues, setFormValues] = (0, _react.useState)({});

  // Update form values when family_details changes
  // useEffect(() => {
  //   if (family_details) {
  //     // Set the form values based on family_details
  //     console.log('HEREISTHESTATE',state)
  //     setFormValues(family_details);
  //   }
  // }, [family_details]);

  console.log(rules, "family_deadtailsdafd", state);
  const handleOnChange = function (e, state_name, type) {
    let new_value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    e.preventDefault();
    console.log("thisstate_name changed", type);
    setFormValues(prv => {
      const obj = JSON.parse(JSON.stringify(prv));
      if (type === "dropdown") {
        obj[state_name] = new_value;
      } else {
        obj[state_name] = e.target.value;
      }
      console.log("hereisprv", prv, state_name, e.target.value);
      return obj;
    });
  };
  const all_childs = Object.keys(family_details).map(row => {
    if (rules[row]["edit_type"] === "num_input") {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(NumberField, {
        state_name: row,
        onChange: handleOnChange,
        id: rules[row]["label"] || row,
        label: rules[row]["label"] || row,
        defaultValue: family_details[row]
      }));
    }
    if (rules[row]["edit_type"] === "dropdown") {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(AutocompleteField, {
        onChange: handleOnChange,
        options: opt_obj[row],
        id: row,
        label: row,
        state_name: row,
        defaultValue: family_details[row]
      }));
    }
  });
  const onSave = async () => {
    console.log("onsave ran here we can see the ", {
      family_info: formValues
    });
    // const data = await submitProfileUpdateData({family_info:formValues})
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    const response = await fetch("http://192.168.1.10:8000/api/update_my_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        family_info: formValues
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      nagivate(-1);
      console.log("successfully update profiled", data);
    } else {
      console.log("Error updating profile");
    }
  };
  return /*#__PURE__*/_react.default.createElement(_WrapperMobileBackShellWithSave.default, {
    title: "Family Details",
    onSave: onSave
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    flexDirection: "column"
  }, all_childs)));
};
var _default = exports.default = EditFamilyForm;