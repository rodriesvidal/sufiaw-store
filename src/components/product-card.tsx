"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/components/store-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCLP, type Product } from "@/lib/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useStore();
  return (
    <article className="group">
      <Link href={`/productos/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          priority={index < 2}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {product.demo && <Badge variant="secondary" className="rounded-none bg-background/90 backdrop-blur">Imagen referencial</Badge>}
          <span className="ml-auto grid size-9 place-items-center bg-background/90 opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="eyebrow text-muted-foreground">{product.category}</p>
          <h3 className="mt-2 text-base font-semibold tracking-tight">{product.name}</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{formatCLP(product.price)}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 rounded-full"
          onClick={() => {
            addToCart(product.id);
            toast.success("Agregado a tu cotización");
          }}
          aria-label={`Agregar ${product.name}`}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </article>
  );
}
