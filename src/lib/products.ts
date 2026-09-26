export type ProductStatus = "Publicado" | "Borrador" | "Agotado";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | null;
  stock: number;
  status: ProductStatus;
  image: string;
  description: string;
  featured?: boolean;
  demo?: boolean;
};

export const initialProducts: Product[] = [
  {
    id: "sample-01",
    slug: "polera-oversize-black",
    name: "Polera Oversize / Black",
    category: "Ropa",
    price: null,
    stock: 0,
    status: "Publicado",
    image: "/images/polera-oversize.png",
    description:
      "Mockup editorial para visualizar cómo se presentarán las prendas de la colección Sufiaw.",
    featured: true,
    demo: true,
  },
  {
    id: "sample-02",
    slug: "hoodie-essential",
    name: "Hoodie Essential",
    category: "Ropa",
    price: null,
    stock: 0,
    status: "Publicado",
    image: "/images/hero-streetwear.png",
    description:
      "Vista previa de producto. La fotografía, precio y disponibilidad se reemplazan desde administración.",
    featured: true,
    demo: true,
  },
  {
    id: "sample-03",
    slug: "anillo-orbit",
    name: "Anillo Orbit",
    category: "Accesorios",
    price: null,
    stock: 0,
    status: "Publicado",
    image: "/images/anillo-cadena.png",
    description:
      "Mockup de accesorio para definir la dirección visual del futuro catálogo.",
    featured: true,
    demo: true,
  },
  {
    id: "sample-04",
    slug: "tote-utility",
    name: "Tote Utility",
    category: "Accesorios",
    price: null,
    stock: 0,
    status: "Publicado",
    image: "/images/tote-gorra.png",
    description:
      "Pieza de muestra para probar la experiencia de compra antes de cargar el inventario real.",
    featured: true,
    demo: true,
  },
];

export function formatCLP(value: number | null) {
  if (value === null) return "Próximamente";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}
