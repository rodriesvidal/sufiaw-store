"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Camera, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useStore } from "@/components/store-provider";
import { Button } from "@/components/ui/button";

export function HomeStorefront() {
  const { products } = useStore();
  const visibleProducts = products.filter((product) => product.status === "Publicado");

  return (
    <main>
      <div className="bg-[#111] py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white">
        Catálogo en preparación · Despachos a todo Chile
      </div>
      <SiteHeader />

      <section className="site-container py-5 md:py-8">
        <div className="relative min-h-[650px] overflow-hidden bg-[#d7d3cd] md:min-h-[720px]">
          <Image
            src="/images/hero-streetwear.png"
            alt="Selección editorial de prendas Sufiaw"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-[68%_center]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#d9d6d0] via-[#d9d6d0]/85 to-transparent md:via-[#d9d6d0]/30" />
          <div className="relative z-10 flex min-h-[650px] max-w-3xl flex-col justify-between p-6 md:min-h-[720px] md:p-12 lg:p-16">
            <div className="flex items-center gap-3">
              <span className="size-2 bg-foreground" />
              <p className="eyebrow">Sufiaw / Chile / Preview 01</p>
            </div>
            <div>
              <h1 className="display-tight text-balance max-w-[760px] text-[clamp(4.1rem,9.4vw,9rem)] font-semibold uppercase">
                Viste tu<br />propia señal.
              </h1>
              <p className="mt-7 max-w-md text-base leading-7 text-foreground/70 md:text-lg">
                Streetwear y accesorios con una estética directa. La primera colección online está tomando forma.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-7">
                  <Link href="#coleccion">Ver propuesta <ArrowDown className="size-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-foreground/30 bg-transparent px-7 hover:bg-white/30">
                  <Link href="https://www.instagram.com/sufiaw_chile/" target="_blank"><Camera className="size-4" /> Instagram</Link>
                </Button>
              </div>
            </div>
            <p className="eyebrow text-foreground/50">Scroll to discover ↘</p>
          </div>
        </div>
      </section>

      <section className="border-y py-7">
        <div className="site-container grid gap-6 sm:grid-cols-3">
          {[
            [Truck, "Despachos", "A todo Chile"],
            [ShieldCheck, "Compra segura", "Pago online próximamente"],
            [RotateCcw, "Atención directa", "Coordinación por Instagram"],
          ].map(([Icon, title, copy]) => {
            const IconComponent = Icon as typeof Truck;
            return (
              <div key={String(title)} className="flex items-center gap-4 sm:justify-center">
                <IconComponent className="size-5 stroke-[1.5]" />
                <div><p className="text-sm font-medium">{String(title)}</p><p className="text-xs text-muted-foreground">{String(copy)}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="coleccion" className="site-container py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">Selección / 001</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Primeras señales</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Imágenes de muestra para definir la dirección del catálogo. Reemplázalas por el inventario real desde el panel.
          </p>
        </div>
        {visibleProducts.length > 0 ? (
          <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        ) : (
          <div className="border border-dashed py-24 text-center">
            <Sparkles className="mx-auto size-6" />
            <h3 className="mt-4 font-medium">Nueva colección en camino</h3>
            <p className="mt-2 text-sm text-muted-foreground">Síguenos en Instagram para conocer el próximo drop.</p>
          </div>
        )}
      </section>

      <section id="historia" className="bg-[#111] text-white">
        <div className="site-container grid min-h-[650px] gap-12 py-20 md:grid-cols-[.7fr_1.3fr] md:py-28">
          <div className="flex flex-col justify-between">
            <p className="eyebrow text-white/65">Manifiesto / Sufiaw</p>
            <p className="hidden font-mono text-xs text-white/60 md:block">33.4489° S<br />70.6693° W<br />SANTIAGO, CL</p>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="display-tight text-balance text-[clamp(3.3rem,7vw,7.5rem)] font-semibold uppercase">
              Lo común<br />no deja marca.
            </h2>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
              <p className="text-base leading-7 text-white/65">
                Sufiaw nace como una forma de expresión: piezas simples, proporciones decididas y detalles que construyen identidad.
              </p>
              <div>
                <p className="text-base leading-7 text-white/65">Estamos construyendo la tienda online junto a la comunidad. Cada entrega será limitada y comunicada primero en Instagram.</p>
                <Button asChild variant="link" className="mt-5 h-auto p-0 text-white hover:text-white/60">
                  <Link href="https://www.instagram.com/sufiaw_chile/" target="_blank">Seguir el proceso <ArrowRight className="size-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-8 border-b pb-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-muted-foreground">Próxima etapa</p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Una tienda lista para el siguiente drop.</h2>
          </div>
          <Button asChild size="lg" className="h-12 shrink-0">
            <Link href="https://www.instagram.com/sufiaw_chile/" target="_blank">Hablar con Sufiaw <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
