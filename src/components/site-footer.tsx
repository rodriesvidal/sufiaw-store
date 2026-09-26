import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="site-container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_.6fr_.6fr]">
          <div>
            <Brand inverse />
            <p className="mt-6 max-w-md text-sm leading-6 text-white/55">
              Streetwear y accesorios con carácter. Diseñado para una comunidad que no necesita explicarse.
            </p>
          </div>
          <div>
            <p className="eyebrow text-white/60">Explora</p>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link href="/#coleccion">Colección</Link>
              <Link href="/#historia">La marca</Link>
              <Link href="/admin">Administración</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow text-white/60">Conecta</p>
            <Link href="https://www.instagram.com/sufiaw_chile/" target="_blank" className="mt-5 inline-flex items-center gap-2 text-sm">
              @sufiaw_chile <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Sufiaw Store. Chile.</p>
          <p>Catálogo en preparación · Pagos online próximamente</p>
        </div>
      </div>
    </footer>
  );
}
