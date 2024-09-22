"use client";
import React, { useState } from "react";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useOrders from "@/hooks/useOrders";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import Link from "next/link";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const Checkout = () => {
  const [clientSecret, setClientSecret] = React.useState("");
  const { sum, loading } = useOrders({});
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: sum }),
        });
        const { clientSecret: cs } = await response.json();
        setClientSecret(cs);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const appearance: Appearance = {
    theme: "night",
  };
  return (
    <div className="h-screen min-w-[200px] w-10/12 md:w-1/3 mx-auto shadow-md shadow-primary-foreground p-6 overflow-auto ">
      {isLoading || loading ? (
        <div className="w-full h-full flex items-center justify-center gap-3">
          <span className="text-xl">Please wait a moment </span>
          <Loader size={30} className="animate-spin" />
        </div>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="w-full h-full flex items-center justify-center gap-3">
          <p className="font-thin text-base text-error">
            Something went wrong. Please try again later.{" "}
            <Loader className="animate-spin duration-[5000] ease-out" /> <br />
            <Link href={"/"} className="font-semibold underline italic">
              Go to Home
            </Link>
          </p>
        </div>
      )}
      {/* {clientSecret && !loading && (
        
      )} */}
    </div>
  );
};

export default Checkout;
