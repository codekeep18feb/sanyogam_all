"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _Container = _interopRequireDefault(require("@material-ui/core/Container"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _reselect = require("reselect");
var _counterScreenDesign = _interopRequireDefault(require("./counter-screen-design"));
var _reactStripeJs = require("@stripe/react-stripe-js");
var _stripeJs = require("@stripe/stripe-js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
// import { setCurrentCounter } from "../redux/counter/counter-action";

// import CounterComponent from "../component/counter-component";

// import { selectCurrentCounter } from "../redux/counter/counter-selector";

// Import Elements

// Initialize Stripe outside the component
const stripePromise = (0, _stripeJs.loadStripe)('pk_test_QlDA5SL28jaVLd22eF39ymGA00VLnj8ebN');
const PaymentScreen = props => {
  const stripe = (0, _reactStripeJs.useStripe)();
  const elements = (0, _reactStripeJs.useElements)();
  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(_reactStripeJs.CardElement);
    const {
      token,
      error
    } = await stripe.createToken(cardElement);
    if (error) {
      // Handle error
      console.log('error');
    } else {
      // Send the token to your server
      // You can use Axios or another library to make a POST request to your Flask server.
      console.log('token', token);
    }
  };
  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactStripeJs.CardElement, null), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit"
  }, "Pay"));
};

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentCounter: (counter) => dispatch(setCurrentCounter(counter)),
// });

// const mapStateToProps = createStructuredSelector({
//   currentCounter: selectCurrentCounter,
// });

// Wrap your component with the Elements provider
const WrappedPaymentScreen = () => /*#__PURE__*/_react.default.createElement(_reactStripeJs.Elements, {
  stripe: stripePromise
}, /*#__PURE__*/_react.default.createElement(PaymentScreen, null));
var _default = exports.default = (0, _reactRedux.connect)(null, null)(WrappedPaymentScreen);