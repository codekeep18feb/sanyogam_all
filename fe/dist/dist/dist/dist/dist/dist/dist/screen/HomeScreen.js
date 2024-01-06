"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _Tile = _interopRequireDefault(require("./Tile"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _MeDetailScreen = _interopRequireDefault(require("./MeDetailScreen"));
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
// import Typography from '@mui/material/Typography';

// import MatchesProfileBox from './MatchesProfileBox';
// import RecomUsers from './RecomUsers';
// import RecentVisited from './RecentVisited';

function HomeScreen(_ref) {
  let {
    authData
  } = _ref;
  const [editMode, SeteditMode] = (0, _react.useState)(false);
  console.log("", authData);
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true
    // direction="row-reverse"
    ,

    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    md: 6
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundColor: "red",
      padding: "10px"
    }
  }, authData ? /*#__PURE__*/_react.default.createElement(_Tile.default, null, /*#__PURE__*/_react.default.createElement(_MeDetailScreen.default, {
    authData: authData,
    editMode: editMode,
    SeteditMode: SeteditMode
  })) : /*#__PURE__*/_react.default.createElement("p", null, "Please log in to see your data."))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 4
  }));
}
const mapStateToProps = state => {
  console.log("authdatawhat", state.auth.data);
  return {
    authData: state.auth.data
  };
};

// Use React.memo to memoize the HomeScreen component
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, null)( /*#__PURE__*/_react.default.memo(HomeScreen));