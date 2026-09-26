import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";

export const metadata: Metadata = {
  title: "Producto",
  description: "Detalle de producto Sufiaw Store.",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}
