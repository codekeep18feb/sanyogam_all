"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageCircle = ImageCircle;
exports.default = ImageCircles;
var _react = _interopRequireWildcard(require("react"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _core = require("@material-ui/core");
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
const circleStyle = {
  width: '80px',
  height: '80px',
  backgroundColor: 'red',
  color: '#fff',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '5px',
  position: 'relative'
};
const greenDotStyle = {
  width: '16px',
  height: '16px',
  backgroundColor: 'green',
  borderRadius: '50%',
  position: 'absolute',
  bottom: 0,
  right: 0
};
function ImageCircle(_ref) {
  let {
    user,
    dimention
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "10px 10px 0 10px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "relative"
    }
  }, user.online && /*#__PURE__*/_react.default.createElement("div", {
    style: user.online ? {
      ...greenDotStyle,
      backgroundColor: "#00E676"
    } : {
      ...greenDotStyle,
      backgroundColor: "black"
    }
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: user.imageUrl,
    alt: "Circle Image",
    width: dimention || 90,
    height: dimention || 90,
    style: {
      borderRadius: "50%"
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingLeft: "10px"
    }
  }, user && user.name && /*#__PURE__*/_react.default.createElement(_core.Typography, {
    noWrap: true,
    variant: "subtitle2"
  }, user.name)));
}
function ImageCircles(_ref2) {
  let {
    users
  } = _ref2;
  const containerRef = (0, _react.useRef)(null);
  const handleMouseDown = e => {
    const startX = e.pageX;
    let scrollLeft = containerRef.current.scrollLeft;
    const handleMouseMove = e => {
      const x = e.pageX - startX;
      containerRef.current.scrollLeft = scrollLeft - x;
    };
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      // Add width and height to the parent container
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "child" // Apply styles to the child element
    ,

    style: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
      // Use overflowY for vertical scrolling
      paddingRight: '17px',
      boxSizing: 'content-box',
      overflowX: 'hidden' // Hide horizontal scrollbar
    },
    ref: containerRef,
    onMouseDown: handleMouseDown
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      whiteSpace: 'nowrap',
      display: 'flex',
      scrollSnapType: 'x mandatory'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 2
  }, users.map(user => /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    key: user.id
  }, /*#__PURE__*/_react.default.createElement(ImageCircle, {
    user: user
  }))))))));
}