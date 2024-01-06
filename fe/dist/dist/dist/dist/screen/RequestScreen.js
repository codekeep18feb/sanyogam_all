"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RequestScreen;
var _react = _interopRequireWildcard(require("react"));
var _DoneAllOutlined = _interopRequireDefault(require("@mui/icons-material/DoneAllOutlined"));
var _Cancel = _interopRequireDefault(require("@mui/icons-material/Cancel"));
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
function RequestScreen(_ref) {
  let {
    with_email
  } = _ref;
  const [loading, setLoading] = (0, _react.useState)(true);
  const [data, setData] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    let isMounted = true; // Variable to track whether the component is mounted

    const fetchData = async () => {
      const JWT_TOKEN = localStorage.getItem("token");
      const token = "Bearer ".concat(JWT_TOKEN);
      try {
        const response = await fetch("http://192.168.1.10:8000/api/request_info/".concat(with_email), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        });
        if (isMounted) {
          if (response.status === 200) {
            const responseData = await response.json();
            setData(responseData);
          } else {
            console.log("Error occurred while fetching data.");
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData(); // Call the fetchData function

    // Cleanup function to cancel the asynchronous task when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [with_email]);
  if (loading) {
    return /*#__PURE__*/_react.default.createElement("p", null, "Loadin...");
  }
  return /*#__PURE__*/_react.default.createElement("div", null, data ? /*#__PURE__*/
  // <div>Request Status - {data["status"]}</div>
  _react.default.createElement("div", {
    style: {
      marginTop: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, "user online | offline"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      border: "1px solid grey",
      padding: "10px 5px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "50%",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_DoneAllOutlined.default, {
    style: {
      fontSize: "35px",
      color: "#1F4294"
    }
  }), /*#__PURE__*/_react.default.createElement("div", null, "Accept")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "50%",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Cancel.default, {
    style: {
      fontSize: "35px",
      color: "#666666"
    }
  }), /*#__PURE__*/_react.default.createElement("div", null, "Decline")))) : /*#__PURE__*/_react.default.createElement("div", null, "Loaing..."));
}