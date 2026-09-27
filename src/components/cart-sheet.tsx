"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { contactLinks, formatCLP } from "@/lib/products";

export function CartSheet() {
  const { cart, cartCount, products, setQuantity } = useStore();
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
  const total = lines.reduce(
    (sum, line) => sum + (line.product.price ?? 0) * line.quantity,
    0,
  );
  const canContinueToPayment =
    lines.length > 0 &&
    lines.every(
      (line) => line.product.status === "Publicado" && line.product.price !== null,
    );
  const requestText = lines.length
    ? `Hola Sufiaw, quiero consultar por:\n${lines.map((line) => `• ${line.product.name} × ${line.quantity}`).join("\n")}`
    : "Hola Sufiaw, quiero consultar por sus productos y servicios.";
  const whatsAppUrl = `${contactLinks.whatsapp}?text=${encodeURIComponent(requestText)}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Abrir bolsa">
          <ShoppingBag className="size-[18px]" />
          {cartCount > 0 && (
            <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-foreground text-[9px] text-background">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b p-6 text-left">
          <SheetTitle className="text-xl">Tu compra</SheetTitle>
          <SheetDescription>
            Revisa tus productos y elige pago online o atención directa.
          </SheetDescription>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 grid size-16 place-items-center rounded-full bg-muted">
              <ShoppingBag className="size-6" />
            </div>
            <h3 className="font-semibold">Aún no agregas productos</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Explora equipos, accesorios y servicios tecnológicos.
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            {lines.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="relative size-24 shrink-0 overflow-hidden bg-muted">
                  <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                  <div>
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{formatCLP(product.price)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border">
                      <Button variant="ghost" size="icon-sm" onClick={() => setQuantity(product.id, quantity - 1)} aria-label="Restar unidad">
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-7 text-center font-mono text-xs">{quantity}</span>
                      <Button variant="ghost" size="icon-sm" onClick={() => setQuantity(product.id, quantity + 1)} aria-label="Sumar unidad">
                        <Plus className="size-3" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={() => setQuantity(product.id, 0)} aria-label="Quitar producto">
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="border-t p-6">
          {total > 0 && (
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total estimado</span>
              <span className="font-mono font-medium">{formatCLP(total)}</span>
            </div>
          )}
          {canContinueToPayment ? (
            <Button asChild className="h-12 w-full bg-[#c8ff37] text-black hover:bg-[#b2e92b]">
              <Link href="/checkout">
                <CreditCard className="size-4" /> Continuar al pago
              </Link>
            </Button>
          ) : (
            <Button className="h-12 w-full" disabled>
              <CreditCard className="size-4" /> Pago online no disponible
            </Button>
          )}
          {lines.length > 0 ? (
            <Button asChild variant="outline" className="mt-3 h-12 w-full">
              <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> Consultar por WhatsApp
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="mt-3 h-12 w-full" disabled>
              <MessageCircle className="size-4" /> Consultar por WhatsApp
            </Button>
          )}
          <Separator className="my-4" />
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            {canContinueToPayment
              ? "Webpay y Mercado Pago quedarán habilitados aquí cuando se conecten sus credenciales."
              : "Los servicios sin precio y productos agotados se coordinan directamente con Sufiaw."}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
