"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactStripeJs = require("@stripe/react-stripe-js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function PaymentForm() {
  const stripe = (0, _reactStripeJs.useStripe)();
  const elements = (0, _reactStripeJs.useElements)();
  const [clientSecret, setClientSecret] = (0, _react.useState)("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    // Fetch the client secret from your server
    fetch("http://192.168.1.10:8000/create-payment-intent", {
      method: "POST"
    }).then(response => response.json()).then(data => {
      setClientSecret(data.clientSecret);
    });
  }, []);
  const handlePaymentSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements || !selectedPaymentMethod) {
      return;
    }

    // Create a PaymentMethod based on the selected payment method
    const {
      paymentMethod,
      error: pmError
    } = await stripe.createPaymentMethod({
      type: selectedPaymentMethod,
      card: elements.getElement(_reactStripeJs.CardElement) // If 'card' is selected
      // Add other payment method-specific data as needed
    });
    if (pmError) {
      console.error("Error creating PaymentMethod:", pmError);
      return;
    }

    // Attach the PaymentMethod to the Payment Intent
    const {
      paymentIntent,
      error
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      setup_future_usage: "off_session" // Optional: If you want to save the payment method for future payments
    });
    if (error) {
      console.error("Payment failed:", error);
    } else {
      console.log("Payment succeeded:", paymentIntent);
    }
  };
  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handlePaymentSubmit
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Choose Payment Method:", /*#__PURE__*/_react.default.createElement("select", {
    onChange: e => setSelectedPaymentMethod(e.target.value)
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select Payment Method"), /*#__PURE__*/_react.default.createElement("option", {
    value: "card"
  }, "Credit Card"), /*#__PURE__*/_react.default.createElement("option", {
    value: "netbanking"
  }, "Net Banking")))), selectedPaymentMethod === "card" && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Card details:", /*#__PURE__*/_react.default.createElement(_reactStripeJs.CardElement, null))), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    disabled: !stripe || !selectedPaymentMethod
  }, "Proceed To Pay"));
}
var _default = exports.default = PaymentForm;