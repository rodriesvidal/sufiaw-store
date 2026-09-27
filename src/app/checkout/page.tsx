import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout-page";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Revisa tu compra y elige Webpay o Mercado Pago en Sufiaw Store.",
  robots: { index: false, follow: false },
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
