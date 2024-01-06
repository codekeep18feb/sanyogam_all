"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Tabs = _interopRequireDefault(require("@mui/material/Tabs"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _UserChatTileInListC = _interopRequireDefault(require("./UserChatTileInListC"));
var _MatchesFilterScrollBarOnChatC = _interopRequireDefault(require("./MatchesFilterScrollBarOnChatC"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function TabPanel(_ref) {
  let {
    profiles,
    SetWithUserId,
    SetWithEmail,
    with_userid
  } = _ref;
  const [value, setValue] = _react.default.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Tabs.default, {
    value: value,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Recent",
    sx: {
      width: "50%"
    }
  }), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Active",
    sx: {
      width: "50%"
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_MatchesFilterScrollBarOnChatC.default, null)), value === 0 && /*#__PURE__*/_react.default.createElement(_UserChatTileInListC.default, {
    profiles: profiles,
    SetWithUserId: SetWithUserId,
    SetWithEmail: SetWithEmail,
    with_userid: with_userid
  }), value === 1 && /*#__PURE__*/_react.default.createElement(_UserChatTileInListC.default, {
    profiles: profiles,
    SetWithUserId: SetWithUserId,
    SetWithEmail: SetWithEmail,
    with_userid: with_userid
  }));
}
var _default = exports.default = TabPanel;