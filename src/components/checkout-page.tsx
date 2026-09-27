"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Banknote,
  Check,
  CreditCard,
  ExternalLink,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { useStore } from "@/components/store-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { contactLinks, formatCLP } from "@/lib/products";

type PaymentProvider = "webpay" | "mercado-pago";

const paymentMethods = [
  {
    id: "webpay" as const,
    name: "Webpay Plus",
    detail: "Tarjetas de débito, crédito y prepago mediante Transbank.",
    Icon: CreditCard,
  },
  {
    id: "mercado-pago" as const,
    name: "Mercado Pago",
    detail: "Checkout Pro o enlace de pago asociado al producto.",
    Icon: Banknote,
  },
];

export function CheckoutPage() {
  const { cart, products } = useStore();
  const [provider, setProvider] = useState<PaymentProvider>("webpay");
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
  const payableLines = lines.filter(
    (line) => line.product.status === "Publicado" && line.product.price !== null,
  );
  const total = payableLines.reduce(
    (sum, line) => sum + (line.product.price ?? 0) * line.quantity,
    0,
  );
  const mercadoPagoUrl =
    payableLines.length === 1 && payableLines[0].quantity === 1
      ? payableLines[0].product.mercadoPagoUrl
      : undefined;
  const isValidCart = lines.length > 0 && payableLines.length === lines.length;
  const whatsAppUrl = `${contactLinks.whatsapp}?text=${encodeURIComponent(
    `Hola Sufiaw, necesito ayuda con mi compra por ${formatCLP(total)}.`,
  )}`;

  if (!isValidCart) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f3f2ef] px-6 py-16 text-center">
        <div className="max-w-xl">
          <Badge variant="outline" className="rounded-none">Checkout / Sufiaw</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            Tu compra todavía no está lista para pago online.
          </h1>
          <p className="mt-5 leading-7 text-muted-foreground">
            Agrega productos publicados con precio. Los artículos agotados y servicios a medida se coordinan directamente.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild><Link href="/"><ArrowLeft className="size-4" /> Volver al catálogo</Link></Button>
            <Button asChild variant="outline">
              <Link href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> Hablar por WhatsApp</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const selectedPaymentUrl = provider === "mercado-pago" ? mercadoPagoUrl : undefined;

  return (
    <main className="min-h-screen bg-[#f3f2ef]">
      <header className="border-b bg-background">
        <div className="site-container flex h-20 items-center justify-between">
          <Button asChild variant="ghost" size="sm"><Link href="/"><ArrowLeft className="size-4" /> Tienda</Link></Button>
          <Brand className="absolute left-1/2 -translate-x-1/2" />
          <Badge variant="outline" className="hidden rounded-none sm:flex"><LockKeyhole className="size-3" /> Checkout preparado</Badge>
        </div>
      </header>

      <div className="site-container grid gap-8 py-10 lg:grid-cols-[1fr_420px] lg:py-16">
        <section>
          <p className="eyebrow text-muted-foreground">Checkout / Métodos de pago</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Elige cómo pagar</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            La experiencia ya está preparada para Webpay Plus y Mercado Pago. Los cobros se activarán al incorporar las credenciales comerciales.
          </p>

          <div className="mt-10 grid gap-4">
            {paymentMethods.map(({ id, name, detail, Icon }) => {
              const active = provider === id;
              const ready = id === "mercado-pago" && Boolean(mercadoPagoUrl);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setProvider(id)}
                  aria-pressed={active}
                  className={`flex w-full items-start gap-4 border p-5 text-left transition-colors ${active ? "border-[#111] bg-white" : "bg-transparent hover:bg-white/60"}`}
                >
                  <span className={`grid size-11 shrink-0 place-items-center ${active ? "bg-[#c8ff37]" : "bg-muted"}`}>
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center justify-between gap-2">
                      <strong>{name}</strong>
                      <Badge variant={ready ? "default" : "secondary"} className="rounded-none">
                        {ready ? "Disponible" : "Credenciales pendientes"}
                      </Badge>
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{detail}</span>
                  </span>
                  {active && <Check className="mt-1 size-5 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 border bg-white p-5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-medium">Flujo de redirección preparado</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Webpay creará la transacción en el servidor y volverá a Sufiaw para confirmar el resultado. Mercado Pago creará una preferencia o abrirá el enlace configurado para el producto.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="h-fit border bg-white p-6 lg:sticky lg:top-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Resumen</h2>
            <span className="font-mono text-xs text-muted-foreground">{payableLines.length} ítems</span>
          </div>
          <div className="mt-6 space-y-5">
            {payableLines.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden bg-muted">
                  <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Cantidad: {quantity}</p>
                </div>
                <p className="font-mono text-xs">{formatCLP((product.price ?? 0) * quantity)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="flex items-end justify-between">
            <div><p className="text-sm text-muted-foreground">Total</p><p className="mt-1 text-xs text-muted-foreground">Impuestos incluidos</p></div>
            <p className="font-mono text-xl font-semibold">{formatCLP(total)}</p>
          </div>

          {selectedPaymentUrl ? (
            <Button asChild size="lg" className="mt-6 h-13 w-full bg-[#c8ff37] text-black hover:bg-[#b2e92b]">
              <Link href={selectedPaymentUrl} target="_blank" rel="noopener noreferrer">Pagar con Mercado Pago <ExternalLink className="size-4" /></Link>
            </Button>
          ) : (
            <Button size="lg" className="mt-6 h-13 w-full" disabled>
              Activación pendiente
            </Button>
          )}
          <Button asChild variant="outline" className="mt-3 h-12 w-full">
            <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> Necesito ayuda</Link>
          </Button>
          <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
            No se realizará ningún cobro hasta que el proveedor seleccionado esté configurado.
          </p>
        </aside>
      </div>
    </main>
  );
}
