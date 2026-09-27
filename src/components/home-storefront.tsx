"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  BadgeCheck,
  Box,
  Cpu,
  ExternalLink,
  Gamepad2,
  Headphones,
  MessageCircle,
  Printer,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useStore } from "@/components/store-provider";
import { Button } from "@/components/ui/button";
import { contactLinks } from "@/lib/products";

export function HomeStorefront() {
  const { products } = useStore();
  const visibleProducts = products.filter((product) => product.status === "Publicado");

  return (
    <main>
      <div className="bg-[#c8ff37] py-2.5 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
        Tecnología · Equipos armados · Servicio y soporte
      </div>
      <SiteHeader />

      <section className="bg-[#090a0a]">
        <div className="site-container py-5 md:py-8">
          <div className="relative min-h-[660px] overflow-hidden bg-black md:min-h-[760px]">
            <Image
              src="/images/hero-electronics.png"
              alt="Computador gaming de escritorio en un estudio tecnológico"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-[68%_center]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/78 to-black/10" />
            <div className="relative z-10 flex min-h-[660px] max-w-4xl flex-col justify-between p-6 text-white md:min-h-[760px] md:p-12 lg:p-16">
              <div className="flex items-center gap-3">
                <span className="size-2 bg-[#c8ff37]" />
                <p className="eyebrow text-white/75">Sufiaw Electronic / Chile</p>
              </div>
              <div>
                <h1 className="display-tight text-balance max-w-[820px] text-[clamp(4rem,9.2vw,8.8rem)] font-semibold uppercase">
                  Potencia<br />que sí<br /><span className="text-[#c8ff37]">responde.</span>
                </h1>
                <p className="mt-7 max-w-xl text-base leading-7 text-white/68 md:text-lg">
                  Computadores, accesorios y soluciones tecnológicas pensadas para jugar, crear y trabajar sin límites.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 bg-[#c8ff37] px-7 text-black hover:bg-[#b2e92b]">
                    <Link href="#equipos">Ver equipos <ArrowDown className="size-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 border-white/35 bg-transparent px-7 text-white hover:bg-white hover:text-black">
                    <Link href={`${contactLinks.whatsapp}?text=${encodeURIComponent("Hola Sufiaw, quiero cotizar un equipo o servicio.")}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> Cotizar por WhatsApp</Link>
                  </Button>
                </div>
              </div>
              <p className="eyebrow text-white/60">Equipos · Accesorios · Software · Servicio ↘</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-[#111] py-7 text-white">
        <div className="site-container grid gap-6 sm:grid-cols-3">
          {[
            [BadgeCheck, "Compra protegida", "También en Mercado Libre"],
            [Wrench, "Asesoría real", "Según uso y presupuesto"],
            [ShieldCheck, "Soporte directo", "Antes y después de comprar"],
          ].map(([Icon, title, copy]) => {
            const IconComponent = Icon as typeof BadgeCheck;
            return (
              <div key={String(title)} className="flex items-center gap-4 sm:justify-center">
                <IconComponent className="size-5 stroke-[1.5] text-[#c8ff37]" />
                <div><p className="text-sm font-medium">{String(title)}</p><p className="text-xs text-white/60">{String(copy)}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="equipos" className="site-container py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">Catálogo / Tecnología</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Equipos y soluciones</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Un equipo publicado y servicios que cotizamos a medida. Las imágenes referenciales serán reemplazables desde administración.
          </p>
        </div>
        <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </section>

      <section id="servicios" className="bg-[#c8ff37] text-black">
        <div className="site-container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="eyebrow">Servicios / Sufiaw</p>
              <h2 className="display-tight mt-6 text-[clamp(4rem,8vw,8rem)] font-semibold uppercase">Más que<br />hardware.</h2>
            </div>
            <div className="grid gap-px bg-black/20 sm:grid-cols-2">
              {[
                [Cpu, "PC a medida", "Configuración, armado y pruebas según tus programas, juegos y presupuesto."],
                [Wrench, "Consultoría", "Te ayudamos a elegir componentes compatibles y una ruta de actualización inteligente."],
                [Gamepad2, "Licencias y juegos", "Soluciones digitales para activar, instalar y disfrutar tu equipo."],
                [Printer, "Impresión láser", "Documentos nítidos y rápidos para estudio, trabajo y oficina."],
              ].map(([Icon, title, copy]) => {
                const IconComponent = Icon as typeof Cpu;
                return (
                  <div key={String(title)} className="bg-[#c8ff37] p-7 md:p-9">
                    <IconComponent className="size-7 stroke-[1.5]" />
                    <h3 className="mt-12 text-xl font-semibold">{String(title)}</h3>
                    <p className="mt-3 text-sm leading-6 text-black/65">{String(copy)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0d0e0e] text-white">
        <div className="site-container grid gap-12 py-20 md:grid-cols-[.8fr_1.2fr] md:py-28">
          <div className="flex flex-col justify-between">
            <div>
              <p className="eyebrow text-white/65">Por qué Sufiaw</p>
              <p className="mt-6 max-w-xs text-sm leading-6 text-white/55">Especialistas en tecnología para personas, jugadores, estudiantes y pequeños negocios.</p>
            </div>
            <p className="mt-16 hidden font-mono text-xs text-white/60 md:block">SANTIAGO, CHILE<br />VENTAS + SERVICIO<br />ONLINE</p>
          </div>
          <div>
            <h2 className="display-tight text-balance text-[clamp(3.6rem,7.5vw,7.5rem)] font-semibold uppercase">
              Configurado<br />para <span className="text-[#c8ff37]">ti.</span>
            </h2>
            <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
              {[
                [Zap, "Rendimiento", "Componentes elegidos para trabajar juntos."],
                [Box, "Transparencia", "Sabes exactamente qué incluye tu equipo."],
                [Headphones, "Cercanía", "Atención directa por WhatsApp y redes."],
              ].map(([Icon, title, copy]) => {
                const IconComponent = Icon as typeof Zap;
                return <div key={String(title)}><IconComponent className="size-5 text-[#c8ff37]" /><h3 className="mt-5 font-semibold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-white/58">{String(copy)}</p></div>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-8 border-b pb-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-muted-foreground">Hablemos de tu equipo</p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] md:text-6xl">¿Qué necesitas hacer con tu próximo PC?</h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="h-12 shrink-0 bg-[#111]">
              <Link href={`${contactLinks.whatsapp}?text=${encodeURIComponent("Hola Sufiaw, quiero recibir asesoría para elegir o armar un PC.")}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> Hablar por WhatsApp</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 shrink-0">
              <Link href={contactLinks.mercadoLibre} target="_blank" rel="noopener noreferrer">Mercado Libre <ExternalLink className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
