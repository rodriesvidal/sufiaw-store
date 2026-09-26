"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, PackageCheck, Plus, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { CartSheet } from "@/components/cart-sheet";
import { Brand } from "@/components/brand";
import { useStore } from "@/components/store-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCLP } from "@/lib/products";

export function ProductDetail({ slug }: { slug: string }) {
  const { products, addToCart } = useStore();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <p className="eyebrow text-muted-foreground">404 / Producto</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Esta pieza ya no está disponible.</h1>
          <Button asChild className="mt-8"><Link href="/">Volver al catálogo</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="border-b">
        <div className="site-container flex h-18 items-center justify-between">
          <Button asChild variant="ghost" size="sm"><Link href="/"><ArrowLeft className="size-4" /> Volver</Link></Button>
          <Brand className="absolute left-1/2 -translate-x-1/2" />
          <CartSheet />
        </div>
      </header>
      <div className="site-container grid gap-10 py-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:py-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted lg:sticky lg:top-10">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" priority />
          {product.demo && <Badge className="absolute left-5 top-5 rounded-none" variant="secondary">Muestra visual</Badge>}
        </div>
        <div className="flex flex-col justify-center py-6 lg:py-16">
          <p className="eyebrow text-muted-foreground">{product.category} / Sufiaw</p>
          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.055em] md:text-7xl">{product.name}</h1>
          <p className="mt-6 font-mono text-base">{formatCLP(product.price)}</p>
          <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground">{product.description}</p>
          {product.demo && (
            <div className="mt-8 border border-dashed p-4 text-sm leading-6 text-muted-foreground">
              Esta ficha es una muestra de diseño. La administración puede reemplazar imagen, descripción, precio y stock cuando la colección esté lista.
            </div>
          )}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button size="lg" className="h-13" onClick={() => { addToCart(product.id); toast.success("Agregado a tu selección"); }}>
              <Plus className="size-4" /> Agregar a selección
            </Button>
            <Button asChild size="lg" variant="outline" className="h-13">
              <Link href="https://www.instagram.com/sufiaw_chile/" target="_blank"><Camera className="size-4" /> Consultar</Link>
            </Button>
          </div>
          <Separator className="my-10" />
          <div className="space-y-5">
            {[
              [PackageCheck, "Stock confirmado antes del pago"],
              [Truck, "Despachos a todo Chile"],
              [ShieldCheck, "Integración con Mercado Pago preparada"],
            ].map(([Icon, text]) => {
              const IconComponent = Icon as typeof Truck;
              return <div key={String(text)} className="flex items-center gap-3 text-sm"><IconComponent className="size-4 stroke-[1.5]" /><span>{String(text)}</span></div>;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
