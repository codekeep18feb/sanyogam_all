"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactStripeJs = require("@stripe/react-stripe-js");
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
const PaymentIntentScreen = () => {
  const stripe = (0, _reactStripeJs.useStripe)();
  const elements = (0, _reactStripeJs.useElements)();
  const [clientSecret, setClientSecret] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    // Fetch the client secret from your server
    fetch('/create-payment-intent', {
      method: 'POST'
    }).then(response => response.json()).then(data => {
      setClientSecret(data.clientSecret);
    });
  }, []);
  const handlePaymentSubmit = async () => {
    // Use stripe.confirmCardPayment to process the payment
    const {
      paymentIntent,
      error
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(_reactStripeJs.CardElement) // Use CardElement from your form
      }
    });
    if (error) {
      console.error('Payment failed:', error);
    } else {
      console.log('Payment succeeded:', paymentIntent);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handlePaymentSubmit
  }, /*#__PURE__*/_react.default.createElement("label", null, "Card details", /*#__PURE__*/_react.default.createElement(_reactStripeJs.CardElement, null)), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit"
  }, "Pay")));
};
var _default = exports.default = PaymentIntentScreen;