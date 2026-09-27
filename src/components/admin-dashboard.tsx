"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Cloud,
  ExternalLink,
  Eye,
  ImagePlus,
  LayoutDashboard,
  Link2,
  Menu,
  MoreHorizontal,
  Package,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Tags,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Brand } from "@/components/brand";
import { useStore } from "@/components/store-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { formatCLP, type Product, type ProductStatus } from "@/lib/products";

const ADMIN_KEY = "sufiaw-admins-v1";

const navItems = [
  [LayoutDashboard, "Resumen", "overview"],
  [Package, "Productos", "products"],
  [Users, "Equipo", "team"],
  [Link2, "Integraciones", "integrations"],
] as const;

function AdminSidebar({
  activeTab,
  onNavigate,
  mobile = false,
}: {
  activeTab: string;
  onNavigate: (value: string) => void;
  mobile?: boolean;
}) {
  return (
    <div className="flex h-full flex-col bg-[#111] text-white">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Brand inverse />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <p className="eyebrow mb-4 px-3 text-white/55">Administración</p>
        {navItems.map(([Icon, label, value]) => (
          <button
            key={value}
            onClick={() => onNavigate(value)}
            className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm transition-colors ${activeTab === value ? "bg-white text-black" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-white/60 hover:bg-white/10 hover:text-white"
        >
          <Link href="/" target={mobile ? undefined : "_blank"}>
            <Store className="size-4" /> Ver tienda{" "}
            <ArrowUpRight className="ml-auto size-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

const emptyDraft = {
  name: "",
  category: "Computadores",
  price: "",
  stock: "0",
  status: "Borrador" as ProductStatus,
  description: "",
  image: "",
  externalUrl: "",
  specs: "",
  featured: true,
};

type ProductDraft = typeof emptyDraft;

export function AdminDashboard() {
  const { products, setProducts, removeProduct } = useStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [admins, setAdmins] = useState<string[]>(["admin@sufiaw.cl"]);
  const [newAdmin, setNewAdmin] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(ADMIN_KEY);
      if (saved) setAdmins(JSON.parse(saved));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const published = products.filter(
    (item) => item.status === "Publicado",
  ).length;
  const totalStock = products.reduce((sum, item) => sum + item.stock, 0);
  const pricedValue = products.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.stock,
    0,
  );
  const filteredProducts = useMemo(
    () =>
      products.filter((item) =>
        `${item.name} ${item.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [products, query],
  );

  function openNewProduct() {
    setEditingId(null);
    setDraft(emptyDraft);
    setDialogOpen(true);
  }

  function openEditProduct(product: Product) {
    setEditingId(product.id);
    setDraft({
      name: product.name,
      category: product.category,
      price: product.price?.toString() ?? "",
      stock: product.stock.toString(),
      status: product.status,
      description: product.description,
      image: product.image,
      externalUrl: product.externalUrl ?? "",
      specs: product.specs?.join("\n") ?? "",
      featured: product.featured ?? false,
    });
    setDialogOpen(true);
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2_500_000) {
      toast.error("La imagen debe pesar menos de 2,5 MB en el modo local.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setDraft((current) => ({ ...current, image: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim()) return;
    const slugBase = draft.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const product: Product = {
      id: editingId ?? crypto.randomUUID(),
      slug: editingId
        ? (products.find((item) => item.id === editingId)?.slug ?? slugBase)
        : `${slugBase}-${Date.now().toString().slice(-5)}`,
      name: draft.name.trim(),
      category: draft.category,
      price: draft.price ? Number(draft.price) : null,
      stock: Number(draft.stock) || 0,
      status: draft.status,
      image: draft.image || "/images/pc-gaming-reference.png",
      description: draft.description.trim() || "Nuevo producto o servicio de Sufiaw Store.",
      featured: draft.featured,
      externalUrl: draft.externalUrl.trim() || undefined,
      specs: draft.specs.split("\n").map((item) => item.trim()).filter(Boolean),
    };
    setProducts(
      editingId
        ? products.map((item) => (item.id === editingId ? product : item))
        : [product, ...products],
    );
    setDialogOpen(false);
    toast.success(editingId ? "Producto actualizado" : "Producto creado");
  }

  function togglePublished(product: Product) {
    const status: ProductStatus =
      product.status === "Publicado" ? "Borrador" : "Publicado";
    setProducts(
      products.map((item) =>
        item.id === product.id ? { ...item, status } : item,
      ),
    );
    toast.success(
      status === "Publicado"
        ? "Producto publicado"
        : "Producto movido a borrador",
    );
  }

  function addAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = newAdmin.trim().toLowerCase();
    if (!email || admins.includes(email)) return;
    const next = [...admins, email];
    setAdmins(next);
    window.localStorage.setItem(ADMIN_KEY, JSON.stringify(next));
    setNewAdmin("");
    toast.success("Administrador agregado en modo local");
  }

  function removeAdmin(email: string) {
    const next = admins.filter((item) => item !== email);
    setAdmins(next);
    window.localStorage.setItem(ADMIN_KEY, JSON.stringify(next));
  }

  return (
    <main className="min-h-screen bg-[#f3f2ef]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <AdminSidebar activeTab={activeTab} onNavigate={setActiveTab} />
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-[#f3f2ef]/95 px-5 backdrop-blur md:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Abrir menú de administración"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-0 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menú de administración</SheetTitle>
                </SheetHeader>
                <AdminSidebar
                  activeTab={activeTab}
                  onNavigate={setActiveTab}
                  mobile
                />
              </SheetContent>
            </Sheet>
            <div>
              <p className="text-sm font-semibold">Panel de control</p>
              <p className="text-xs text-muted-foreground">Sufiaw Store</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="hidden border-amber-300 bg-amber-50 text-amber-800 sm:flex"
            >
              Modo local
            </Badge>
            <div className="grid size-9 place-items-center bg-[#111] text-xs font-semibold text-white">
              SF
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8 lg:p-10">
          <Alert className="mb-8 border-amber-300 bg-amber-50 text-amber-950">
            <ShieldCheck className="size-4" />
            <AlertTitle>Panel funcional en modo de preparación</AlertTitle>
            <AlertDescription>
              Los cambios se guardan en este navegador. Al conectar
              autenticación y base de datos en Vercel quedarán sincronizados
              para todos los administradores.
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="sr-only">
              {navItems.map(([, label, value]) => (
                <TabsTrigger key={value} value={value}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-muted-foreground">Resumen / Hoy</p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                    Hola, Sufiaw.
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tu tienda está lista para cargar equipos, accesorios y servicios.
                  </p>
                </div>
                <Button onClick={openNewProduct}>
                  <Plus className="size-4" /> Nuevo producto
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [
                    Package,
                    "Productos",
                    products.length.toString(),
                    `${published} publicados`,
                  ],
                  [Tags, "Unidades", totalStock.toString(), "Stock total"],
                  [
                    CircleDollarSign,
                    "Inventario",
                    formatCLP(pricedValue),
                    "Valor estimado",
                  ],
                  [
                    Users,
                    "Administradores",
                    admins.length.toString(),
                    "Equipo con acceso",
                  ],
                ].map(([Icon, label, value, note]) => {
                  const IconComponent = Icon as typeof Package;
                  return (
                    <Card key={String(label)}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>{String(label)}</CardDescription>
                        <IconComponent className="size-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-semibold tracking-tight">
                          {String(value)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {String(note)}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
                <Card>
                  <CardHeader className="flex-row items-center justify-between">
                    <div>
                      <CardTitle>Productos recientes</CardTitle>
                      <CardDescription>
                        Últimos artículos del catálogo
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("products")}
                    >
                      Ver todos
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {products.slice(0, 4).map((product) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <div className="relative size-12 overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.category}
                          </p>
                        </div>
                        <Badge
                          variant={
                            product.status === "Publicado"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="bg-[#111] text-white">
                  <CardHeader>
                    <Cloud className="mb-5 size-7" />
                    <CardTitle>Próximo paso</CardTitle>
                    <CardDescription className="text-white/55">
                      Activa datos persistentes y acceso seguro.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-white/70">
                      <p className="flex items-center gap-2">
                        <Check className="size-4" /> Sitio y catálogo
                      </p>
                      <p className="flex items-center gap-2">
                        <Check className="size-4" /> Panel CRUD
                      </p>
                      <p className="flex items-center gap-2 text-white/60">
                        <span className="size-4 rounded-full border border-white/30" />{" "}
                        Auth de administradores
                      </p>
                      <p className="flex items-center gap-2 text-white/60">
                        <span className="size-4 rounded-full border border-white/30" />{" "}
                        Base de datos e imágenes
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      className="mt-6 w-full"
                      onClick={() => setActiveTab("integrations")}
                    >
                      Ver integraciones
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-muted-foreground">Catálogo</p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Productos
                  </h1>
                </div>
                <Button onClick={openNewProduct}>
                  <Plus className="size-4" /> Nuevo producto
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Buscar por nombre o categoría…"
                      className="pl-9"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Estado
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Stock
                        </TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead className="w-12" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative size-12 overflow-hidden bg-muted">
                                <Image
                                  src={product.image}
                                  alt=""
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {product.category}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant={
                                product.status === "Publicado"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden font-mono text-xs sm:table-cell">
                            {product.stock}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {formatCLP(product.price)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Acciones para ${product.name}`}
                            >
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openEditProduct(product)}
                                >
                                  <Pencil className="size-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => togglePublished(product)}
                                >
                                  <Eye className="size-4" />{" "}
                                  {product.status === "Publicado"
                                    ? "Ocultar"
                                    : "Publicar"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => setDeleteId(product.id)}
                                >
                                  <Trash2 className="size-4" /> Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div>
                <p className="eyebrow text-muted-foreground">Accesos</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  Equipo administrador
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Define quién podrá gestionar productos, inventario y pedidos.
                </p>
              </div>
              <div className="grid gap-6 xl:grid-cols-[1fr_.65fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Administradores</CardTitle>
                    <CardDescription>
                      Correos autorizados para el futuro inicio de sesión.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={addAdmin} className="flex gap-2">
                      <Input
                        type="email"
                        required
                        placeholder="nombre@correo.cl"
                        value={newAdmin}
                        onChange={(event) => setNewAdmin(event.target.value)}
                      />
                      <Button type="submit">
                        <UserPlus className="size-4" />{" "}
                        <span className="hidden sm:inline">Agregar</span>
                      </Button>
                    </form>
                    <div className="mt-6 divide-y">
                      {admins.map((email, index) => (
                        <div
                          key={email}
                          className="flex items-center gap-4 py-4"
                        >
                          <div className="grid size-10 place-items-center bg-muted text-xs font-semibold">
                            {email.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {index === 0 ? "Propietario" : "Administrador"}
                            </p>
                          </div>
                          {index === 0 ? (
                            <Badge variant="secondary">Principal</Badge>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => removeAdmin(email)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <ShieldCheck className="mb-4 size-6" />
                    <CardTitle>Seguridad pendiente</CardTitle>
                    <CardDescription>
                      La lista funciona localmente. Para proteger el panel se
                      conectará Clerk y cada correo deberá iniciar sesión.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveTab("integrations")}
                    >
                      Configurar después <ArrowUpRight className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <div>
                <p className="eyebrow text-muted-foreground">Infraestructura</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  Integraciones
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Conecta servicios sin cambiar la experiencia visual.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[
                  [
                    ShieldCheck,
                    "Clerk",
                    "Acceso seguro para administradores",
                    "Pendiente",
                  ],
                  [
                    Cloud,
                    "Base de datos",
                    "Productos, stock y administradores",
                    "Pendiente",
                  ],
                  [
                    ImagePlus,
                    "Vercel Blob",
                    "Fotografías de producto optimizadas",
                    "Pendiente",
                  ],
                  [
                    CircleDollarSign,
                    "Mercado Pago",
                    "Checkout o enlaces de pago",
                    "Próximamente",
                  ],
                  [
                    ExternalLink,
                    "Mercado Libre",
                    "Perfil y vínculos directos por producto",
                    "Activo",
                  ],
                  [
                    Settings,
                    "Dominio propio",
                    "Conectar cuando esté comprado",
                    "Más adelante",
                  ],
                ].map(([Icon, title, copy, status]) => {
                  const IconComponent = Icon as typeof Cloud;
                  return (
                    <Card key={String(title)}>
                      <CardHeader>
                        <div className="mb-4 flex items-start justify-between">
                          <div className="grid size-10 place-items-center bg-muted">
                            <IconComponent className="size-5" />
                          </div>
                          <Badge variant="outline">{String(status)}</Badge>
                        </div>
                        <CardTitle>{String(title)}</CardTitle>
                        <CardDescription>{String(copy)}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
          <form onSubmit={saveProduct}>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Editar producto" : "Nuevo producto"}
              </DialogTitle>
              <DialogDescription>
                Completa la ficha. Puedes dejar el precio vacío si todavía no
                está definido.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  required
                  value={draft.name}
                  onChange={(event) =>
                    setDraft({ ...draft, name: event.target.value })
                  }
                  placeholder="Ej. PC Gaming Ryzen 5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={draft.category}
                  onValueChange={(value) =>
                    setDraft({ ...draft, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computadores">Computadores</SelectItem>
                    <SelectItem value="Accesorios">Accesorios</SelectItem>
                    <SelectItem value="Configuración">Configuración</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Servicios">Servicios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={draft.status}
                  onValueChange={(value) =>
                    setDraft({ ...draft, status: value as ProductStatus })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Borrador">Borrador</SelectItem>
                    <SelectItem value="Publicado">Publicado</SelectItem>
                    <SelectItem value="Agotado">Agotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio CLP</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={draft.price}
                  onChange={(event) =>
                    setDraft({ ...draft, price: event.target.value })
                  }
                  placeholder="24990"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={draft.stock}
                  onChange={(event) =>
                    setDraft({ ...draft, stock: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={draft.description}
                  onChange={(event) =>
                    setDraft({ ...draft, description: event.target.value })
                  }
                  placeholder="Describe material, calce y detalles…"
                  rows={4}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="specs">Especificaciones</Label>
                <Textarea
                  id="specs"
                  value={draft.specs}
                  onChange={(event) =>
                    setDraft({ ...draft, specs: event.target.value })
                  }
                  placeholder={"Una especificación por línea\nEj. Intel Core i5\n16 GB RAM"}
                  rows={4}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="externalUrl">Enlace de compra externo</Label>
                <Input
                  id="externalUrl"
                  type="url"
                  value={draft.externalUrl}
                  onChange={(event) =>
                    setDraft({ ...draft, externalUrl: event.target.value })
                  }
                  placeholder="https://www.mercadolibre.cl/…"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="image">Imagen</Label>
                <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                  {draft.image ? (
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={draft.image}
                        alt="Vista previa"
                        fill
                        sizes="140px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid aspect-square place-items-center border border-dashed bg-muted/40">
                      <ImagePlus className="size-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      JPG, PNG o WebP. Máximo 2,5 MB mientras el catálogo use
                      almacenamiento local.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border p-4 sm:col-span-2">
                <div>
                  <Label htmlFor="featured">Destacar en inicio</Label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Incluye este producto en la selección principal.
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={draft.featured}
                  onCheckedChange={(checked) =>
                    setDraft({ ...draft, featured: checked })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingId ? "Guardar cambios" : "Crear producto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Se quitará del catálogo local. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (deleteId) removeProduct(deleteId);
                setDeleteId(null);
                toast.success("Producto eliminado");
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
