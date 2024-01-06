"use strict";

require("core-js");
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
require("./index.css");
var _App = _interopRequireDefault(require("./App"));
var _reportWebVitals = _interopRequireDefault(require("./reportWebVitals"));
var _reactRedux = require("react-redux");
var _styles = require("@mui/material/styles");
var _store = _interopRequireDefault(require("./redux/store"));
var _stripeJs = require("@stripe/stripe-js");
var _reactStripeJs = require("@stripe/react-stripe-js");
var _PaymentForm = _interopRequireDefault(require("./screen/PaymentForm"));
var _WrapperMobileShell = _interopRequireDefault(require("./screen/WrapperMobileShell"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import PaymentIntentScreen from '.screen/PaymentIntentScreen'; // Import your PaymentIntentScreen component

const stripePromise = (0, _stripeJs.loadStripe)('pk_test_QlDA5SL28jaVLd22eF39ymGA00VLnj8ebN');
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
      fontSize: '1.8rem'
    },
    h3: {
      fontSize: '1.6rem'
    },
    h4: {
      fontSize: '1.4rem'
    },
    h5: {
      fontSize: '1.2rem'
    },
    h6: {
      fontSize: '1rem'
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

// import { PersistGate } from "redux-persist/integration/react";

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: _store.default
}, /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_reactStripeJs.Elements, {
  stripe: stripePromise
}, /*#__PURE__*/_react.default.createElement(_styles.ThemeProvider, {
  theme: theme
}, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_App.default, null)))))), document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function

// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, _reportWebVitals.default)();