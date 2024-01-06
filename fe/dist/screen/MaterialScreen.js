"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@mui/material/styles");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Card = _interopRequireDefault(require("@mui/material/Card"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _Container = _interopRequireDefault(require("@mui/material/Container"));
var _material = require("@mui/material");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Define a custom theme
const theme = (0, _styles.createTheme)({
  palette: {
    primary: {
      main: '#1976D2'
    },
    secondary: {
      main: '#F50057'
    },
    error: {
      main: '#FF0000'
    }
  },
  shadows: ['none',
  // 0: No shadow
  '0px 2px 4px rgba(0, 0, 0, 0.2)',
  // 1: Custom shadow for cards
  '0px 4px 8px rgba(0, 0, 0, 0.4)' // Example custom shadow
  ],
  transitions: {
    easing: {
      hover: 'ease-in-out',
      customEasing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' // Example custom easing
    },
    duration: {
      short: 300,
      customDuration: 500 // Example custom duration
    }
  },
  typography: {
    smallParagraph: {
      fontSize: '0.8rem',
      lineHeight: 1.4
    },
    mediumParagraph: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    largeParagraph: {
      fontSize: '1.2rem',
      lineHeight: 1.6
    },
    caption: {
      fontSize: '0.7rem',
      lineHeight: 1.2
    },
    label: {
      fontSize: '0.9rem',
      lineHeight: 1.3
    },
    blockquote: theme => ({
      fontSize: '1.2rem',
      lineHeight: 1.6,
      fontStyle: 'italic',
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      borderStyle: 'solid',
      padding: '10px'
    }),
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2rem'
    },
    h2: {
      fontSize: '1.5rem'
    },
    primaryText: {
      color: '#333'
    },
    secondaryText: {
      color: '#666'
    },
    errorText: {
      color: '#FF0000'
    },
    button: {
      textTransform: 'none'
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 16
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});
function MaterialScreen() {
  return (
    /*#__PURE__*/
    // <ThemeProvider theme={theme}>
    _react.default.createElement(_Container.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h1"
    }, "h1Hey HEADER"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h2"
    }, "h2Hey HEADER"), /*#__PURE__*/_react.default.createElement("h1", {
      style: {
        fontFamily: theme.typography.fontFamily
      }
    }, "Responsive Typography"), /*#__PURE__*/_react.default.createElement(_Button.default, {
      variant: "contained",
      color: "primary"
    }, "Primary Button"), /*#__PURE__*/_react.default.createElement(_Button.default, {
      variant: "contained",
      color: "secondary"
    }, "Secondary Button"), /*#__PURE__*/_react.default.createElement(_Card.default, {
      elevation: 1,
      sx: {
        boxShadow: theme.shadows[1]
      }
    }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body1"
    }, "Responsive Card")), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "smallParagraph"
    }, "This is a small paragraph."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "mediumParagraph"
    }, "This is a medium paragraph."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "largeParagraph"
    }, "This is a large paragraph."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      sx: {
        color: theme.typography.primaryText.color
      }
    }, "This is primary text without body1"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body1",
      sx: {
        color: theme.typography.primaryText.color
      }
    }, "This is primary text with body1 variant."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body1",
      sx: {
        color: theme.typography.secondaryText.color
      }
    }, "This is secondary text."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body1",
      sx: {
        color: theme.typography.errorText.color
      }
    }, "This is error text."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: theme => theme.typography.blockquote
    }, "This is a blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit."), /*#__PURE__*/_react.default.createElement(_material.Grid, {
      container: true,
      spacing: 2,
      direction: "row"
    }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      style: {
        borderRadius: theme.shape.borderRadius
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, "50%")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      style: {
        borderRadius: theme.shape.borderRadius
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, "50%")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      style: {
        borderRadius: theme.shape.borderRadius
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, "50%")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      style: {
        borderRadius: theme.shape.borderRadius
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, "50%")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4
    })), "// Shadows: Applying custom shadow to a Paper component", "// Transitions: Using a custom easing function and duration", /*#__PURE__*/_react.default.createElement(_Button.default, {
      variant: "contained",
      color: "primary",
      sx: {
        transition: "background-color ".concat(theme.transitions.duration.customDuration, "ms ").concat(theme.transitions.easing.customEasing),
        '&:hover': {
          backgroundColor: '#FFC107' // Change to your desired hover color
        }
      }
    }, "Custom Transition"), "// Typography Variants: Applying 'caption' and 'label' variants", /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "caption",
      sx: {
        marginBottom: '8px'
      }
    }, "Caption Text"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "label",
      sx: {
        marginBottom: '8px'
      }
    }, "Label Text"), "// Z-Index: Using zIndex for positioning components", /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: 'absolute',
        backgroundColor: '#2196F3',
        // Change to your desired background color
        color: 'white',
        zIndex: theme.zIndex.drawer + 1,
        padding: '16px'
      }
    }, "Z-Index Example"), "// Additional Theme Properties: Using spacing, shape, and breakpoints", /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body1"
    }, "Spacing: ", theme.spacing), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        borderRadius: theme.shape.borderRadius,
        width: '100px',
        height: '100px',
        backgroundColor: theme.palette.primary.main,
        marginTop: '16px'
      }
    }, "Shape: ", theme.shape.borderRadius), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "body1"
    }, "Breakpoints:"), /*#__PURE__*/_react.default.createElement("div", null, Object.keys(theme.breakpoints.values).map(breakpoint => /*#__PURE__*/_react.default.createElement("div", {
      key: breakpoint
    }, breakpoint, ": ", theme.breakpoints.values[breakpoint], "px")))))
    // </ThemeProvider>
  );
}
var _default = exports.default = MaterialScreen;