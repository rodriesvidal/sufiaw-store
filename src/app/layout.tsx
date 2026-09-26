import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/components/store-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sufiaw-store.vercel.app"),
  title: {
    default: "Sufiaw Store — Streetwear & accesorios",
    template: "%s — Sufiaw Store",
  },
  description:
    "Streetwear y accesorios seleccionados en Chile. Descubre las próximas piezas de Sufiaw Store.",
  openGraph: {
    title: "Sufiaw Store",
    description: "Piezas que hablan antes que tú.",
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
