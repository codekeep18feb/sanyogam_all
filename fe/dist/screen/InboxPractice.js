"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InboxPractice;
var _react = _interopRequireWildcard(require("react"));
var _styles = require("@material-ui/core/styles");
var _reactSpring = require("react-spring");
var _reactUseGesture = require("react-use-gesture");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const useStyles = (0, _styles.makeStyles)({
  scrollContainer: {
    overflow: 'hidden',
    width: '100%',
    touchAction: 'pan-y'
  },
  innerContainer: {
    display: 'flex',
    whiteSpace: 'nowrap'
  },
  scrollItem: {
    flexShrink: 0,
    width: '300px',
    marginRight: '10px',
    border: '1px solid #ccc',
    padding: '10px'
  }
});
function InboxPractice() {
  const classes = useStyles();
  const innerContainerRef = (0, _react.useRef)(null);
  const [index, setIndex] = _react.default.useState(0);
  (0, _react.useEffect)(() => {
    const innerContainer = innerContainerRef.current;
    if (innerContainer) {
      const numberOfItems = innerContainer.children.length;
      const maxIndex = Math.max(0, numberOfItems - 1);
      // Update the index to stay within the bounds
      setIndex(prevIndex => Math.min(Math.max(prevIndex, 0), maxIndex));
    }
  }, [index]);
  const bind = (0, _reactUseGesture.useGesture)({
    onDrag: _ref => {
      let {
        offset: [x],
        event: e
      } = _ref;
      e.preventDefault();
      const sensitivity = 0.5;
      const newIndex = Math.round(-x / sensitivity / 310);
      setIndex(newIndex);
    }
  });
  const props = (0, _reactSpring.useSpring)({
    transform: "translate3d(".concat(-index * 310, "px, 0, 0)")
  });
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: classes.scrollContainer
  }, bind()), /*#__PURE__*/_react.default.createElement(_reactSpring.animated.div, {
    className: classes.innerContainer,
    style: props,
    ref: innerContainerRef
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "Content 1"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollItem
  }, "Content 2")));
}