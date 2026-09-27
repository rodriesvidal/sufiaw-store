import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { contactLinks } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="site-container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_.6fr_.6fr]">
          <div>
            <Brand inverse />
            <p className="mt-6 max-w-md text-sm leading-6 text-white/55">
              Computadores, accesorios, software y servicios tecnológicos con atención directa en Chile.
            </p>
          </div>
          <div>
            <p className="eyebrow text-white/60">Explora</p>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link href="/#equipos">Equipos</Link>
              <Link href="/#servicios">Servicios</Link>
              <Link href="/admin">Administración</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow text-white/60">Conecta</p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <Link href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm">
                @sufiaw_chile <ArrowUpRight className="size-3.5" />
              </Link>
              <Link href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm">
                WhatsApp <ArrowUpRight className="size-3.5" />
              </Link>
              <Link href={contactLinks.mercadoLibre} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm">
                Mercado Libre <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Sufiaw Store. Chile.</p>
          <p>Ventas · Consultoría · Servicio · Impresión láser</p>
        </div>
      </div>
    </footer>
  );
}
