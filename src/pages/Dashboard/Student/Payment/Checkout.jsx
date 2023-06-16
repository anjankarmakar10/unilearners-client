import {
  useElements,
  useStripe,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import "./payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useAuth } from "../../../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const axios = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      axios.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res?.data?.clientSecret);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email,
            name: user.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        ...cart,
        transactionId: paymentIntent.id,
      };

      axios.post("/payments", payment).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Purchase Successful",
            text: "",
          });
          navigate("/dashboard/selectedclasses", { replace: true });
        }
      });
    }
  };

  return (
    <article className="w-full max-w-lg">
      {cardError && (
        <div className="alert alert-error ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="mr-auto">{cardError}</span>
        </div>
      )}

      {transactionId && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="mr-auto">
            Transaction comfirm transaction id {transactionId}
          </span>
        </div>
      )}
      <form className="w-full payment" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#2e314d",
                "::placeholder": {
                  color: "#48535f",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-center ">
          <button
            className="btn  max-w-lg w-full bg-blue-500 disabled:bg-slate-800"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
    </article>
  );
};

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISH_KEY}`);

const Checkout = ({ cart }) => {
  const price = cart?.class?.price;
  const data = cart?.class;

  const item = {
    name: data?.name,
    image: data?.image,
    classId: data?.classId,
    cartId: data?._id,
    price: data?.price,
    email: data?.email,
    seats: data?.seats,
    enrolled: data?.enrolled,
    date: new Date(),
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cart={item} price={price} />
    </Elements>
  );
};

export default Checkout;
