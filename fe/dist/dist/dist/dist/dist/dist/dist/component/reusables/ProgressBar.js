"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _LinearProgress = _interopRequireDefault(require("@mui/material/LinearProgress"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
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
const ProgressBar = _ref => {
  let {
    totalWorkDone
  } = _ref;
  const [progress, setProgress] = (0, _react.useState)(0);
  const intervalDuration = 1000; // interval duration in milliseconds
  const totalWorkSum = totalWorkDone.reduce((sum, taskProgress) => sum + taskProgress, 0);
  const targetProgress = totalWorkSum / totalWorkDone.length * 100;
  (0, _react.useEffect)(() => {
    let taskIndex = 0;

    // Function to update progress at fixed intervals
    const updateProgress = () => {
      setProgress(prevProgress => {
        const taskProgress = totalWorkDone[taskIndex] * 100; // convert task progress to percentage
        const newProgress = prevProgress + taskProgress / totalWorkSum;
        if (newProgress >= targetProgress || taskIndex === totalWorkDone.length - 1) {
          clearInterval(intervalId);
          return targetProgress;
        }
        taskIndex++;
        return newProgress;
      });
    };

    // Initial update
    updateProgress();

    // Set interval to update progress
    const intervalId = setInterval(updateProgress, intervalDuration);

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [totalWorkDone, totalWorkSum, targetProgress]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    justifyContent: "space-between",
    style: {
      color: "blue",
      opacity: 0.7
    }
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle2"
  }, "Your Profile Score:")), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle2"
  }, progress.toFixed(2), "%"))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "7px"
    }
  }, /*#__PURE__*/_react.default.createElement(_LinearProgress.default, {
    variant: "determinate",
    value: progress,
    color: "primary",
    sx: {
      height: 10,
      borderRadius: 10,
      backgroundColor: "grey"
    }
  })));
};
var _default = exports.default = ProgressBar;