"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Brand } from "@/components/brand";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/#coleccion", label: "Colección" },
  { href: "/#historia", label: "La marca" },
  { href: "https://www.instagram.com/sufiaw_chile/", label: "Instagram", external: true },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="site-container flex h-18 items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88%] p-0">
              <SheetHeader className="border-b p-6 text-left">
                <SheetTitle><Brand /></SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6">
                {links.map((link, index) => (
                  <Link key={link.href} href={link.href} target={link.external ? "_blank" : undefined} className="flex items-center justify-between border-b py-5 text-xl font-medium">
                    {link.label}<span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <Brand className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0" />
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} target={link.external ? "_blank" : undefined} className="eyebrow transition-opacity hover:opacity-50">
              {link.label}
            </Link>
          ))}
        </nav>
        <CartSheet />
      </div>
    </header>
  );
}
