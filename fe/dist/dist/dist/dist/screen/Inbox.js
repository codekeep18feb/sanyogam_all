"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Inbox;
var _react = _interopRequireWildcard(require("react"));
var _HomeProfileBox = _interopRequireDefault(require("./HomeProfileBox"));
var _InboxProfileBox = _interopRequireDefault(require("./InboxProfileBox"));
var _InboxFilterScrollBarC = _interopRequireDefault(require("./InboxFilterScrollBarC"));
var _reactRouterDom = require("react-router-dom");
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
function Inbox() {
  const [data, setdata] = (0, _react.useState)(null);
  const nagivate = (0, _reactRouterDom.useNavigate)();
  const fetchRequests = async () => {
    // console.log('onsave ran here we can see the ',{family_info:formValues})
    // const data = await submitProfileUpdateData({family_info:formValues})
    const JWT_TOKEN = localStorage.getItem("token");
    const token = "Bearer ".concat(JWT_TOKEN);
    const response = await fetch("http://192.168.1.10:8000/api/handle_request", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    if (response.status === 200) {
      const data = await response.json();
      // nagivate(-1);

      console.log("successfully fetched all requests", data);
      return data;
      // //   const arrayOfObjects = [
      // //     { "key1": "value1a", "key2": "value2a" },
      // //     { "key1": "value1b", "key2": "value2b" },
      // //     // Add more objects as needed
      // // ];

      // // Specify the keys to merge
      // const key1ToMerge = "user_fname";
      // const key2ToMerge = "user_lname";

      // // Use map to create a new array with merged keys
      // const newArray = data.map(obj => ({
      //     ...obj,
      //     fullname: `${obj[key1ToMerge]} ${obj[key2ToMerge]}`,
      //     // Optionally, you can exclude the original keys if needed
      //     [key1ToMerge]: undefined,
      //     [key2ToMerge]: undefined,
      // }));

      // // Display the modified array of objects
      // console.log(newArray);
      // setdata(newArray)
    } else {
      console.log("Error updating profile");
    }
  };
  (0, _react.useEffect)(async () => {
    const api_data = await fetchRequests();
    console.log("api_datdsafa", api_data);
    setdata(api_data);
  }, []);
  let data_map;
  if (data) {
    data_map = data.map(i => {
      console.log("herewhatcanweextract", i);
      return /*#__PURE__*/(
        // <HomeProfileBox
        // imageUrl='https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2'
        // fullname={i.fullname}
        // current_location={i.family_info.family_location}
        // />
        _react.default.createElement(_InboxProfileBox.default, {
          imageUrl: "https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2",
          fullname: "hardcodedname",
          current_location: "hardecoded",
          email: i.frm_user
        })
      );
    });
  }
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_InboxFilterScrollBarC.default, null)), data && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row"
    }
  }, data_map));
}
function handleSearch() {
  // Handle search logic here
}