import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/components/store-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sufiaw-store.vercel.app"),
  title: {
    default: "Sufiaw Store — Computadores y tecnología",
    template: "%s — Sufiaw Store",
  },
  description:
    "Computadores, accesorios, licencias, juegos digitales, impresión láser y soporte tecnológico en Chile.",
  openGraph: {
    title: "Sufiaw Store",
    description: "Tecnología preparada para rendir.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StoreProvider>{children}</StoreProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
