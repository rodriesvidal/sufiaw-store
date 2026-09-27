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
  externalUrl?: string;
  specs?: string[];
};

export const contactLinks = {
  whatsapp: "https://wa.me/56994475858",
  instagram: "https://www.instagram.com/sufiaw_chile/",
  tiktok: "https://www.tiktok.com/@sufiaw_electronic",
  facebook: "https://www.facebook.com/profile.php?id=61578203944560",
  mercadoLibre: "https://www.mercadolibre.cl/perfil/SUFIAWELECTRONICCHILE",
};

export const initialProducts: Product[] = [
  {
    id: "pc-gaming-i3-rtx3050",
    slug: "computador-gaming-i3-12100f-rtx-3050",
    name: "PC Gaming i3 12100F + RTX 3050",
    category: "Computadores",
    price: 1_220_000,
    stock: 3,
    status: "Publicado",
    image: "/images/pc-gaming-reference.png",
    description:
      "Equipo Sufiaw preparado para gaming, estudio y trabajo creativo. Configuración publicada actualmente en Mercado Libre.",
    featured: true,
    demo: true,
    externalUrl:
      "https://www.mercadolibre.cl/computador-gaming-i3-12100f--rtx-3050-8gb--1-tb-m2/up/MLCU4011187327",
    specs: [
      "Intel Core i3-12100F",
      "RTX 3050 ASUS 8 GB",
      "1 TB SSD M.2",
      "2 módulos de memoria RAM",
      "Placa ASUS H610M-K",
      "Fuente 600 W",
    ],
  },
  {
    id: "servicio-pc-medida",
    slug: "pc-a-medida",
    name: "PC a medida",
    category: "Configuración",
    price: null,
    stock: 0,
    status: "Publicado",
    image: "/images/hero-electronics.png",
    description:
      "Armamos una configuración equilibrada según tu presupuesto, juegos, programas y posibilidades de actualización.",
    featured: true,
    demo: true,
    specs: ["Selección de componentes", "Armado profesional", "Pruebas de estabilidad", "Asesoría directa"],
  },
  {
    id: "accesorios-gaming",
    slug: "accesorios-gaming",
    name: "Accesorios & periféricos",
    category: "Accesorios",
    price: null,
    stock: 0,
    status: "Publicado",
    image: "/images/accesorios-gaming.png",
    description:
      "Teclados, mouse, audífonos, controles y accesorios seleccionados para completar tu espacio de juego o trabajo.",
    featured: true,
    demo: true,
    specs: ["Gaming y productividad", "Compatibilidad revisada", "Opciones según presupuesto"],
  },
  {
    id: "impresion-laser",
    slug: "impresion-laser",
    name: "Impresión láser",
    category: "Servicios",
    price: null,
    stock: 0,
    status: "Publicado",
    image: "/images/impresion-laser.png",
    description:
      "Impresión láser nítida y rápida para documentos, material de estudio y necesidades de oficina.",
    featured: true,
    demo: true,
    specs: ["Documentos y material de estudio", "Impresión monocromática", "Coordinación por WhatsApp"],
  },
];

export function formatCLP(value: number | null) {
  if (value === null) return "Cotizar";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}
