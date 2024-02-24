import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    // Fetch the client secret from your server
    fetch("http://192.168.1.2:8000/create-payment-intent", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedPaymentMethod) {
      return;
    }

    // Create a PaymentMethod based on the selected payment method
    const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
      type: selectedPaymentMethod,
      card: elements.getElement(CardElement), // If 'card' is selected
      // Add other payment method-specific data as needed
    });

    if (pmError) {
      console.error("Error creating PaymentMethod:", pmError);
      return;
    }

    // Attach the PaymentMethod to the Payment Intent
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
        setup_future_usage: "off_session", // Optional: If you want to save the payment method for future payments
      }
    );

    if (error) {
      console.error("Payment failed:", error);
    } else {
      console.log("Payment succeeded:", paymentIntent);
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <div>
        <label>
          Choose Payment Method:
          <select onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
            <option value="">Select Payment Method</option>
            <option value="card">Credit Card</option>
            <option value="netbanking">Net Banking</option>
            {/* Add more payment method options here */}
          </select>
        </label>
      </div>
      {selectedPaymentMethod === "card" && (
        <div>
          <label>
            Card details:
            <CardElement />
          </label>
        </div>
      )}
      {/* Add sections for other payment methods as needed */}
      <button type="submit" disabled={!stripe || !selectedPaymentMethod}>
        Proceed To Pay
      </button>
    </form>
  );
}

export default PaymentForm;
