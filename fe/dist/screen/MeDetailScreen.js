"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MeDetailScreen;
var _react = _interopRequireWildcard(require("react"));
var _Vector = _interopRequireDefault(require("../images/Vector.jpg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// Adjust the path based on your project structure

function MeDetailScreen(_ref) {
  let {
    authData,
    editMode,
    SeteditMode
  } = _ref;
  // Define state variable for edited data
  const [editedData, setEditedData] = (0, _react.useState)({
    fname: authData.fname,
    lname: authData.lname,
    image: authData.image // Include image in the state
  });

  // Function to handle saving data and making the POST request
  const handleSave = async e => {
    e.preventDefault();
    try {
      // Create a FormData object to send the data
      const formData = new FormData();
      formData.append("fname", editedData.fname);
      formData.append("lname", editedData.lname);
      formData.append("image", editedData.image); // Add image to the FormData

      // Make the POST request
      // const response = await fetch('http://192.168.1.10:8000/api/update_profile/1', {
      //   method: 'POST',
      //   body: formData,
      // });

      // Rest of your code for handling the response and exiting edit mode...
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Define your form JSX here
  const form = /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "First Name",
    value: editedData.fname,
    onChange: e => setEditedData({
      ...editedData,
      fname: e.target.value
    })
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Last Name",
    value: editedData.lname,
    onChange: e => setEditedData({
      ...editedData,
      lname: e.target.value
    })
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: e => setEditedData({
      ...editedData,
      image: e.target.files[0]
    })
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => handleSave(e)
  }, "Save"));

  // Define your div JSX here
  const div = /*#__PURE__*/_react.default.createElement("div", {
    style: {
      border: "1px solid grey",
      borderRadius: "50%",
      padding: "20px",
      background: "white"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _Vector.default,
    alt: "Logo"
  }));

  // Render either the form or the div based on the editMode state
  return editMode ? form : div;
}